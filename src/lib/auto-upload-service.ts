import {
  getVideoCompressor,
  type CompressionOptions,
} from "./video-compression";

interface UploadProgress {
  stage: "preparing" | "uploading" | "analyzing" | "complete";
  progress: number;
  message: string;
}

interface UploadResult {
  success: boolean;
  videoId?: string;
  analysisId?: string;
  error?: string;
  finalAnalysis?: any;
}

class AutoUploadService {
  private onProgress?: (progress: UploadProgress) => void;

  constructor(onProgress?: (progress: UploadProgress) => void) {
    this.onProgress = onProgress;
  }

  async uploadAndAnalyze(
    videoBlob: Blob,
    duration: string = "2min",
  ): Promise<UploadResult> {
    try {
      // Step 1: Prepare video (simplified compression)
      this.updateProgress("preparing", 10, "Preparing video for upload...");

      const compressor = getVideoCompressor();
      const compressionOptions: CompressionOptions = {
        maxSizeMB: 15,
        quality: "medium",
      };

      this.updateProgress("preparing", 30, "Processing video...");
      const compressionResult = await compressor.compressVideo(
        videoBlob,
        compressionOptions,
      );

      this.updateProgress("preparing", 50, "Video processing complete");

      // Step 2: Upload directly using your existing live-emotion API
      this.updateProgress("uploading", 60, "Uploading video...");

      const formData = new FormData();
      formData.append(
        "video",
        compressionResult.compressedBlob,
        `live-recording-${Date.now()}.webm`,
      );
      formData.append("duration", duration);

      const response = await fetch("/api/live-emotion", {
        method: "POST",
        body: formData,
      });

      this.updateProgress("uploading", 80, "Upload complete");

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const result = await response.json();

      this.updateProgress("complete", 100, "Analysis complete!");

      return {
        success: true,
        videoId: `live-${Date.now()}`,
        analysisId: `analysis-${Date.now()}`,
        finalAnalysis: result,
      };
    } catch (error) {
      console.error("Auto-upload failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      };
    }
  }

  private updateProgress(
    stage: UploadProgress["stage"],
    progress: number,
    message: string,
  ) {
    if (this.onProgress) {
      this.onProgress({ stage, progress, message });
    }
  }
}

export { AutoUploadService, type UploadProgress, type UploadResult };
