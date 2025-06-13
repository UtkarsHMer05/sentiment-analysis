"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Square,
  Play,
  Upload,
  Mic,
  MicOff,
  AlertCircle,
  CheckCircle,
  Loader2,
  Zap,
  Activity,
  Brain,
  Volume2,
  RefreshCw,
  Clock,
  X,
  ExternalLink,
  Home,
  BarChart3,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

import { useLiveDetection } from "~/hooks/useLiveDetection";
import { AutoUploadModal } from "./AutoUploadModal";

// Quota Status Interface
interface QuotaStatus {
  maxRequests: number;
  requestsUsed: number;
  remaining: number;
  canAfford: {
    sentiment_analysis: number;
    live_detection: number;
  };
}

// Enhanced Background Animations Component
const LiveDetectionBackgroundAnimations = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Generate floating elements
  const floatingElements = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: 3 + (i % 8),
    x: (i * 17.3) % 100,
    y: (i * 23.7) % 100,
    duration: 12 + (i % 8),
    delay: i * 0.3,
  }));

  return (
    <>
      {/* Dynamic Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-20"
        animate={{
          background: [
            "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)",
            "linear-gradient(135deg, #1e293b 0%, #334155 25%, #475569 50%, #64748b 75%, #0f172a 100%)",
            "linear-gradient(135deg, #334155 0%, #475569 25%, #64748b 50%, #0f172a 75%, #1e293b 100%)",
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Large Floating Orbs */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"
          style={{
            width: 150 + i * 40,
            height: 150 + i * 40,
            left: `${(i * 12) % 100}%`,
            top: `${(i * 18) % 100}%`,
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.7, 0.2],
            x: [0, 60, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            delay: i * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Smaller Floating Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/40 to-purple-500/40"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 30, 0],
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_#3b82f6_1px,transparent_1px)] [background-size:60px_60px]" />
      </motion.div>

      {/* Floating Sparkles */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${(i * 23) % 100}%`,
            top: `${(i * 31) % 100}%`,
          }}
          animate={{
            y: [0, -200, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + (i % 4),
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="h-3 w-3 text-purple-400/60" />
        </motion.div>
      ))}
    </>
  );
};

// Loading Animation Component
const LoadingAnimation = () => (
  <motion.div
    className="flex min-h-screen items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="relative">
      <motion.div
        className="h-32 w-32 rounded-full border-4 border-purple-500/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-4 rounded-full border-4 border-blue-500/50 border-t-transparent"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-8 flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Brain className="h-8 w-8 text-purple-500" />
      </motion.div>
    </div>
  </motion.div>
);

// Enhanced Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  hover: {
    y: -5,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Enhanced emotion variants with unique animations
const emotionVariants = {
  joy: {
    color: "#fbbf24",
    scale: 1.1,
    y: [0, -8, 0],
    rotate: [0, 5, -5, 0],
    transition: { duration: 0.8, repeat: Infinity },
  },
  sadness: {
    color: "#3b82f6",
    scale: 1.1,
    y: [0, 8, 0],
    transition: { duration: 1.2, repeat: Infinity },
  },
  anger: {
    color: "#ef4444",
    scale: 1.1,
    x: [-3, 3, -3, 0],
    rotate: [-2, 2, -2, 0],
    transition: { duration: 0.3, repeat: Infinity },
  },
  fear: {
    color: "#8b5cf6",
    scale: [1, 1.08, 1],
    rotate: [0, -3, 3, 0],
    transition: { duration: 0.4, repeat: Infinity },
  },
  surprise: {
    color: "#10b981",
    scale: [1, 1.25, 1],
    y: [0, -10, 0],
    transition: { duration: 0.6, repeat: Infinity },
  },
  disgust: {
    color: "#f97316",
    scale: 1.1,
    rotate: [-8, 8, -8, 0],
    transition: { duration: 1, repeat: Infinity },
  },
  neutral: {
    color: "#6b7280",
    scale: 1,
    transition: { duration: 0.3 },
  },
};

export default function LiveEmotionCapture(): JSX.Element {
  const { state, actions, videoRef, hasRecording, cameraActive } =
    useLiveDetection();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Quota state
  const [quotaStatus, setQuotaStatus] = useState<QuotaStatus | null>(null);
  const [loadingQuota, setLoadingQuota] = useState(true);

  // Mount state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper functions for emojis
  const getEmotionEmoji = (emotion: string): string => {
    const emojiMap: Record<string, string> = {
      joy: "😄",
      sadness: "😢",
      anger: "😡",
      fear: "😰",
      surprise: "😲",
      disgust: "🤢",
      neutral: "😐",
    };
    return emojiMap[emotion] || "😐";
  };

  const getSentimentEmoji = (sentiment: string): string => {
    const sentimentEmojiMap: Record<string, string> = {
      positive: "😊",
      negative: "😔",
      neutral: "😐",
    };
    return sentimentEmojiMap[sentiment] || "😐";
  };

  // Format duration
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Get emotion color
  const getEmotionColor = (emotion: string): string => {
    const colors: Record<string, string> = {
      joy: "text-yellow-500",
      sadness: "text-blue-500",
      anger: "text-red-500",
      fear: "text-purple-500",
      surprise: "text-green-500",
      disgust: "text-orange-500",
      neutral: "text-gray-500",
    };
    return colors[emotion] || "text-gray-500";
  };

  // Get sentiment color
  const getSentimentColor = (sentiment: string): string => {
    const colors: Record<string, string> = {
      positive: "text-green-500",
      negative: "text-red-500",
      neutral: "text-gray-500",
    };
    return colors[sentiment] || "text-gray-500";
  };

  // Fetch quota status
  const fetchQuotaStatus = async () => {
    try {
      setLoadingQuota(true);
      const response = await fetch("/api/user/quota-status");
      if (response.ok) {
        const data: QuotaStatus = await response.json();
        setQuotaStatus(data);
      }
    } catch (error) {
      console.error("Failed to fetch quota status:", error);
    } finally {
      setLoadingQuota(false);
    }
  };

  // Fetch quota on component mount
  useEffect(() => {
    fetchQuotaStatus();
  }, []);

  // Refresh quota after upload
  useEffect(() => {
    if (analysisCompleted) {
      fetchQuotaStatus();
    }
  }, [analysisCompleted]);

  const handleUploadClick = () => {
    if (hasRecording) {
      setShowUploadModal(true);
    }
  };

  const handleViewResults = () => {
    window.location.href = "/live-results";
  };

  const handleDashboardClick = () => {
    window.location.href = "/dashboard";
  };

  // Auto-stop recording at 60 seconds
  useEffect(() => {
    if (state.isRecording && state.duration >= 60) {
      actions.stopRecording();
    }
  }, [state.isRecording, state.duration, actions.stopRecording]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <LiveDetectionBackgroundAnimations />
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Enhanced Background Animations */}
      <LiveDetectionBackgroundAnimations />

      {/* FIXED: Top Navigation Bar with proper spacing */}
      <motion.header
        className="relative z-20 flex items-center justify-between p-4 sm:p-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        {/* Left side - Title */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Camera className="h-6 w-6 text-purple-400" />
          </motion.div>
          <motion.h1
            className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-xl font-bold text-transparent sm:text-2xl"
            animate={{
              textShadow: [
                "0 0 10px rgba(139, 92, 246, 0.5)",
                "0 0 20px rgba(139, 92, 246, 0.8)",
                "0 0 10px rgba(139, 92, 246, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Live Emotion Detection
          </motion.h1>
        </motion.div>

        {/* FIXED: Right side - Dashboard Button and Quota Display side by side */}
        <div className="flex items-center gap-4">
          {/* Dashboard Button */}
          <motion.button
            onClick={handleDashboardClick}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-2 text-sm font-medium text-white transition-all duration-200 sm:px-4"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(139, 92, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Home className="h-4 w-4" />
            </motion.div>
            <span className="hidden sm:inline">Dashboard</span>
          </motion.button>

          {/* FIXED: Quota Display - positioned next to dashboard button */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="rounded-2xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-md"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
              }}
              animate={{
                y: [0, -3, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {loadingQuota ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="h-4 w-4 text-purple-400" />
                  </motion.div>
                  <span className="text-sm text-white/80">Loading...</span>
                </div>
              ) : quotaStatus ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="h-4 w-4 text-yellow-400" />
                    </motion.div>
                    <span className="text-sm font-semibold text-white">
                      {quotaStatus.remaining} quota left
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white/70">Sentiment:</span>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Badge className="border-blue-400/30 bg-blue-500/20 text-blue-300">
                          {quotaStatus.canAfford.sentiment_analysis}x
                        </Badge>
                      </motion.div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white/70">Live:</span>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Badge className="border-green-400/30 bg-green-500/20 text-green-300">
                          {quotaStatus.canAfford.live_detection}x
                        </Badge>
                      </motion.div>
                    </div>
                  </div>

                  <div className="pt-1">
                    <Progress
                      value={
                        (quotaStatus.requestsUsed / quotaStatus.maxRequests) *
                        100
                      }
                      className="h-1"
                    />
                    <div className="mt-1 flex justify-between text-xs text-white/60">
                      <span>{quotaStatus.requestsUsed}</span>
                      <span>{quotaStatus.maxRequests}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <span className="text-sm text-red-300">Unavailable</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 w-full p-4 pt-0 sm:p-6 sm:pt-0">
        {/* Welcome Section */}
        <motion.div className="mb-8 text-center" variants={itemVariants}>
          <motion.h2
            className="mb-4 text-4xl font-bold text-white"
            animate={{
              textShadow: [
                "0 0 20px rgba(255, 255, 255, 0.5)",
                "0 0 30px rgba(139, 92, 246, 0.8)",
                "0 0 20px rgba(255, 255, 255, 0.5)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Real-time AI Emotion Analysis
          </motion.h2>
          <motion.p
            className="text-lg text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Advanced emotion and sentiment detection with live processing
          </motion.p>
          <motion.div
            className="mt-2 flex items-center justify-center gap-2 text-sm text-white/60"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="h-4 w-4" />
            </motion.div>
            Maximum recording time: 60 seconds
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Video Feed */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-md"
            >
              <CardHeader className="bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                <CardTitle className="flex items-center gap-2 text-white">
                  <motion.div
                    animate={cameraActive ? "pulse" : ""}
                    variants={pulseVariants}
                  >
                    <Camera className="h-5 w-5" />
                  </motion.div>
                  Live Video Feed
                  {state.isAnalyzing && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Brain className="h-4 w-4 text-purple-400" />
                    </motion.div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative">
                  <motion.video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full rounded-lg border border-white/20 bg-black shadow-lg"
                    style={{ aspectRatio: "16/9" }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Enhanced Recording Indicator */}
                  <AnimatePresence>
                    {state.isRecording && (
                      <motion.div
                        className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-red-600/90 px-4 py-2 text-white shadow-lg backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div
                          className="h-3 w-3 rounded-full bg-white"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="font-medium">
                          REC {formatDuration(state.duration)} / 01:00
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Enhanced Time Warning */}
                  <AnimatePresence>
                    {state.isRecording && state.duration > 45 && (
                      <motion.div
                        className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-orange-600/90 px-4 py-2 text-white shadow-lg backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Clock className="h-4 w-4" />
                        </motion.div>
                        <span className="font-medium">
                          {60 - state.duration}s left
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Enhanced Analysis Indicator */}
                  <AnimatePresence>
                    {state.isAnalyzing && (
                      <motion.div
                        className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-purple-600/90 px-4 py-2 text-white shadow-lg backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Activity className="h-4 w-4" />
                        </motion.div>
                        <span className="font-medium">Live Analysis</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Enhanced Error Overlay */}
                  <AnimatePresence>
                    {state.error && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0, y: 20 }}
                          animate={{ scale: 1, opacity: 1, y: 0 }}
                          exit={{ scale: 0.8, opacity: 0, y: 20 }}
                          className="max-w-md"
                        >
                          <Alert className="border-red-500/50 bg-red-500/10 text-white">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{state.error}</AlertDescription>
                          </Alert>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Enhanced Controls */}
                <motion.div
                  className="mt-6 flex flex-wrap gap-3"
                  variants={itemVariants}
                >
                  {!cameraActive ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={actions.startCamera}
                        className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        <Camera className="h-4 w-4" />
                        Start Camera
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={actions.stopCamera}
                        variant="outline"
                        className="flex items-center gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20"
                      >
                        <Camera className="h-4 w-4" />
                        Stop Camera
                      </Button>
                    </motion.div>
                  )}

                  <AnimatePresence>
                    {cameraActive && !state.isRecording && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={actions.startRecording}
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        >
                          <Play className="h-4 w-4" />
                          Start Recording (60s max)
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {state.isRecording && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={actions.stopRecording}
                          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                        >
                          <Square className="h-4 w-4" />
                          Stop Recording
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {hasRecording && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={handleUploadClick}
                          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                          disabled={quotaStatus?.canAfford.live_detection === 0}
                        >
                          <Upload className="h-4 w-4" />
                          Analyze with AWS (2 quota)
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={
                        state.isListening
                          ? actions.stopListening
                          : actions.startListening
                      }
                      variant="outline"
                      className={`flex items-center gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20 ${
                        state.isListening
                          ? "border-red-400/30 bg-red-500/20"
                          : ""
                      }`}
                    >
                      <motion.div
                        animate={
                          state.isListening ? { scale: [1, 1.2, 1] } : {}
                        }
                        transition={{
                          duration: 0.5,
                          repeat: state.isListening ? Infinity : 0,
                        }}
                      >
                        {state.isListening ? (
                          <MicOff className="h-4 w-4" />
                        ) : (
                          <Mic className="h-4 w-4" />
                        )}
                      </motion.div>
                      {state.isListening ? "Stop Listening" : "Start Listening"}
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={actions.resetSession}
                      variant="outline"
                      className="flex items-center gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </motion.div>
                      Reset
                    </Button>
                  </motion.div>
                </motion.div>
              </CardContent>
            </motion.div>
          </motion.div>

          {/* Enhanced Analysis Panel */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Real-time Analysis Card */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-md"
            >
              <CardHeader className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
                <CardTitle className="flex items-center gap-2 text-white">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Zap className="h-5 w-5 text-yellow-400" />
                  </motion.div>
                  Real-time Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Current Emotion */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Current Emotion
                  </label>
                  <motion.div
                    className={`flex items-center gap-4 text-2xl font-bold ${getEmotionColor(state.currentEmotion)}`}
                    animate={
                      emotionVariants[
                        state.currentEmotion as keyof typeof emotionVariants
                      ]
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      className="text-5xl"
                      animate={{
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "easeInOut",
                      }}
                    >
                      {getEmotionEmoji(state.currentEmotion)}
                    </motion.span>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex-1"
                    >
                      <div className="text-white">
                        {state.currentEmotion.charAt(0).toUpperCase() +
                          state.currentEmotion.slice(1)}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Confidence Display */}
                  <div className="mt-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8 }}
                    >
                      <Progress
                        value={(state.emotionConfidence || 0) * 100}
                        className="h-3 bg-white/20"
                      />
                    </motion.div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-white/60">
                        Confidence:{" "}
                        {((state.emotionConfidence || 0) * 100).toFixed(1)}%
                      </span>
                      <motion.span
                        className="rounded-full px-2 py-1 text-xs font-medium"
                        animate={{
                          backgroundColor:
                            (state.emotionConfidence || 0) > 0.7
                              ? "rgba(16, 185, 129, 0.2)"
                              : (state.emotionConfidence || 0) > 0.4
                                ? "rgba(245, 158, 11, 0.2)"
                                : "rgba(239, 68, 68, 0.2)",
                          color:
                            (state.emotionConfidence || 0) > 0.7
                              ? "#10b981"
                              : (state.emotionConfidence || 0) > 0.4
                                ? "#f59e0b"
                                : "#ef4444",
                        }}
                      >
                        {(state.emotionConfidence || 0) > 0.7
                          ? "High"
                          : (state.emotionConfidence || 0) > 0.4
                            ? "Medium"
                            : "Low"}
                      </motion.span>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                {/* Current Sentiment */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Current Sentiment
                  </label>
                  <motion.div
                    className={`flex items-center gap-4 text-2xl font-bold ${getSentimentColor(state.currentSentiment)}`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.span
                      className="text-5xl"
                      animate={{
                        y: [0, -8, 0],
                        rotate:
                          state.currentSentiment === "positive"
                            ? [0, 8, -8, 0]
                            : state.currentSentiment === "negative"
                              ? [0, -8, 8, 0]
                              : [0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {getSentimentEmoji(state.currentSentiment)}
                    </motion.span>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex-1"
                    >
                      <div className="text-white">
                        {state.currentSentiment.charAt(0).toUpperCase() +
                          state.currentSentiment.slice(1)}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Sentiment Confidence */}
                  <div className="mt-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <Progress
                        value={(state.sentimentConfidence || 0) * 100}
                        className="h-3 bg-white/20"
                      />
                    </motion.div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-white/60">
                        Confidence:{" "}
                        {((state.sentimentConfidence || 0) * 100).toFixed(1)}%
                      </span>
                      <motion.span
                        className="rounded-full px-2 py-1 text-xs font-medium"
                        animate={{
                          backgroundColor:
                            (state.sentimentConfidence || 0) > 0.7
                              ? "rgba(16, 185, 129, 0.2)"
                              : (state.sentimentConfidence || 0) > 0.4
                                ? "rgba(245, 158, 11, 0.2)"
                                : "rgba(239, 68, 68, 0.2)",
                          color:
                            (state.sentimentConfidence || 0) > 0.7
                              ? "#10b981"
                              : (state.sentimentConfidence || 0) > 0.4
                                ? "#f59e0b"
                                : "#ef4444",
                        }}
                      >
                        {(state.sentimentConfidence || 0) > 0.7
                          ? "High"
                          : (state.sentimentConfidence || 0) > 0.4
                            ? "Medium"
                            : "Low"}
                      </motion.span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Status Display */}
                <motion.div
                  className="rounded-xl border border-white/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4"
                  animate={{
                    borderColor: state.isListening
                      ? [
                          "rgba(59, 130, 246, 0.3)",
                          "rgba(139, 92, 246, 0.3)",
                          "rgba(59, 130, 246, 0.3)",
                        ]
                      : "rgba(255, 255, 255, 0.2)",
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.span
                        className="text-2xl"
                        animate={{
                          scale: state.isListening ? [1, 1.3, 1] : 1,
                          rotate: state.isListening ? [0, 360] : 0,
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {state.isListening ? "🎤" : "⏸️"}
                      </motion.span>
                      <span className="text-sm font-medium text-white">
                        {state.isListening
                          ? "Listening & Analyzing..."
                          : "Analysis Paused"}
                      </span>
                    </div>
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Badge
                        className={`text-xs ${
                          state.isListening
                            ? "border-green-400/30 bg-green-500/20 text-green-300"
                            : "border-gray-400/30 bg-gray-500/20 text-gray-300"
                        }`}
                      >
                        {state.isListening ? "🟢 Live" : "🔴 Stopped"}
                      </Badge>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </motion.div>

            {/* Enhanced Live Transcript */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-md"
            >
              <CardHeader className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Volume2 className="h-5 w-5 text-blue-400" />
                  Live Transcript
                  {state.isListening && (
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="h-2 w-2 rounded-full bg-red-500"
                    />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <motion.div
                  className="max-h-32 overflow-y-auto rounded-lg border border-white/20 bg-white/5 p-4 text-sm backdrop-blur-sm"
                  animate={
                    state.transcriptText
                      ? { borderColor: "rgba(16, 185, 129, 0.5)" }
                      : { borderColor: "rgba(255, 255, 255, 0.2)" }
                  }
                  transition={{ duration: 0.3 }}
                >
                  <AnimatePresence mode="wait">
                    {state.transcriptText ? (
                      <motion.div
                        key="transcript" // ✅ Fixed: Use static key
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-white"
                      >
                        {state.transcriptText}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder" // ✅ Fixed: Use static key
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="italic text-white/40"
                      >
                        Start speaking to see live transcription...
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </CardContent>
            </motion.div>

            {/* Enhanced Recording Info */}
            {hasRecording && (
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-md"
              >
                <CardHeader className="bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                  <CardTitle className="text-white">Recording Ready</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Duration:</span>
                      <span className="font-medium text-white">
                        {formatDuration(state.duration)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">AWS Analysis Cost:</span>
                      <span className="font-medium text-purple-400">
                        10 quota points
                      </span>
                    </div>

                    {/* Results Button */}
                    <div className="mt-4 space-y-3">
                      {typeof window !== "undefined" &&
                        localStorage.getItem("latest_analysis_result") && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-2"
                          >
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                onClick={handleViewResults}
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 py-3 font-semibold text-white hover:from-green-600 hover:to-emerald-600"
                                size="lg"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Analysis Results
                              </Button>
                            </motion.div>

                            <div className="text-center">
                              <motion.p
                                className="text-xs font-medium text-green-400"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                ✅ Analysis results are ready!
                              </motion.p>
                            </div>
                          </motion.div>
                        )}
                    </div>

                    {/* Quota Warning */}
                    {quotaStatus &&
                      quotaStatus.canAfford.live_detection === 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Alert className="border-red-500/50 bg-red-500/10">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <AlertDescription className="text-red-300">
                              Insufficient quota for live detection. You need 2
                              quota points.
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}

                    <Alert className="border-white/20 bg-white/5">
                      <AlertCircle className="h-4 w-4 text-white/60" />
                      <AlertDescription className="text-xs text-white/60">
                        Click "Analyze with AWS" to process your recording with
                        the deployed sentiment model.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Floating Action Indicator */}
      <motion.div
        className="fixed bottom-6 right-6 z-30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col gap-3"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <motion.div
            className="rounded-full border border-purple-500/30 bg-purple-900/50 p-3 backdrop-blur-sm"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 25px rgba(139, 92, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="flex items-center gap-2 text-white"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Activity className="h-4 w-4" />
              <span className="text-xs font-medium">
                {quotaStatus?.remaining || 0} left
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Background Gradient Overlay */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-blue-900/30" />
      </motion.div>

      {/* Auto Upload Modal */}
      <AutoUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        videoBlob={actions.getVideoBlob()}
        onUploadComplete={(result) => {
          setShowUploadModal(false);
          console.log("Upload completed:", result);
          if (result.analysisComplete) {
            setAnalysisCompleted(true);
          }
          fetchQuotaStatus();
        }}
      />
    </motion.div>
  );
}
