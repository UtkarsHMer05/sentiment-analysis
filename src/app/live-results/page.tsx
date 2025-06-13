"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, BarChart3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalysisResultsModal } from "~/components/AnalysisResultsModal";

export default function LiveResultsPage() {
  const router = useRouter();
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get analysis result from localStorage
    const storedResult = localStorage.getItem("latest_analysis_result");

    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult);
        console.log("📊 Loaded analysis result:", parsedResult);
        setAnalysisResult(parsedResult);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to parse analysis result:", error);
        setIsLoading(false);
        // Redirect after a short delay to show error
        setTimeout(() => {
          router.push("/live-detection");
        }, 2000);
      }
    } else {
      console.log("❌ No analysis result found in localStorage");
      setIsLoading(false);
      // Redirect after a short delay
      setTimeout(() => {
        router.push("/live-detection");
      }, 2000);
    }
  }, [router]);

  const handleClose = () => {
    // Clear the stored result and go back
    localStorage.removeItem("latest_analysis_result");
    router.push("/live-detection");
  };

  const handleBackToDetection = () => {
    router.push("/live-detection");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-purple-600" />
          <p className="text-lg text-gray-600">
            Loading your analysis results...
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Please wait while we prepare your data
          </p>
        </div>
      </div>
    );
  }

  if (!analysisResult) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-md text-center">
          <div className="mb-4 text-6xl">😔</div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            No Results Found
          </h2>
          <p className="mb-6 text-gray-600">
            We couldn't find any analysis results. This might happen if:
          </p>
          <ul className="mb-6 space-y-1 text-left text-sm text-gray-500">
            <li>• The analysis hasn't been completed yet</li>
            <li>• The results have expired</li>
            <li>• There was an error during analysis</li>
          </ul>
          <Button
            onClick={handleBackToDetection}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Live Detection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleBackToDetection}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Live Detection
            </Button>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Live Analysis Results
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Results Modal (displayed as full page) */}
      <AnalysisResultsModal
        isOpen={true}
        onClose={handleClose}
        analysis={analysisResult}
      />
    </div>
  );
}
