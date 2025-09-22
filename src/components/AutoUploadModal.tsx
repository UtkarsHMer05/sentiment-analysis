"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  X,
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
  Cloud,
  Zap,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AutoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoBlob: Blob | null;
  onUploadComplete: (result: any) => void;
}

interface UploadStage {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: "pending" | "active" | "completed" | "error";
}

export function AutoUploadModal({
  isOpen,
  onClose,
  videoBlob,
  onUploadComplete,
}: AutoUploadModalProps) {
  const router = useRouter();
  const [uploadStages, setUploadStages] = useState<UploadStage[]>([
    {
      id: "prepare",
      name: "Preparing Video",
      description: "Compressing and optimizing video file...",
      progress: 0,
      status: "pending",
    },
    {
      id: "upload",
      name: "Uploading to AWS S3",
      description: "Securely uploading to cloud storage...",
      progress: 0,
      status: "pending",
    },
    {
      id: "analyze",
      name: "AI Analysis",
      description: "Processing with trained sentiment model...",
      progress: 0,
      status: "pending",
    },
    {
      id: "complete",
      name: "Results Ready",
      description: "Analysis complete and results generated",
      progress: 0,
      status: "pending",
    },
  ]);

  const [currentStage, setCurrentStage] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [quotaDeducted, setQuotaDeducted] = useState(false);
  const [showSuccessState, setShowSuccessState] = useState(false);

  // Helper functions
  const updateStageStatus = (
    stageIndex: number,
    status: UploadStage["status"],
    progress: number,
  ) => {
    setUploadStages((prev) =>
      prev.map((stage, index) =>
        index === stageIndex ? { ...stage, status, progress } : stage,
      ),
    );
  };

  const simulateProgress = (
    stageIndex: number,
    targetProgress: number,
    duration: number,
  ): Promise<void> => {
    return new Promise((resolve) => {
      setUploadStages((currentStages) => {
        const currentStage = currentStages[stageIndex];
        if (!currentStage) {
          resolve();
          return currentStages;
        }

        const startProgress = currentStage.progress;
        const progressDiff = targetProgress - startProgress;
        const steps = 20;
        const stepDuration = duration / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
          currentStep++;
          const progress = startProgress + (progressDiff * currentStep) / steps;

          updateStageStatus(
            stageIndex,
            "active",
            Math.min(progress, targetProgress),
          );

          if (currentStep >= steps) {
            clearInterval(interval);
            resolve();
          }
        }, stepDuration);

        return currentStages;
      });
    });
  };

  const getApiKey = async (): Promise<string> => {
    try {
      console.log("🔑 Fetching API key for analysis...");

      // First check if we have a cached API key in localStorage
      const cachedKey = localStorage.getItem("sentiment_api_key");
      if (cachedKey && cachedKey.startsWith("sa_live_")) {
        console.log("✅ Using cached API key");
        return cachedKey;
      }

      console.log("📡 Fetching fresh API key from server...");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      try {
        const response = await fetch("/api/user/api-key", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          console.error("❌ API key request failed:", response.status, response.statusText);
          throw new Error(`Failed to get API key: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("✅ API key retrieved successfully");

        if (!data.apiKey) {
          throw new Error("No API key returned from server");
        }

        // Cache the API key for future use
        localStorage.setItem("sentiment_api_key", data.apiKey);

        return data.apiKey;
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (error) {
      console.error("❌ Error fetching API key:", error);

      // If it's an abort error, treat it as timeout
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("API key request timed out. Please try again.");
      }

      // Final fallback to localStorage
      console.warn("⚠️ Falling back to localStorage API key");
      const fallbackKey = localStorage.getItem("sentiment_api_key");

      if (!fallbackKey) {
        throw new Error("Unable to retrieve API key. Please refresh the page and try again.");
      }

      return fallbackKey;
    }
  };  // Start upload process
  const startUpload = async () => {
    if (!videoBlob) {
      console.error("❌ No video blob available for upload");
      setError("No video data available. Please try recording again.");
      return;
    }

    if (videoBlob.size === 0) {
      console.error("❌ Video blob is empty");
      setError("Video recording is empty. Please try recording again.");
      return;
    }

    console.log("📹 Video blob details:", {
      size: videoBlob.size,
      type: videoBlob.type,
      sizeInMB: Math.round(videoBlob.size / (1024 * 1024) * 100) / 100,
    });

    setIsProcessing(true);
    setError(null);
    setCurrentStage(0);
    setShowSuccessState(false);

    try {
      console.log("🎬 Starting video upload and analysis process");

      // Stage 1: Prepare Video
      updateStageStatus(0, "active", 0);
      await simulateProgress(0, 100, 2000);
      updateStageStatus(0, "completed", 100);

      // Stage 2: Upload to S3
      setCurrentStage(1);
      updateStageStatus(1, "active", 0);

      await simulateProgress(1, 20, 1000);

      console.log("⬆️ Uploading to S3...");
      console.log("Blob details:", { size: videoBlob.size, type: videoBlob.type });

      const uploadUrlResponse = await fetch("/api/live-recording-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileType: ".mp4",
          duration: "1min", // Set to 1min for live recordings (most common case)
          size: videoBlob.size,
        }),
      });

      if (!uploadUrlResponse.ok) {
        const error = await uploadUrlResponse.json();
        console.error("❌ Upload URL request failed:", error);
        throw new Error(error.error || error.message || "Failed to get upload URL");
      }

      const uploadData = await uploadUrlResponse.json();

      if (!uploadData.success) {
        throw new Error(uploadData.error || "Failed to get upload URL");
      }

      const { uploadUrl, key, quotaInfo } = uploadData;
      console.log("✅ Upload URL obtained, key:", key, "quota status:", quotaInfo);

      // Validate that we have a proper key
      if (!key || typeof key !== "string") {
        throw new Error("Invalid key received from upload URL endpoint");
      }

      await simulateProgress(1, 50, 1000);

      console.log("☁️ Uploading video to S3...");
      console.log("📝 Upload details:", {
        url: uploadUrl.substring(0, 100) + "...", // Truncated for security
        contentType: "video/mp4",
        videoSize: videoBlob.size,
        videoType: videoBlob.type,
      });

      // Retry mechanism for S3 upload
      let uploadResponse: Response | undefined;
      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        try {
          uploadResponse = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "video/mp4",
            },
            body: videoBlob,
          });

          if (uploadResponse.ok) {
            break; // Success, exit retry loop
          }

          // If not successful and we have retries left, continue to retry
          if (retryCount < maxRetries - 1) {
            console.warn(`⚠️ S3 upload attempt ${retryCount + 1} failed, retrying...`);
            retryCount++;
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)); // Exponential backoff
            continue;
          }

        } catch (fetchError) {
          console.error(`❌ S3 upload attempt ${retryCount + 1} failed with error:`, fetchError);
          if (retryCount < maxRetries - 1) {
            retryCount++;
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)); // Exponential backoff
            continue;
          }
          throw fetchError;
        }
      }

      if (!uploadResponse || !uploadResponse.ok) {
        console.error("❌ S3 upload failed:", uploadResponse ? {
          status: uploadResponse.status,
          statusText: uploadResponse.statusText,
          headers: Object.fromEntries(uploadResponse.headers.entries()),
        } : "No response received");

        let errorMessage = uploadResponse
          ? `Failed to upload video to S3 (${uploadResponse.status}: ${uploadResponse.statusText})`
          : "Failed to upload video to S3 - No response received";

        if (uploadResponse) {
          try {
            const errorText = await uploadResponse.text();
            if (errorText) {
              console.error("❌ S3 error response:", errorText);
              errorMessage += ` - ${errorText}`;
            }
          } catch (e) {
            console.error("❌ Could not read S3 error response:", e);
          }
        }

        throw new Error(errorMessage);
      }

      await simulateProgress(1, 100, 500);
      updateStageStatus(1, "completed", 100);
      console.log("✅ Video uploaded to S3 successfully");

      // Stage 3: AI Analysis
      setCurrentStage(2);
      updateStageStatus(2, "active", 0);

      await simulateProgress(2, 20, 1000);

      console.log("🤖 Starting AI sentiment analysis...");

      // Update progress to show we're fetching API key
      updateStageStatus(2, "active", 30);
      console.log("🔑 Getting API key for authentication...");

      const apiKey = await getApiKey();

      if (!apiKey) {
        throw new Error("Unable to authenticate for analysis. Please try refreshing the page.");
      }

      console.log("✅ API key obtained, making analysis request");
      updateStageStatus(2, "active", 50);

      console.log("🧪 Testing API key and file validation first...");

      // First test the API key and file validation
      try {
        const testController = new AbortController();
        const testTimeoutId = setTimeout(() => testController.abort(), 10000); // 10 second timeout

        const testResponse = await fetch("/api/test-analysis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ key }),
          signal: testController.signal,
        });

        clearTimeout(testTimeoutId);

        if (!testResponse.ok) {
          const testError = await testResponse.json();
          console.error("❌ Test validation failed:", testError);
          throw new Error(`Validation failed: ${testError.error}`);
        }

        const testResult = await testResponse.json();
        console.log("✅ Validation passed:", testResult);
      } catch (testError) {
        console.error("❌ Test endpoint failed:", testError);
        if (testError instanceof Error && testError.name === "AbortError") {
          throw new Error("Validation request timed out. Please try again.");
        }
        throw new Error(`Pre-analysis validation failed: ${testError instanceof Error ? testError.message : "Unknown error"}`);
      }

      console.log("🔍 Making analysis request to /api/sentiment-inference with key:", key);

      // Validate key before making request
      if (!key || typeof key !== "string" || !key.includes("live-recordings/")) {
        throw new Error("Invalid video key for analysis. Please try uploading again.");
      }

      // Create abort controller for timeout
      const analysisController = new AbortController();
      const analysisTimeoutId = setTimeout(() => analysisController.abort(), 45000); // 45 second timeout

      updateStageStatus(2, "active", 60);
      console.log("📡 Waiting for analysis response...");

      let analysisResponse: Response;

      try {
        analysisResponse = await fetch("/api/sentiment-inference", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ key }),
          signal: analysisController.signal,
        });

        clearTimeout(analysisTimeoutId);
      } catch (fetchError) {
        clearTimeout(analysisTimeoutId);
        console.error("❌ Analysis fetch error:", fetchError);
        if (fetchError instanceof Error && fetchError.name === "AbortError") {
          throw new Error("Analysis request timed out after 45 seconds. Please try again with a shorter video.");
        }
        throw new Error(`Network error during analysis: ${fetchError instanceof Error ? fetchError.message : "Unknown error"}`);
      }

      updateStageStatus(2, "active", 80);

      console.log("📊 Analysis response status:", analysisResponse.status); if (!analysisResponse.ok) {
        const error = await analysisResponse.json();
        console.error("❌ Analysis request failed:", {
          status: analysisResponse.status,
          statusText: analysisResponse.statusText,
          error,
        });

        let errorMessage = error.error || error.message || "Analysis failed";

        // Add more specific error messages based on status
        if (analysisResponse.status === 401) {
          errorMessage = "Authentication failed. Please refresh the page and try again.";
        } else if (analysisResponse.status === 429) {
          errorMessage = "Insufficient quota for analysis. Please check your account limits.";
        } else if (analysisResponse.status === 503) {
          errorMessage = "Analysis service temporarily unavailable. Please try again in a few minutes.";
        } else if (analysisResponse.status === 504) {
          errorMessage = "Analysis timed out. Please try again with a shorter video.";
        }

        throw new Error(errorMessage);
      }

      console.log("📋 Parsing analysis response...");
      const result = await analysisResponse.json();
      console.log("✅ Analysis completed:", result);

      await simulateProgress(2, 100, 500);
      updateStageStatus(2, "completed", 100);

      // Stage 4: Complete
      setCurrentStage(3);
      updateStageStatus(3, "active", 0);
      await simulateProgress(3, 100, 1000);
      updateStageStatus(3, "completed", 100);

      // FIXED: Complete the analysis and show success state
      console.log("🎉 Analysis result received:", result);
      setAnalysisResult(result.analysis || result);
      setIsProcessing(false);

      // Store in localStorage for results page
      localStorage.setItem(
        "latest_analysis_result",
        JSON.stringify(result.analysis || result),
      );

      // FIXED: Show success state with results button
      setShowSuccessState(true);
      setQuotaDeducted(true);

      if (onUploadComplete) {
        onUploadComplete({
          ...result,
          analysisComplete: true, // Add flag to indicate completion
        });
      }
    } catch (error) {
      console.error("❌ Upload/Analysis failed:", error);

      // Log additional context for debugging
      console.error("❌ Error context:", {
        currentStage,
        errorType: error instanceof Error ? error.constructor.name : typeof error,
        errorMessage: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });

      let errorMessage = "Upload failed";

      if (error instanceof Error) {
        errorMessage = error.message;

        // Handle specific error types
        if (error.message.includes("timed out")) {
          errorMessage = "Request timed out. Please check your internet connection and try again.";
        } else if (error.message.includes("fetch")) {
          errorMessage = "Network error. Please check your internet connection and try again.";
        }
      }

      setError(errorMessage);
      setIsProcessing(false);

      setUploadStages((currentStages) => {
        const currentStageData = currentStages[currentStage];
        if (currentStageData) {
          updateStageStatus(currentStage, "error", currentStageData.progress);
        }
        return currentStages;
      });
    }
  };

  // Handle View Results button click
  const handleViewResults = () => {
    router.push("/live-results");
  };

  // Auto-start upload when modal opens
  useEffect(() => {
    if (
      isOpen &&
      videoBlob &&
      !isProcessing &&
      !analysisResult &&
      !showSuccessState
    ) {
      startUpload();
    }
  }, [isOpen, videoBlob]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      const resetTimer = setTimeout(() => {
        setUploadStages((prev) =>
          prev.map((stage) => ({
            ...stage,
            progress: 0,
            status: "pending" as const,
          })),
        );
        setCurrentStage(0);
        setIsProcessing(false);
        setError(null);
        setAnalysisResult(null);
        setQuotaDeducted(false);
        setShowSuccessState(false);
      }, 300);

      return () => clearTimeout(resetTimer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-600/60 via-blue-600/60 to-purple-400/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="mx-4 w-full max-w-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Card className="overflow-hidden shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  AWS Sentiment Analysis
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                  disabled={isProcessing}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm opacity-90">
                {showSuccessState
                  ? "Analysis completed successfully!"
                  : "Processing your video with our trained AI model"}
              </p>
            </CardHeader>

            <CardContent className="p-6">
              {/* FIXED: Updated Quota Information - Shows 2 quota points for sentiment analysis */}
              <div className="mb-6 rounded-lg border border-purple-200 bg-purple-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">
                      Quota Usage
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800"
                  >
                    2 quota points{" "}
                    {quotaDeducted ? "(deducted)" : "(will be deducted)"}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-purple-700">
                  Live emotion detection costs 2 quota points per video
                </p>
              </div>

              {/* Upload Stages */}
              <div className="mb-6 space-y-4">
                {uploadStages.map((stage, index) => (
                  <motion.div
                    key={stage.id}
                    className={`rounded-lg border p-4 transition-all duration-300 ${stage.status === "active"
                      ? "border-blue-300 bg-blue-50"
                      : stage.status === "completed"
                        ? "border-green-300 bg-green-50"
                        : stage.status === "error"
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="mb-2 flex items-center gap-3">
                      {stage.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : stage.status === "error" ? (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      ) : stage.status === "active" ? (
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                      )}
                      <div className="flex items-center gap-2">
                        {stage.name === "Preparing Video" && (
                          <Zap className="h-4 w-4" />
                        )}
                        {stage.name === "Uploading to AWS S3" && (
                          <Cloud className="h-4 w-4" />
                        )}
                        {stage.name === "AI Analysis" && (
                          <BarChart3 className="h-4 w-4" />
                        )}
                        {stage.name === "Results Ready" && (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        <span className="font-medium">{stage.name}</span>
                      </div>
                      {stage.status === "completed" && (
                        <Badge
                          variant="secondary"
                          className="ml-auto bg-green-100 text-green-800"
                        >
                          Complete
                        </Badge>
                      )}
                    </div>

                    <p className="mb-2 text-sm text-gray-600">
                      {stage.description}
                    </p>

                    {(stage.status === "active" ||
                      stage.status === "completed") && (
                        <Progress value={stage.progress} className="h-2" />
                      )}
                  </motion.div>
                ))}
              </div>

              {/* FIXED: Success Message and Results Button - Only show when analysis is truly complete */}
              {showSuccessState && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 rounded-lg border border-green-200 bg-green-50 p-6"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="text-lg font-semibold text-green-800">
                      🎉 Analysis Complete!
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-green-700">
                    Your video has been successfully analyzed with AI-powered
                    emotion and sentiment detection. 2 quota points have been
                    deducted. Click the button below to view your comprehensive
                    results.
                  </p>

                  <Button
                    onClick={handleViewResults}
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-3 font-semibold text-white hover:from-purple-600 hover:to-blue-600"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    View Detailed Analysis Results
                  </Button>
                </motion.div>
              )}

              {/* Error Display */}
              {error && (
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error}
                    {error.includes("quota") && (
                      <span className="mt-1 block text-xs">
                        No quota was deducted due to this error.
                      </span>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex gap-2">
                {showSuccessState ? (
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Close
                  </Button>
                ) : error ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        setError(null);
                        startUpload();
                      }}
                      disabled={isProcessing}
                      className="flex-1"
                    >
                      Retry Upload
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? "Processing..." : "Cancel"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
