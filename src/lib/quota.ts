import { db } from "~/server/db";

// FIXED: Simplified quota types - now 3 types
export const QUOTA_COSTS = {
  sentiment_analysis: 2, // Changed from 3 to 2
  live_detection: 2,
  pdf_analysis: 2, // New PDF analysis type
} as const;

export type QuotaType = keyof typeof QUOTA_COSTS;

export interface QuotaStatus {
  maxRequests: number;
  requestsUsed: number;
  remaining: number;
  resetDate: Date;
  quotaCosts: typeof QUOTA_COSTS;
  canAfford: {
    sentiment_analysis: number;
    live_detection: number;
    pdf_analysis: number;
  };
}

export interface QuotaCheckResult {
  success: boolean;
  remaining?: number;
  message?: string;
  quotaInfo?: {
    maxRequests: number;
    requestsUsed: number;
    remaining: number;
  };
}

/**
 * Check and optionally update user quota
 * @param userId - User ID
 * @param quotaType - Type of quota to check/deduct
 * @param deduct - Whether to actually deduct the quota
 * @returns QuotaCheckResult
 */
export async function checkAndUpdateQuota(
  userId: string,
  quotaType: QuotaType,
  deduct: boolean = false,
): Promise<QuotaCheckResult> {
  try {
    console.log(
      `🔍 Checking quota for user ${userId}, type: ${quotaType}, deduct: ${deduct}`,
    );

    // Get current quota
    const quota = await db.apiQuota.findUnique({
      where: { userId },
      select: {
        requestsUsed: true,
        maxRequests: true,
        resetDate: true,
      },
    });

    if (!quota) {
      console.error(`❌ No quota found for user: ${userId}`);
      return {
        success: false,
        message: "Quota not found. Please contact support.",
      };
    }

    const cost = QUOTA_COSTS[quotaType];
    const remaining = quota.maxRequests - quota.requestsUsed;

    console.log(
      `📊 Current quota: ${quota.requestsUsed}/${quota.maxRequests}, remaining: ${remaining}, cost: ${cost}`,
    );

    // Check if user has enough quota
    if (remaining < cost) {
      console.warn(`⚠️ Insufficient quota: need ${cost}, have ${remaining}`);
      return {
        success: false,
        remaining,
        message: `Insufficient quota. You need ${cost} points but only have ${remaining} remaining.`,
        quotaInfo: {
          maxRequests: quota.maxRequests,
          requestsUsed: quota.requestsUsed,
          remaining,
        },
      };
    }

    // If not deducting, just return success
    if (!deduct) {
      console.log(`✅ Quota check passed (no deduction)`);
      return {
        success: true,
        remaining,
        quotaInfo: {
          maxRequests: quota.maxRequests,
          requestsUsed: quota.requestsUsed,
          remaining,
        },
      };
    }

    // Deduct quota atomically
    console.log(`💳 Deducting ${cost} quota points...`);

    const updatedQuota = await db.apiQuota.update({
      where: {
        userId,
      },
      data: {
        requestsUsed: { increment: cost },
      },
      select: {
        requestsUsed: true,
        maxRequests: true,
      },
    });

    if (!updatedQuota) {
      console.error(`❌ Failed to deduct quota atomically`);
      return {
        success: false,
        message: "Failed to deduct quota. Please try again.",
        remaining,
      };
    }

    const newRemaining = updatedQuota.maxRequests - updatedQuota.requestsUsed;

    console.log(
      `✅ Quota deducted successfully: ${updatedQuota.requestsUsed}/${updatedQuota.maxRequests}, remaining: ${newRemaining}`,
    );

    return {
      success: true,
      remaining: newRemaining,
      quotaInfo: {
        maxRequests: updatedQuota.maxRequests,
        requestsUsed: updatedQuota.requestsUsed,
        remaining: newRemaining,
      },
    };
  } catch (error) {
    console.error("❌ Error in checkAndUpdateQuota:", error);
    return {
      success: false,
      message: "Internal error checking quota. Please try again.",
    };
  }
}

/**
 * Check and deduct quota in one operation
 * @param userId - User ID
 * @param quotaType - Type of quota to deduct
 * @returns QuotaCheckResult
 */
