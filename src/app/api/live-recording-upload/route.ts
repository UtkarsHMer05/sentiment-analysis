import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/auth";
import {
  checkAndUpdateQuota,
  refundQuota,
  QUOTA_COSTS,
  type QuotaType,
} from "~/lib/quota";
import { db } from "~/server/db";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "~/env";
import crypto from "crypto";

// Fixed interface with flexible quotaInfo structure
interface UploadResponse {
  success: boolean;
  uploadUrl?: string;
  key?: string;
  fileId?: string;
  quotaInfo?: {
    used?: number;
    remaining: number;
    type: string;
    required?: number; // Added for error responses
  };
  error?: string;
}

interface VideoUploadData {
  fileType: string;
  duration: string;
  size: number;
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<UploadResponse>> {
  console.log("🚀 Live recording upload endpoint hit");
  try {
    // Check authentication
    console.log("🔐 Checking authentication...");
    const session = await auth();
    if (!session?.user?.id) {
      console.log("❌ Authentication failed: No session found");
      return NextResponse.json(
        {
          success: false,
          error:
            "Authentication required. Please log in to access live recording upload.",
        },
        { status: 401 },
      );
    }
    console.log(`✅ Authenticated as user: ${session.user.id}`);

    console.log("📦 Parsing request body...");
    const body: VideoUploadData = await request.json();
    const { fileType, duration, size } = body;
    console.log("Request body parsed:", { fileType, duration, size });

    if (!fileType || !duration) {
      console.log("❌ Validation failed: Missing fileType or duration");
      return NextResponse.json(
        {
          success: false,
          error: "File type and duration are required",
        },
        { status: 400 },
      );
    }

    // Validate file type
    if (!fileType.match(/\.(webm|mp4|mov|avi)$/i)) {
      console.log(`❌ Validation failed: Invalid file type ${fileType}`);
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid file type. Only .webm, .mp4, .mov, .avi are supported",
        },
        { status: 400 },
      );
    }

    // Validate file size (max 100MB for live recordings)
    if (size > 100 * 1024 * 1024) {
      console.log(`❌ Validation failed: File size too large ${size}`);
      return NextResponse.json(
        {
          success: false,
          error:
            "File size too large. Maximum 100MB allowed for live recordings.",
        },
        { status: 400 },
      );
    }
    console.log("✅ Request body validated");

    // Determine quota type - use simplified live_detection for all live recordings
    const quotaType: QuotaType = "live_detection";
    const quotaCost = QUOTA_COSTS[quotaType];
    console.log(`💳 Quota type: ${quotaType}, Cost: ${quotaCost}`);

    // Check quota before processing
    console.log("🧐 Checking quota (pre-check)...");
    const quotaCheck = await checkAndUpdateQuota(
      session.user.id,
      quotaType,
      false,
    );

    if (!quotaCheck.success) {
      console.log("❌ Quota pre-check failed:", quotaCheck.message);
      return NextResponse.json(
        {
          success: false,
          error: quotaCheck.message,
          quotaInfo: {
            required: quotaCost,
            remaining: quotaCheck.remaining || 0,
            type: "quota_exceeded",
          },
        },
        { status: 429 },
      );
    }
    console.log("✅ Quota pre-check passed. Remaining:", quotaCheck.remaining);

    // Deduct quota after successful check
    console.log("💸 Deducting quota...");
    const quotaDeduction = await checkAndUpdateQuota(
      session.user.id,
      quotaType,
      true,
    );

    if (!quotaDeduction.success) {
      console.log("❌ Quota deduction failed");
      return NextResponse.json(
        {
          success: false,
          error: "Failed to process quota. Please try again.",
        },
        { status: 500 },
      );
    }
    console.log("✅ Quota deducted. Remaining:", quotaDeduction.remaining);

    try {
      // Generate S3 upload URL
      console.log("☁️ Generating S3 upload URL...");
      const s3Client = new S3Client({
        region: env.AWS_REGION,
        credentials: {
          accessKeyId: env.AWS_ACCESS_KEY_ID,
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        },
        // Disable checksum middleware to prevent 403 errors with browser uploads
        requestChecksumCalculation: "WHEN_REQUIRED",
      });
      console.log("S3 client created for region:", env.AWS_REGION);

      const fileId = crypto.randomUUID();
      const key = `live-recordings/${session.user.id}/${fileId}${fileType}`;
      console.log("Generated S3 key:", key);

      const command = new PutObjectCommand({
        Bucket: env.AWS_INFERENCE_BUCKET,
        Key: key,
        ContentType: `video/${fileType.replace(".", "")}`,
        Metadata: {
          userId: session.user.id,
          uploadType: "live-recording",
          duration: duration,
          quotaType: quotaType,
        },
      });

      const uploadUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
        // Simplify the signed headers to only include host
        signableHeaders: new Set(['host']),
      });
      console.log("✅ S3 pre-signed URL generated successfully.");

      // Create database record
      console.log("✍️ Creating video file record in database...");
      await db.videoFile.create({
        data: {
          key: key,
          userId: session.user.id,
          analyzed: false,
        },
      });
      console.log("✅ Database record created.");

      return NextResponse.json({
        success: true,
        uploadUrl,
        key,
        fileId,
        quotaInfo: {
          used: quotaCost,
          remaining: quotaDeduction.remaining || 0, // Fixed: Handle undefined
          type: quotaType,
        },
      });
    } catch (uploadError) {
      // Refund quota if upload URL generation fails
      console.error("❌ Error during S3 URL generation or DB write:", uploadError);
      console.log("💰 Refunding quota...");
      await refundQuota(session.user.id, quotaType);
      console.log("✅ Quota refunded.");

      return NextResponse.json(
        {
          success: false,
          error: "Failed to generate upload URL. Quota refunded.",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("🚨 Live recording upload API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
