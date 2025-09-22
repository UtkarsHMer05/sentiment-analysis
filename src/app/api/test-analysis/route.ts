import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(req: NextRequest) {
    try {
        console.log("🧪 Test analysis endpoint called");

        // Get API key from the header
        const apiKey = req.headers.get("Authorization")?.replace("Bearer ", "");
        if (!apiKey) {
            return NextResponse.json({ error: "API key required" }, { status: 401 });
        }

        console.log("🔑 API key received:", apiKey?.substring(0, 20) + "...");

        // Find the user by API key
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

        const { key } = await req.json();

        if (!key) {
            return NextResponse.json({ error: "Key is required" }, { status: 400 });
        }

        console.log("🔍 Looking for video file with key:", key);

        const file = await db.videoFile.findUnique({
            where: { key },
            select: { userId: true, analyzed: true, id: true, createdAt: true },
        });

        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        console.log("📁 File found:", file);

        if (file.userId !== quota.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        return NextResponse.json({
            success: true,
            message: "Test successful - API key and file validation passed",
            fileInfo: file,
            quotaInfo: quota,
        });
    } catch (error) {
        console.error("❌ Test analysis API error:", error);
        return NextResponse.json(
            { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 },
        );
    }
}
