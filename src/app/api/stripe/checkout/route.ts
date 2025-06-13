import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "~/server/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId, planName, userId, isStacking } = await req.json();

    if (!priceId || !planName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    console.log("Creating checkout session for:", {
      userId: session.user.id,
      planName,
      priceId,
      isStacking,
    });

    // FIXED: Use subscription mode for recurring prices
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription", // CHANGED from "payment" to "subscription"
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true&plan=${planName}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      customer_email: session.user.email!,
      metadata: {
        userId: session.user.id,
        planName: planName,
        isStacking: isStacking ? "true" : "false",
      },
      // Add subscription-specific settings
      subscription_data: {
        metadata: {
          userId: session.user.id,
          planName: planName,
          isStacking: isStacking ? "true" : "false",
        },
      },
    });

    console.log("Checkout session created:", checkoutSession.id);

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
