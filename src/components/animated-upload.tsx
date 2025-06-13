"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, CheckCircle, AlertCircle, Zap, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Analysis } from "./client/Inference";

interface AnimatedUploadProps {
  apiKey: string;
  onAnalysis: (analysis: Analysis) => void;
  acceptedTypes?: string;
  className?: string;
}

export function AnimatedUpload({
  apiKey,
  onAnalysis,
  acceptedTypes = "video/mp4,video/mov,video/avi",
  className = "",
}: AnimatedUploadProps) {
  // CRITICAL: Fix hydration mismatch
  const [isClient, setIsClient] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "analyzing" | "success" | "error"
  >("idle");
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // CRITICAL: Only enable animations after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0 && files[0]) {
      handleUpload(files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      setFileName(file.name);
      setStatus("uploading");
      setError(null);
      setUploadProgress(0);

      const fileType = `.${file.name.split(".").pop()}`;

      setUploadProgress(10);
      const res = await fetch("/api/upload-url", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileType: fileType }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Failed to get upload URL");
      }

      const { url, fileId, key } = await res.json();
      setUploadProgress(25);

      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload file");
      }

      setUploadProgress(50);
      setStatus("analyzing");

      const analysisRes = await fetch("/api/sentiment-inference", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      });

      if (!analysisRes.ok) {
        const error = await analysisRes.json();
        throw new Error(error?.error || "Failed to analyze video");
      }

      const analysis = await analysisRes.json();
      setUploadProgress(100);
      setStatus("success");

      onAnalysis(analysis);

      setTimeout(() => {
        setStatus("idle");
        setUploadProgress(0);
        setFileName("");
      }, 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Upload failed");
      setStatus("error");
      setUploadProgress(0);

      setTimeout(() => {
        setStatus("idle");
        setError(null);
        setFileName("");
      }, 5000);
    }
  };

  const resetUpload = () => {
    setStatus("idle");
    setUploadProgress(0);
    setFileName("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files[0]) {
      handleUpload(files[0]);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (status === "idle") {
      fileInputRef.current?.click();
    } else if (status === "error") {
      resetUpload();
    }
  };

  // CRITICAL: Render static version during SSR
  if (!isClient) {
    return (
      <div className={`relative w-full ${className}`}>
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileInputChange}
          className="hidden"
        />
        <div
          className="flex min-h-[400px] cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-purple-400/50 bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-8 text-center backdrop-blur-sm"
          onClick={handleClick}
        >
          <div className="space-y-6">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg">
              <Upload className="h-12 w-12 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                Drop your video here
              </h3>
              <p className="text-lg text-white/80">or click to browse</p>
              <p className="text-sm text-white/60">
                Supports MP4, MOV, AVI formats
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ANIMATED VERSION - Only renders after hydration
  return (
    <div className={`relative w-full ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* FIXED: Main clickable container with proper z-index and pointer events */}
      <motion.div
        className="relative cursor-pointer overflow-hidden rounded-3xl"
        style={{
          minHeight: "400px",
          zIndex: 10, // Ensure it's above background elements
          pointerEvents: "auto", // Explicitly enable pointer events
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        onClick={handleClick} // MOVED CLICK HANDLER TO MAIN CONTAINER
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* FIXED: Background layer with lower z-index */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: isDragging
              ? "linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4), rgba(59, 130, 246, 0.4))"
              : status === "uploading" || status === "analyzing"
                ? "linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3))"
                : status === "success"
                  ? "linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(34, 197, 94, 0.4))"
                  : status === "error"
                    ? "linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(220, 38, 127, 0.4))"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(139, 92, 246, 0.2))",
            backdropFilter: "blur(20px)",
            border: "3px dashed",
            borderColor: isDragging
              ? "#ec4899"
              : status === "uploading" || status === "analyzing"
                ? "#8b5cf6"
                : status === "success"
                  ? "#10b981"
                  : status === "error"
                    ? "#ef4444"
                    : "rgba(139, 92, 246, 0.6)",
            zIndex: 1, // Background layer
            pointerEvents: "none", // Disable pointer events on background
          }}
          animate={{
            borderColor: isDragging
              ? ["#ec4899", "#8b5cf6", "#3b82f6", "#ec4899"]
              : status === "uploading" || status === "analyzing"
                ? ["#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#8b5cf6"]
                : undefined,
            boxShadow: isDragging
              ? [
                  "0 0 30px rgba(236, 72, 153, 0.6)",
                  "0 0 50px rgba(139, 92, 246, 0.8)",
                  "0 0 30px rgba(59, 130, 246, 0.6)",
                ]
              : status === "uploading" || status === "analyzing"
                ? [
                    "0 0 40px rgba(139, 92, 246, 0.7)",
                    "0 0 60px rgba(236, 72, 153, 0.9)",
                    "0 0 40px rgba(59, 130, 246, 0.7)",
                  ]
                : ["0 0 25px rgba(139, 92, 246, 0.4)"],
          }}
          transition={{
            duration: 2,
            repeat:
              isDragging || status === "uploading" || status === "analyzing"
                ? Infinity
                : 0,
            ease: "easeInOut",
          }}
        />

        {/* FIXED: Rotating Background Rings with proper z-index */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-40"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.5), transparent, rgba(236, 72, 153, 0.5), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute inset-2 rounded-2xl opacity-30"
          style={{
            background:
              "conic-gradient(from 180deg, transparent, rgba(59, 130, 246, 0.4), transparent, rgba(16, 185, 129, 0.4), transparent)",
            zIndex: 3,
            pointerEvents: "none",
          }}
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* FIXED: Floating Particles with proper z-index */}
        <div
          className="absolute inset-0 overflow-hidden rounded-3xl"
          style={{ zIndex: 4, pointerEvents: "none" }}
        >
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 4 === 0
                  ? "h-3 w-3 bg-purple-400/80"
                  : i % 4 === 1
                    ? "h-2 w-2 bg-pink-400/80"
                    : i % 4 === 2
                      ? "h-4 w-4 bg-blue-400/80"
                      : "h-2.5 w-2.5 bg-green-400/80"
              }`}
              style={{
                left: `${15 + ((i * 7) % 70)}%`,
                top: `${20 + (i % 4) * 15}%`,
                pointerEvents: "none",
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, 40 * Math.sin(i), 0],
                scale: [1, 2, 1],
                opacity: [0.5, 1, 0.5],
                rotate: [0, 360, 720],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* FIXED: Main Content with highest z-index */}
        <div
          className="relative flex min-h-[400px] items-center justify-center p-8"
          style={{ zIndex: 20 }}
        >
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div
                key="idle"
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8 }}
                style={{ pointerEvents: "none" }} // Content doesn't block clicks
              >
                <motion.div
                  className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center"
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.3, rotate: 15 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="border-3 absolute inset-0 rounded-full"
                      style={{
                        borderColor:
                          i % 2 === 0
                            ? "rgba(139, 92, 246, 0.7)"
                            : "rgba(236, 72, 153, 0.7)",
                      }}
                      animate={{
                        scale: [1, 2 + i * 0.4, 1],
                        opacity: [0.8, 0, 0.8],
                        rotate: [0, i % 2 === 0 ? 360 : -360],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: i * 0.5,
                      }}
                    />
                  ))}

                  <motion.div
                    className="relative z-10 rounded-full p-6"
                    style={{
                      background:
                        "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899, #10b981)",
                      backgroundSize: "400% 400%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Upload className="h-12 w-12 text-white drop-shadow-lg" />
                  </motion.div>
                </motion.div>

                <motion.div
                  className="space-y-4"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.h3
                    className="text-3xl font-bold text-white"
                    style={{
                      background:
                        "linear-gradient(45deg, #ffffff, #a855f7, #ec4899, #3b82f6)",
                      backgroundSize: "400% 400%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    Drop your video here
                  </motion.h3>
                  <motion.p
                    className="text-xl text-white/90"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    or click to browse
                  </motion.p>
                  <motion.p
                    className="text-sm text-white/70"
                    animate={{ opacity: [0.6, 0.9, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Supports MP4, MOV, AVI formats
                  </motion.p>
                </motion.div>
              </motion.div>
            )}

            {/* FIXED: Add other status states with proper styling */}
            {status === "uploading" && (
              <motion.div
                key="uploading"
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{ pointerEvents: "none" }}
              >
                <motion.div
                  className="mx-auto mb-6 h-16 w-16 rounded-full border-4 border-purple-500 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <h3 className="mb-2 text-2xl font-bold text-white">
                  Uploading...
                </h3>
                <p className="text-white/80">{fileName}</p>
                <div className="mx-auto mt-4 h-2 w-full max-w-xs rounded-full bg-gray-700">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )}

            {status === "analyzing" && (
              <motion.div
                key="analyzing"
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{ pointerEvents: "none" }}
              >
                <motion.div className="mx-auto mb-6">
                  <Brain className="mx-auto h-16 w-16 text-purple-400" />
                </motion.div>
                <h3 className="mb-2 text-2xl font-bold text-white">
                  Analyzing...
                </h3>
                <p className="text-white/80">Processing your video with AI</p>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                key="success"
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{ pointerEvents: "none" }}
              >
                <motion.div className="mx-auto mb-6">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-400" />
                </motion.div>
                <h3 className="mb-2 text-2xl font-bold text-white">Success!</h3>
                <p className="text-white/80">Analysis complete</p>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                key="error"
                className="cursor-pointer text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleClick}
                style={{ pointerEvents: "auto" }}
              >
                <motion.div className="mx-auto mb-6">
                  <AlertCircle className="mx-auto h-16 w-16 text-red-400" />
                </motion.div>
                <h3 className="mb-2 text-2xl font-bold text-white">Error</h3>
                <p className="mb-4 text-white/80">{error}</p>
                <p className="text-sm text-white/60">Click to try again</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
