import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import { auth } from "~/server/auth";
import { checkAndUpdateQuota, refundQuota, QUOTA_COSTS } from "~/lib/quota";

export async function POST(request: NextRequest) {
  try {
    console.log("🎥 Starting live emotion detection request");

    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Authentication required. Please log in to access live emotion detection.",
        },
        { status: 401 },
      );
    }

    console.log(`👤 User authenticated: ${session.user.id}`);

    const formData = await request.formData();
    const videoFile = formData.get("video") as File;
    const duration = formData.get("duration") as string;

    if (!videoFile) {
      return NextResponse.json(
        {
          success: false,
          error: "Video file is required",
        },
        { status: 400 },
      );
    }

    console.log(
      `📹 Video file received: ${videoFile.size} bytes, duration: ${duration}`,
    );

    // FIXED: Use simplified quota type - always "live_detection" (10 points)
    const quotaType = "live_detection";
    const quotaCost = QUOTA_COSTS[quotaType]; // This is 10 points

    console.log(`💳 Checking quota for live_detection (${quotaCost} points)`);

    // Check quota before processing
    const quotaCheck = await checkAndUpdateQuota(
      session.user.id,
      quotaType,
      false,
    );

    if (!quotaCheck.success) {
      console.warn("❌ Quota check failed:", quotaCheck.message);
      return NextResponse.json(
        {
          success: false,
          error:
            quotaCheck.message ||
            "Insufficient quota for live emotion detection",
          quotaInfo: {
            required: quotaCost,
            remaining: quotaCheck.remaining || 0,
            type: "quota_exceeded",
          },
        },
        { status: 429 },
      );
    }

    // FIXED: Deduct 10 quota points for live detection
    console.log(`💳 Deducting ${quotaCost} quota points for live detection`);
    const quotaDeduction = await checkAndUpdateQuota(
      session.user.id,
      quotaType,
      true,
    );

    if (!quotaDeduction.success) {
      console.error("❌ Failed to deduct quota:", quotaDeduction.message);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to process quota. Please try again.",
        },
        { status: 500 },
      );
    }

    console.log(
      `✅ Successfully deducted ${quotaCost} quota points. Remaining: ${quotaDeduction.remaining}`,
    );

    // Convert video to base64
    const videoBuffer = Buffer.from(await videoFile.arrayBuffer());
    const videoBase64 = videoBuffer.toString("base64");

    // Prepare data for Python processor
    const inputData = {
      duration: duration || "1min",
      model_path: path.join(
        process.cwd(),
        "src/server/python_backend/model.pth",
      ),
      user_id: session.user.id,
      quota_used: quotaCost,
    };

    console.log("🐍 Starting Python backend processing");

    // Call Python backend
    const pythonPath = path.join(
      process.cwd(),
      "src/server/python_backend/live_processor.py",
    );

    return new Promise<NextResponse>((resolve) => {
      const pythonProcess = spawn(
        "python",
        [pythonPath, JSON.stringify(inputData)],
        {
          stdio: ["pipe", "pipe", "pipe"],
        },
      );

      let result = "";
      let error = "";

      // Send video data via stdin
      pythonProcess.stdin.write(videoBase64);
      pythonProcess.stdin.end();

      pythonProcess.stdout.on("data", (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        error += data.toString();
      });

      pythonProcess.on("close", async (code) => {
        if (code === 0 && result) {
          try {
            const parsedResult = JSON.parse(result);
            console.log("✅ Python processing completed successfully");

            // Add quota information to response
            parsedResult.quotaInfo = {
              used: quotaCost,
              remaining: quotaDeduction.remaining,
              type: quotaType,
              deducted: quotaCost,
            };

            resolve(NextResponse.json(parsedResult));
          } catch (e) {
            console.error("❌ Failed to parse Python result:", e);
            console.log("🔄 Refunding quota due to parsing error");

            // Refund quota on parsing error
            await refundQuota(session.user.id, quotaType);
            resolve(
              NextResponse.json({
                success: false,
                error: `Failed to parse processing results. Your ${quotaCost} quota points have been refunded.`,
                refunded: true,
                refundedAmount: quotaCost,
              }),
            );
          }
        } else {
          console.error("❌ Python processing failed:", error);
          console.log("🔄 Refunding quota due to processing error");

          // Refund quota on processing error
          await refundQuota(session.user.id, quotaType);
          resolve(
            NextResponse.json({
              success: false,
              error: `Processing failed: ${error || "Unknown error"}. Your ${quotaCost} quota points have been refunded.`,
              refunded: true,
              refundedAmount: quotaCost,
            }),
          );
        }
      });

      // Handle timeout
      setTimeout(async () => {
        console.warn("⏰ Python processing timeout");
        console.log("🔄 Refunding quota due to timeout");

        pythonProcess.kill();
        // Refund quota on timeout
        await refundQuota(session.user.id, quotaType);
        resolve(
          NextResponse.json({
            success: false,
            error: `Processing timeout. Your ${quotaCost} quota points have been refunded.`,
            refunded: true,
            refundedAmount: quotaCost,
          }),
        );
      }, 120000); // 2 minute timeout for live processing
    });
  } catch (error) {
    console.error("❌ Live emotion detection API error:", error);
    return NextResponse.json({
      success: false,
      error: "API request failed: " + error,
    });
  }
}
