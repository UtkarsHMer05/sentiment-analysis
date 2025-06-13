// src/app/api/user/quota/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const quota = await db.apiQuota.findUnique({
      where: { userId: session.user.id },
      select: {
        maxRequests: true,
        requestsUsed: true,
      },
    });

    if (!quota) {
      return NextResponse.json({ maxRequests: 10, requestsUsed: 0 });
    }

    return NextResponse.json(quota);
  } catch (error) {
    console.error("Error fetching user quota:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
