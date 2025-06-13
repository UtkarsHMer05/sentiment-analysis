import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { getQuotaStatus, QUOTA_COSTS } from "~/lib/quota";

export async function GET(req: NextRequest) {
  try {
    console.log("📊 Fetching quota status for user");

    const session = await auth();

    if (!session?.user?.id) {
      console.warn("❌ Unauthorized quota status request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`👤 Getting quota status for user: ${session.user.id}`);

    const quotaStatus = await getQuotaStatus(session.user.id);

    if (!quotaStatus) {
      console.error("❌ Failed to fetch quota status from database");
      return NextResponse.json(
        { error: "Failed to fetch quota status" },
        { status: 500 },
      );
    }

    // FIXED: Calculate what user can afford with simplified quota system
    const canAfford = {
      sentiment_analysis: Math.floor(
        quotaStatus.remaining / QUOTA_COSTS.sentiment_analysis,
      ),
      live_detection: Math.floor(
        quotaStatus.remaining / QUOTA_COSTS.live_detection,
      ),
    };

    console.log(`📈 Quota status calculated:`, {
      remaining: quotaStatus.remaining,
      canAfford,
      costs: QUOTA_COSTS,
    });

    // FIXED: Return simplified quota response
    const response = {
      maxRequests: quotaStatus.maxRequests,
      requestsUsed: quotaStatus.requestsUsed,
      remaining: quotaStatus.remaining,
      resetDate: quotaStatus.resetDate,
      quotaCosts: QUOTA_COSTS, // Only 2 types now: sentiment_analysis (2) and live_detection (10)
      canAfford,
      // Additional helpful information
      usagePercentage: Math.round(
        (quotaStatus.requestsUsed / quotaStatus.maxRequests) * 100,
      ),
      status:
        quotaStatus.remaining <= 5
          ? "low"
          : quotaStatus.remaining <= 15
            ? "medium"
            : "healthy",
      recommendations: {
        sentiment_analysis:
          canAfford.sentiment_analysis > 0 ? "available" : "insufficient_quota",
        live_detection:
          canAfford.live_detection > 0 ? "available" : "insufficient_quota",
      },
    };

    console.log("✅ Quota status response prepared:", response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ Error fetching quota status:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// FIXED: Add POST method for quota refresh
export async function POST(req: NextRequest) {
  try {
    console.log("🔄 Refreshing quota status for user");

    const session = await auth();

    if (!session?.user?.id) {
      console.warn("❌ Unauthorized quota refresh request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await req.json();

    if (action === "refresh") {
      console.log(`🔄 Refreshing quota for user: ${session.user.id}`);

      const quotaStatus = await getQuotaStatus(session.user.id);

      if (!quotaStatus) {
        console.error("❌ Failed to refresh quota status");
        return NextResponse.json(
          { error: "Failed to refresh quota status" },
          { status: 500 },
        );
      }

      const canAfford = {
        sentiment_analysis: Math.floor(
          quotaStatus.remaining / QUOTA_COSTS.sentiment_analysis,
        ),
        live_detection: Math.floor(
          quotaStatus.remaining / QUOTA_COSTS.live_detection,
        ),
      };

      const response = {
        maxRequests: quotaStatus.maxRequests,
        requestsUsed: quotaStatus.requestsUsed,
        remaining: quotaStatus.remaining,
        resetDate: quotaStatus.resetDate,
        quotaCosts: QUOTA_COSTS,
        canAfford,
        usagePercentage: Math.round(
          (quotaStatus.requestsUsed / quotaStatus.maxRequests) * 100,
        ),
        status:
          quotaStatus.remaining <= 5
            ? "low"
            : quotaStatus.remaining <= 15
              ? "medium"
              : "healthy",
        refreshed: true,
        timestamp: new Date().toISOString(),
      };

      console.log("✅ Quota status refreshed successfully");
      return NextResponse.json(response);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("❌ Error refreshing quota status:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
