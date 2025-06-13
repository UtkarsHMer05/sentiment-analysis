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
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Authentication required. Please log in to access live recording upload.",
        },
        { status: 401 },
      );
    }

    const body: VideoUploadData = await request.json();
    const { fileType, duration, size } = body;

    if (!fileType || !duration) {
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
      return NextResponse.json(
        {
          success: false,
          error:
            "File size too large. Maximum 100MB allowed for live recordings.",
        },
        { status: 400 },
      );
    }

    // Determine quota type based on duration
    const quotaType: QuotaType =
      duration === "2min" ? "live_emotion_2min" : "live_emotion_1min";
    const quotaCost = QUOTA_COSTS[quotaType];

    // Check quota before processing
    const quotaCheck = await checkAndUpdateQuota(
      session.user.id,
      quotaType,
      false,
    );

    if (!quotaCheck.success) {
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

    // Deduct quota after successful check
    const quotaDeduction = await checkAndUpdateQuota(
      session.user.id,
      quotaType,
      true,
    );

    if (!quotaDeduction.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to process quota. Please try again.",
        },
        { status: 500 },
      );
    }

    try {
      // Generate S3 upload URL
      const s3Client = new S3Client({
        region: env.AWS_REGION,
        credentials: {
          accessKeyId: env.AWS_ACCESS_KEY_ID,
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        },
      });

      const fileId = crypto.randomUUID();
      const key = `live-recordings/${session.user.id}/${fileId}${fileType}`;

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
      });

      // Create database record
      await db.videoFile.create({
        data: {
          key: key,
          userId: session.user.id,
          analyzed: false,
        },
      });

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
      await refundQuota(session.user.id, quotaType);

      console.error("Upload URL generation error:", uploadError);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to generate upload URL. Quota refunded.",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Live recording upload API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
