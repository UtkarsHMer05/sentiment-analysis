import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { checkAndDeductQuota } from "~/lib/quota";

const PDF_ANALYZER_SERVICE_URL = "http://127.0.0.1:8001";

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Check and deduct quota (2 points for PDF analysis)
        const quotaResult = await checkAndDeductQuota(session.user.id, "pdf_analysis");

        if (!quotaResult.success) {
            return NextResponse.json(
                {
                    error: "Insufficient quota",
                    message: quotaResult.message,
                    quotaInfo: quotaResult.quotaInfo
                },
                { status: 429 }
            );
        }

        // Get the uploaded file from form data
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const analysisType = formData.get("analysisType") as string || "both";

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type (PDF and Excel files)
        const fileName = file.name.toLowerCase();
        const validExtensions = ['.pdf', '.xlsx', '.xls'];
        const isValidFile = validExtensions.some(ext => fileName.endsWith(ext));

        if (!isValidFile) {
            return NextResponse.json(
                { error: "File must be a PDF or Excel file (.pdf, .xlsx, .xls)" },
                { status: 400 }
            );
        }

        // Validate file size (50MB limit)
        const MAX_SIZE = 50 * 1024 * 1024; // 50MB
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: "File size exceeds 50MB limit" },
                { status: 413 }
            );
        }

        // Check if Python service is available
        try {
            const healthResponse = await fetch(`${PDF_ANALYZER_SERVICE_URL}/health`, {
                method: 'GET',
                signal: AbortSignal.timeout(5000) // 5 second timeout
            });

            if (!healthResponse.ok) {
                throw new Error("PDF analyzer service is not available");
            }

            const healthData = await healthResponse.json();
            if (!healthData.all_models_ready) {
                return NextResponse.json(
                    {
                        error: "PDF analyzer service is still loading models",
                        message: "Please try again in a few moments",
                        modelStatus: healthData.models_loaded
                    },
                    { status: 503 }
                );
            }
        } catch (error) {
            console.error("PDF analyzer service health check failed:", error);
            return NextResponse.json(
                {
                    error: "PDF analyzer service unavailable",
                    message: "The PDF analysis service is currently unavailable. Please try again later."
                },
                { status: 503 }
            );
        }

        // Create form data for Python service
        const pythonFormData = new FormData();
        pythonFormData.append("file", file);
        pythonFormData.append("analysis_type", analysisType);

        // Call Python backend
        const analysisResponse = await fetch(`${PDF_ANALYZER_SERVICE_URL}/analyze-document`, {
            method: 'POST',
            body: pythonFormData,
            signal: AbortSignal.timeout(120000) // 2 minute timeout for analysis
        });

        if (!analysisResponse.ok) {
            const errorData = await analysisResponse.text();
            console.error("PDF analysis failed:", errorData);
            return NextResponse.json(
                {
                    error: "PDF analysis failed",
                    message: "Failed to analyze the PDF file. Please try again."
                },
                { status: 500 }
            );
        }

        const analysisResult = await analysisResponse.json();

        // Add user info and quota info to response
        const response = {
            ...analysisResult,
            userId: session.user.id,
            quotaUsed: 2,
            remainingQuota: quotaResult.remaining! - 2,
            timestamp: new Date().toISOString()
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error("PDF analysis API error:", error);

        if (error instanceof Error && error.name === 'AbortError') {
            return NextResponse.json(
                { error: "Request timeout", message: "The analysis took too long. Please try with a smaller file." },
                { status: 408 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error", message: "An unexpected error occurred. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        // Check authentication
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Check PDF analyzer service status
        try {
            const healthResponse = await fetch(`${PDF_ANALYZER_SERVICE_URL}/health`, {
                method: 'GET',
                signal: AbortSignal.timeout(5000)
            });

            if (!healthResponse.ok) {
                throw new Error("Service unavailable");
            }

            const healthData = await healthResponse.json();

            return NextResponse.json({
                status: "available",
                modelStatus: healthData.models_loaded,
                allModelsReady: healthData.all_models_ready,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            return NextResponse.json({
                status: "unavailable",
                error: "PDF analyzer service is not responding",
                timestamp: new Date().toISOString()
            }, { status: 503 });
        }

    } catch (error) {
        console.error("PDF analysis status check error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}