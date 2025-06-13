import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "~/server/db";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil", // Keeping your beta version as requested
});

const PLAN_QUOTAS = {
  Basic: 30,
  Professional: 100,
  Enterprise: 1000,
} as const;

export async function POST(req: NextRequest) {
  console.log("🎯 Webhook endpoint hit!");

  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log("📧 Received webhook event:", event.type);

  // Handle both checkout completion and subscription creation
  if (
    event.type === "checkout.session.completed" ||
    event.type === "invoice.payment_succeeded"
  ) {
    let userId: string | undefined;
    let planName: keyof typeof PLAN_QUOTAS | undefined;
    let isStacking = false;
    let sessionId: string | undefined;
    let amount: number = 0;
    let currency: string = "usd";

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      userId = session.metadata?.userId;
      planName = session.metadata?.planName as keyof typeof PLAN_QUOTAS;
      isStacking = session.metadata?.isStacking === "true";
      sessionId = session.id;
      amount = session.amount_total || 0;
      currency = session.currency || "usd";
    } else if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as any; // FIXED: Use 'any' to bypass TypeScript issues with beta API

      // FIXED: Check if subscription exists before retrieving
      if (invoice.subscription && typeof invoice.subscription === "string") {
        try {
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription,
          );
          userId = subscription.metadata?.userId;
          planName = subscription.metadata
            ?.planName as keyof typeof PLAN_QUOTAS;
          isStacking = subscription.metadata?.isStacking === "true";
        } catch (error) {
          console.error("Error retrieving subscription:", error);
          // Fallback to invoice metadata if available
          userId = invoice.metadata?.userId;
          planName = invoice.metadata?.planName as keyof typeof PLAN_QUOTAS;
          isStacking = invoice.metadata?.isStacking === "true";
        }
      } else {
        // Use invoice metadata as fallback
        userId = invoice.metadata?.userId;
        planName = invoice.metadata?.planName as keyof typeof PLAN_QUOTAS;
        isStacking = invoice.metadata?.isStacking === "true";
      }

      sessionId = invoice.id;
      amount = invoice.amount_paid || 0;
      currency = invoice.currency || "usd";
    }

    console.log("👤 User ID:", userId);
    console.log("📋 Plan Name:", planName);
    console.log("🔄 Is Stacking:", isStacking);

    if (userId && planName) {
      try {
        // First check if user exists
        const userExists = await db.user.findUnique({
          where: { id: userId },
        });

        if (!userExists) {
          console.error("❌ User not found:", userId);
          return NextResponse.json(
            { error: "User not found" },
            { status: 400 },
          );
        }

        const newQuota = PLAN_QUOTAS[planName] || 10;

        // Try to find existing quota
        const existingQuota = await db.apiQuota.findUnique({
          where: { userId },
        });

        if (existingQuota) {
          if (isStacking) {
            // Add to existing quota (stacking)
            const updatedMaxRequests = existingQuota.maxRequests + newQuota;
            await db.apiQuota.update({
              where: { userId },
              data: {
                maxRequests: updatedMaxRequests,
                resetDate: new Date(),
              },
            });
            console.log(
              `✅ Stacked quota: ${existingQuota.maxRequests} + ${newQuota} = ${updatedMaxRequests}`,
            );
          } else {
            // Replace existing quota (normal purchase)
            await db.apiQuota.update({
              where: { userId },
              data: {
                maxRequests: newQuota,
                requestsUsed: 0, // Reset usage for new plan
                resetDate: new Date(),
              },
            });
            console.log(`✅ Updated quota to ${newQuota} (replaced)`);
          }
        } else {
          // Create new quota record
          await db.apiQuota.create({
            data: {
              userId,
              maxRequests: newQuota,
              requestsUsed: 0,
              resetDate: new Date(),
              secretKey: `sa_live_${crypto.randomBytes(24).toString("hex")}`,
            },
          });
          console.log("✅ Created new quota");
        }

        // FIXED: Create purchase record with proper null checks
        if (sessionId) {
          await db.purchase.create({
            data: {
              userId,
              stripeSessionId: sessionId,
              amount,
              currency,
              status: "completed",
              planType: planName.toLowerCase(),
              requestsGranted: newQuota,
            },
          });

          console.log(
            `✅ Purchase recorded: ${planName} plan for user ${userId}`,
          );
        }
      } catch (error) {
        console.error("❌ Error updating user quota:", error);
      }
    }
  }

  return NextResponse.json({ received: true });
}
