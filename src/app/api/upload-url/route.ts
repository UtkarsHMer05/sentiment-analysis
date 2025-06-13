// app/api/upload-url/route.ts

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { env } from "~/env";
import { db } from "~/server/db";
import { getQuotaStatus } from "~/lib/quota";

export async function POST(req: Request) {
  try {
    console.log("📤 Starting upload URL generation");

    // 1. Get API key from the Authorization header
    const apiKey = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 401 });
    }

    // 2. Find the user by API key
    const quota = await db.apiQuota.findUnique({
      where: {
        secretKey: apiKey,
      },
      select: {
        userId: true,
        requestsUsed: true,
        maxRequests: true,
      },
    });

    if (!quota) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    console.log(`👤 User found: ${quota.userId}`);

    // 3. FIXED: Only check quota status, don't deduct anything yet
    // Quota will be deducted when actual analysis happens
    const quotaStatus = await getQuotaStatus(quota.userId);

    if (!quotaStatus) {
      return NextResponse.json(
        { error: "Failed to get quota status" },
        { status: 500 },
      );
    }

    console.log(
      `📊 Current quota: ${quotaStatus.requestsUsed}/${quotaStatus.maxRequests}, remaining: ${quotaStatus.remaining}`,
    );

    // 4. Check if user has any quota remaining (minimum 2 points for sentiment analysis)
    if (quotaStatus.remaining < 2) {
      return NextResponse.json(
        {
          error: "Insufficient quota",
          message: `You have ${quotaStatus.remaining} quota points remaining. You need at least 2 points for sentiment analysis.`,
          quotaUsed: quotaStatus.requestsUsed,
          quotaMax: quotaStatus.maxRequests,
          remaining: quotaStatus.remaining,
          canAfford: quotaStatus.canAfford,
        },
        { status: 429 },
      );
    }

    // 5. Parse the file type from the request body
    const { fileType } = await req.json();

    if (!fileType || !fileType.match(/\.(mp4|mov|avi)$/i)) {
      return NextResponse.json(
        { error: "Invalid file type. Only .mp4, .mov, .avi are supported" },
        { status: 400 },
      );
    }

    console.log(`📁 File type: ${fileType}`);

    // 6. Generate a unique S3 key for the upload
    const s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const id = crypto.randomUUID();
    const key = `inference/${id}${fileType}`;

    const command = new PutObjectCommand({
      Bucket: env.AWS_INFERENCE_BUCKET,
      Key: key,
      ContentType: `video/${fileType.replace(".", "")}`,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    console.log(`🔗 Generated signed URL for key: ${key}`);

    // 7. Record the upload in your database for later analysis
    await db.videoFile.create({
      data: {
        key: key,
        userId: quota.userId,
        analyzed: false,
      },
    });

    console.log("✅ Video file record created in database");

    // 8. FIXED: Return the signed URL and current quota info (no deduction)
    return NextResponse.json({
      url,
      fileId: id,
      fileType,
      key,
      quota: {
        used: quotaStatus.requestsUsed,
        max: quotaStatus.maxRequests,
        remaining: quotaStatus.remaining,
        canAfford: quotaStatus.canAfford,
        costs: {
          sentiment_analysis: 2,
          live_detection: 10,
        },
      },
      message:
        "Upload URL generated. Quota will be deducted when analysis starts.",
    });
  } catch (error) {
    console.error("❌ Upload URL generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