export async function checkAndDeductQuota(
  userId: string,
  quotaType: QuotaType,
): Promise<QuotaCheckResult> {
  return checkAndUpdateQuota(userId, quotaType, true);
}

/**
 * Refund quota points to user
 * @param userId - User ID
 * @param quotaType - Type of quota to refund
 * @returns boolean - Success status
 */
export async function refundQuota(
  userId: string,
  quotaType: QuotaType,
): Promise<boolean> {
  try {
    const cost = QUOTA_COSTS[quotaType];
    console.log(
      `🔄 Refunding ${cost} quota points for user ${userId}, type: ${quotaType}`,
    );

    const updatedQuota = await db.apiQuota.update({
      where: { userId },
      data: {
        requestsUsed: { decrement: cost },
      },
      select: {
        requestsUsed: true,
        maxRequests: true,
      },
    });

    // Ensure requestsUsed doesn't go below 0
    if (updatedQuota.requestsUsed < 0) {
      await db.apiQuota.update({
        where: { userId },
        data: { requestsUsed: 0 },
      });
    }

    console.log(
      `✅ Quota refunded successfully: ${updatedQuota.requestsUsed}/${updatedQuota.maxRequests}`,
    );
    return true;
  } catch (error) {
    console.error("❌ Error refunding quota:", error);
    return false;
  }
}

/**
 * Get comprehensive quota status for user
 * @param userId - User ID
 * @returns QuotaStatus or null
 */
export async function getQuotaStatus(
  userId: string,
): Promise<QuotaStatus | null> {
  try {
    console.log(`📊 Getting quota status for user: ${userId}`);

    const quota = await db.apiQuota.findUnique({
      where: { userId },
      select: {
        requestsUsed: true,
        maxRequests: true,
        resetDate: true,
      },
    });

    if (!quota) {
      console.error(`❌ No quota found for user: ${userId}`);
      return null;
    }

    const remaining = quota.maxRequests - quota.requestsUsed;

    // Calculate what user can afford with remaining quota
    const canAfford = {
      sentiment_analysis: Math.floor(
        remaining / QUOTA_COSTS.sentiment_analysis,
      ),
      live_detection: Math.floor(remaining / QUOTA_COSTS.live_detection),
      pdf_analysis: Math.floor(remaining / QUOTA_COSTS.pdf_analysis),
    };

    console.log(
      `📈 Quota status: ${quota.requestsUsed}/${quota.maxRequests}, can afford: ${JSON.stringify(canAfford)}`,
    );

    return {
      maxRequests: quota.maxRequests,
      requestsUsed: quota.requestsUsed,
      remaining,
      resetDate: quota.resetDate,
      quotaCosts: QUOTA_COSTS,
      canAfford,
    };
  } catch (error) {
    console.error("❌ Error getting quota status:", error);
    return null;
  }
}

/**
 * Reset user quota (for admin use or monthly reset)
 * @param userId - User ID
 * @returns boolean - Success status
 */
export async function resetUserQuota(userId: string): Promise<boolean> {
  try {
    console.log(`🔄 Resetting quota for user: ${userId}`);

    await db.apiQuota.update({
      where: { userId },
      data: {
        requestsUsed: 0,
        resetDate: new Date(),
      },
    });

    console.log(`✅ Quota reset successfully for user: ${userId}`);
    return true;
  } catch (error) {
    console.error("❌ Error resetting quota:", error);
    return false;
  }
}

/**
 * Add quota points to user (for purchases/upgrades)
 * @param userId - User ID
 * @param additionalQuota - Points to add
 * @returns boolean - Success status
 */
export async function addQuotaPoints(
  userId: string,
  additionalQuota: number,
): Promise<boolean> {
  try {
    console.log(
      `➕ Adding ${additionalQuota} quota points for user: ${userId}`,
    );

    const updatedQuota = await db.apiQuota.update({
      where: { userId },
      data: {
        maxRequests: { increment: additionalQuota },
      },
      select: {
        maxRequests: true,
        requestsUsed: true,
      },
    });

    console.log(
      `✅ Quota points added: ${updatedQuota.requestsUsed}/${updatedQuota.maxRequests}`,
    );
    return true;
  } catch (error) {
    console.error("❌ Error adding quota points:", error);
    return false;
  }
}
