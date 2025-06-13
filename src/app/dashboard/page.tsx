// app/(dashboard)/page.tsx
"use server";

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { redirect } from "next/navigation";
import { DashboardClient } from "~/components/dashboard/dashboard-client";
import crypto from "crypto";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // First, verify the user exists in the database
  const userExists = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!userExists) {
    console.error("User not found in database:", session.user.id);
    redirect("/login");
  }

  // Try to find existing quota
  let quota = await db.apiQuota.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  // If no quota exists, create one with default values
  if (!quota) {
    try {
      quota = await db.apiQuota.create({
        data: {
          userId: session.user.id,
          maxRequests: 10, // Default quota
          requestsUsed: 0,
          resetDate: new Date(),
          secretKey: `sa_live_${crypto.randomBytes(24).toString("hex")}`,
        },
      });
      console.log("✅ Created new ApiQuota for user:", session.user.id);
    } catch (error) {
      console.error("❌ Failed to create ApiQuota:", error);
      // If creation fails, redirect to login to re-authenticate
      redirect("/login");
    }
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { isActive: true, name: true },
  });

  return <DashboardClient quota={quota} user={user} />;
}
