import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  InvokeEndpointCommand,
  SageMakerRuntimeClient,
} from "@aws-sdk/client-sagemaker-runtime";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { env } from "~/env";
import { checkAndUpdateQuota, refundQuota } from "~/lib/quota";
import { db } from "~/server/db";

export async function POST(req: Request) {
  let quota: { userId: string } | null = null;
  let quotaDeducted = false;

  try {
    console.log("🔍 Starting sentiment analysis request");

    // Get API key from the header
    const apiKey = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 401 });
    }

    // Find the user by API key
    quota = await db.apiQuota.findUnique({
      where: {
        secretKey: apiKey,
      },
      select: {
        userId: true,
      },
    });

    if (!quota) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    console.log(`👤 User found: ${quota.userId}`);

    const { key } = await req.json();

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    const file = await db.videoFile.findUnique({
      where: { key },
      select: { userId: true, analyzed: true },
    });

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    if (file.userId !== quota.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (file.analyzed) {
      return NextResponse.json(
        { error: "File already analyzed" },
        { status: 400 },
      );
    }

    // FIXED: Check quota for sentiment_analysis (2 points)
    console.log("💳 Checking quota for sentiment_analysis (2 points)");
    const quotaCheck = await checkAndUpdateQuota(
      quota.userId,
      "sentiment_analysis",
      false,
    );

    if (!quotaCheck.success) {
      console.warn("❌ Quota check failed:", quotaCheck.message);
      return NextResponse.json(
        {
          error:
            quotaCheck.message || "Insufficient quota for sentiment analysis",
          remaining: quotaCheck.remaining || 0,
          required: 2,
          quotaInfo: quotaCheck.quotaInfo,
        },
        { status: 429 },
      );
    }

    // FIXED: Deduct 2 quota points for sentiment analysis
    console.log("💳 Deducting 2 quota points for sentiment analysis");
    const quotaDeduction = await checkAndUpdateQuota(
      quota.userId,
      "sentiment_analysis",
      true,
    );

    if (!quotaDeduction.success) {
      console.error("❌ Failed to deduct quota:", quotaDeduction.message);
      return NextResponse.json(
        {
          error: quotaDeduction.message || "Failed to deduct quota",
          remaining: quotaDeduction.remaining || 0,
        },
        { status: 429 },
      );
    }

    quotaDeducted = true;
    console.log(
      `✅ Successfully deducted 2 quota points. Remaining: ${quotaDeduction.remaining}`,
    );

    try {
      console.log("🤖 Calling SageMaker endpoint for analysis");

      // Call sagemaker endpoint
      const sagemakerClient = new SageMakerRuntimeClient({
        region: env.AWS_REGION,
        credentials: {
          accessKeyId: env.AWS_ACCESS_KEY_ID,
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        },
      });

      const command = new InvokeEndpointCommand({
        EndpointName: env.AWS_ENDPOINT_NAME,
        ContentType: "application/json",
        Body: JSON.stringify({
          video_path: `s3://sentiment-analysis05/${key}`,
        }),
      });

      const response = await sagemakerClient.send(command);

      // Check if response is valid
      if (!response.Body) {
        throw new Error("No response body from SageMaker endpoint");
      }

      const analysis = JSON.parse(new TextDecoder().decode(response.Body));

      // Validate analysis response
      if (!analysis || typeof analysis !== "object") {
        throw new Error("Invalid analysis response format");
      }

      console.log("✅ SageMaker analysis completed successfully");

      // Mark file as analyzed
      await db.videoFile.update({
        where: { key },
        data: {
          analyzed: true,
        },
      });

      quotaDeducted = false; // Reset since analysis was successful

      return NextResponse.json({
        analysis,
        quotaInfo: {
          remaining: quotaDeduction.remaining,
          used: quotaDeduction.quotaInfo?.requestsUsed,
          maxRequests: quotaDeduction.quotaInfo?.maxRequests,
          deducted: 2, // Show how much was deducted
          type: "sentiment_analysis",
        },
      });
    } catch (sagemakerError) {
      console.error("❌ SageMaker analysis error:", sagemakerError);

      // Refund quota if analysis failed
      if (quotaDeducted && quota?.userId) {
        console.log("🔄 Refunding 2 quota points due to analysis failure");
        const refundSuccess = await refundQuota(
          quota.userId,
          "sentiment_analysis",
        );
        quotaDeducted = !refundSuccess;

        if (!refundSuccess) {
          console.error("❌ Failed to refund quota for user:", quota.userId);
        } else {
          console.log("✅ Successfully refunded 2 quota points");
        }
      }

      // Return appropriate error based on the type of failure
      if (sagemakerError instanceof Error) {
        if (sagemakerError.message.includes("endpoint")) {
          return NextResponse.json(
            {
              error:
                "Analysis service temporarily unavailable. Your 2 quota points have been refunded.",
              refunded: !quotaDeducted,
              refundedAmount: 2,
            },
            { status: 503 },
          );
        }

        if (sagemakerError.message.includes("timeout")) {
          return NextResponse.json(
            {
              error:
                "Analysis timed out. Your 2 quota points have been refunded.",
              refunded: !quotaDeducted,
              refundedAmount: 2,
            },
            { status: 504 },
          );
        }
      }

      return NextResponse.json(
        {
          error: "Analysis failed. Your 2 quota points have been refunded.",
          refunded: !quotaDeducted,
          refundedAmount: 2,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("❌ Sentiment analysis API error:", error);

    // If we have the userId and quota was deducted, try to refund
    if (quotaDeducted && quota?.userId) {
      try {
        console.log("🔄 Refunding 2 quota points due to API error");
        const refundSuccess = await refundQuota(
          quota.userId,
          "sentiment_analysis",
        );
        return NextResponse.json(
          {
            error:
              "Internal server error. Your 2 quota points have been refunded.",
            refunded: refundSuccess,
            refundedAmount: 2,
          },
          { status: 500 },
        );
      } catch (refundError) {
        console.error(
          "❌ Failed to refund quota during error handling:",
          refundError,
        );
        return NextResponse.json(
          {
            error: "Internal server error. Failed to refund quota.",
            refunded: false,
          },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
