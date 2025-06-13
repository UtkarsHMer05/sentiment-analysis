"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Zap,
  BarChart3,
  Video,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Home,
  LogOut,
  Sparkles,
  Upload,
  RefreshCw,
  Activity,
  Brain,
  Play,
  Pause,
  Camera, // Added Camera icon for live detection button
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import CodeExamples from "~/components/client/code-examples";
import CopyButton from "~/components/client/copy-button";
import { AnimatedUpload } from "~/components/animated-upload";
import { Analysis } from "~/components/client/Inference";

// EMOTION AND SENTIMENT MAPPINGS
const EMOTION_EMOJI: Record<string, string> = {
  anger: "😡",
  disgust: "🤢",
  fear: "😨",
  joy: "😄",
  neutral: "😐",
  sadness: "😢",
  surprise: "😲",
};

const SENTIMENT_EMOJI: Record<string, string> = {
  negative: "😡",
  neutral: "😐",
  positive: "😄",
};

interface Quota {
  id: string;
  userId: string;
  requestsUsed: number;
  maxRequests: number;
  resetDate: Date;
  secretKey: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  isActive: boolean;
  name: string | null;
}

interface DashboardClientProps {
  quota: Quota;
  user: User | null;
}

// FIXED: Simplified quota status interface
interface QuotaStatus {
  maxRequests: number;
  requestsUsed: number;
  remaining: number;
  quotaCosts: {
    sentiment_analysis: number;
    live_detection: number;
  };
  canAfford: {
    sentiment_analysis: number;
    live_detection: number;
  };
}

// Enhanced Background Animations
const DashboardBackgroundAnimations = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Generate floating elements
  const floatingElements = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: 4 + (i % 6),
    x: (i * 23.7) % 100,
    y: (i * 31.3) % 100,
    duration: 15 + (i % 10),
    delay: i * 0.5,
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
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Orbs */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl"
          style={{
            width: 120 + i * 30,
            height: 120 + i * 30,
            left: `${(i * 15) % 100}%`,
            top: `${(i * 20) % 100}%`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/30 to-purple-500/30"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, 20, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_#3b82f6_1px,transparent_1px)] [background-size:50px_50px]" />
      </div>
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

// RESTORED: Detailed Sentiment Analysis Results Component
const DetailedSentimentAnalysisResults = ({
  analysis,
}: {
  analysis: Analysis;
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Get average scores function
  const getAverageScores = () => {
    if (!analysis?.analysis?.utterances?.length) return null;

    // Aggregate all the scores
    const emotionScores: Record<string, number[]> = {};
    const sentimentScores: Record<string, number[]> = {};

    analysis.analysis.utterances.forEach((utterance) => {
      utterance.emotions?.forEach((emotion) => {
        if (!emotionScores[emotion.label]) emotionScores[emotion.label] = [];
        emotionScores[emotion.label]!.push(emotion.confidence);
      });
      utterance.sentiments?.forEach((sentiment) => {
        if (!sentimentScores[sentiment.label])
          sentimentScores[sentiment.label] = [];
        sentimentScores[sentiment.label]!.push(sentiment.confidence);
      });
    });

    // Calculate the average
    const avgEmotions = Object.entries(emotionScores).map(
      ([label, scores]) => ({
        label,
        confidence: scores.reduce((a, b) => a + b, 0) / scores.length,
      }),
    );

    const avgSentiments = Object.entries(sentimentScores).map(
      ([label, scores]) => ({
        label,
        confidence: scores.reduce((a, b) => a + b, 0) / scores.length,
      }),
    );

    // Sort by confidence, get the top score
    const topEmotion = avgEmotions.sort(
      (a, b) => b.confidence - a.confidence,
    )[0];
    const topSentiment = avgSentiments.sort(
      (a, b) => b.confidence - a.confidence,
    )[0];

    return { topEmotion, topSentiment };
  };

  const averages = getAverageScores();

  // Auto-play frame progression
  useEffect(() => {
    if (isPlaying && analysis?.analysis?.utterances?.length) {
      const interval = setInterval(() => {
        setCurrentFrame((prev) => {
          const nextFrame = prev + 1;
          if (nextFrame >= analysis.analysis.utterances.length) {
            setIsPlaying(false);
            return 0;
          }
          return nextFrame;
        });
      }, 2000); // Change frame every 2 seconds

      return () => clearInterval(interval);
    }
  }, [isPlaying, analysis?.analysis?.utterances?.length]);

  const currentUtterance = analysis?.analysis?.utterances?.[currentFrame];

  return (
    <motion.div
      className="mt-8 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Overall Analysis Section */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated Header */}
        <motion.div
          className="mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.div
            className="relative rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-3"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.2,
              boxShadow: "0 10px 25px rgba(16, 185, 129, 0.5)",
            }}
          >
            <BarChart3 className="h-6 w-6 text-white" />
          </motion.div>
          <motion.h2
            className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-xl font-bold text-transparent"
            animate={{
              textShadow: [
                "0 0 10px rgba(16, 185, 129, 0.5)",
                "0 0 20px rgba(16, 185, 129, 0.8)",
                "0 0 10px rgba(16, 185, 129, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Overall Analysis
          </motion.h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {averages ? (
            <motion.div
              key="results"
              className="flex h-fit w-full flex-wrap items-center justify-center gap-6 rounded-xl border border-white/20 bg-white/5 p-8 backdrop-blur-md sm:gap-10"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.8 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 15px 35px rgba(139, 92, 246, 0.4)",
              }}
            >
              {/* Primary Emotion */}
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  className="text-sm font-medium text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Primary Emotion
                </motion.span>
                <motion.span
                  className="text-[50px]"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 1.3,
                    rotate: 15,
                  }}
                >
                  {EMOTION_EMOJI[averages?.topEmotion?.label!] || "😐"}
                </motion.span>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <motion.span
                    className="block text-lg font-bold text-white"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(255, 255, 255, 0.5)",
                        "0 0 15px rgba(139, 92, 246, 0.8)",
                        "0 0 5px rgba(255, 255, 255, 0.5)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {averages.topEmotion?.label.toUpperCase()}
                  </motion.span>
                  <span className="text-sm text-white/60">
                    {averages.topEmotion?.confidence.toFixed(3)} (
                    {(averages.topEmotion?.confidence! * 100).toFixed(0)}%)
                  </span>
                </motion.div>
              </motion.div>

              {/* Animated Divider */}
              <motion.div
                className="h-20 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scaleY: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Primary Sentiment */}
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  className="text-sm font-medium text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Primary Sentiment
                </motion.span>
                <motion.span
                  className="text-[50px]"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  whileHover={{
                    scale: 1.3,
                    rotate: -15,
                  }}
                >
                  {SENTIMENT_EMOJI[averages?.topSentiment?.label!] || "😐"}
                </motion.span>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <motion.span
                    className="block text-lg font-bold text-white"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(255, 255, 255, 0.5)",
                        "0 0 15px rgba(16, 185, 129, 0.8)",
                        "0 0 5px rgba(255, 255, 255, 0.5)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {averages.topSentiment?.label.toUpperCase()}
                  </motion.span>
                  <span className="text-sm text-white/60">
                    {averages.topSentiment?.confidence.toFixed(3)} (
                    {(averages.topSentiment?.confidence! * 100).toFixed(0)}%)
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              className="flex h-40 w-full items-center justify-center rounded-xl border border-dashed border-white/30 bg-white/5 p-6 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(139, 92, 246, 0.5)",
              }}
            >
              <motion.div
                className="text-center"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <TrendingUp className="h-6 w-6 text-purple-400" />
                </motion.div>
                <span className="text-sm text-white/60">
                  Upload a video to see overall analysis
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* RESTORED: Detailed Frame-by-Frame Analysis */}
      {analysis?.analysis?.utterances?.length > 0 && (
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="mb-6 flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="relative rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-3"
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
                <Activity className="h-6 w-6 text-white" />
              </motion.div>
              <motion.h2
                className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(59, 130, 246, 0.5)",
                    "0 0 20px rgba(139, 92, 246, 0.8)",
                    "0 0 10px rgba(59, 130, 246, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Frame-by-Frame Analysis
              </motion.h2>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-2 text-sm font-medium text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isPlaying ? "Pause" : "Play"}
              </motion.button>
              <span className="text-sm text-white/60">
                Frame {currentFrame + 1} of{" "}
                {analysis.analysis.utterances.length}
              </span>
            </div>
          </motion.div>

          {/* Current Frame Analysis */}
          {currentUtterance && (
            <motion.div
              key={currentFrame}
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Frame Info */}
              <div className="rounded-lg border border-white/20 bg-white/5 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Frame {currentFrame + 1}
                  </h3>
                  <Badge className="bg-purple-500/20 text-purple-300">
                    {currentUtterance.start_time?.toFixed(2)}s -{" "}
                    {currentUtterance.end_time?.toFixed(2)}s
                  </Badge>
                </div>

                {/* Transcript */}
                <div className="mb-4 rounded-lg bg-white/5 p-3">
                  <p className="text-sm text-white/80">
                    <span className="font-medium text-white">Transcript: </span>
                    {currentUtterance.text || "No text detected"}
                  </p>
                </div>

                {/* Emotions for this frame */}
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-medium text-white/70">
                    Emotions
                  </h4>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {currentUtterance.emotions?.map((emotion, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center justify-between rounded-lg bg-white/5 p-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {EMOTION_EMOJI[emotion.label] || "😐"}
                          </span>
                          <span className="text-xs capitalize text-white/80">
                            {emotion.label}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-white">
                          {(emotion.confidence * 100).toFixed(0)}%
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Sentiments for this frame */}
                <div>
                  <h4 className="mb-2 text-sm font-medium text-white/70">
                    Sentiments
                  </h4>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {currentUtterance.sentiments?.map((sentiment, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center justify-between rounded-lg bg-white/5 p-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {SENTIMENT_EMOJI[sentiment.label] || "😐"}
                          </span>
                          <span className="text-xs capitalize text-white/80">
                            {sentiment.label}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-white">
                          {(sentiment.confidence * 100).toFixed(0)}%
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* FIXED: Frame Navigation with proper forward button and scrollable frame indicators */}
              <div className="flex items-center">
                <motion.button
                  onClick={() => setCurrentFrame(Math.max(0, currentFrame - 1))}
                  disabled={currentFrame === 0}
                  className="flex-shrink-0 rounded-lg bg-white/10 px-3 py-2 text-xs text-white transition-colors hover:bg-white/20 disabled:opacity-50"
                  whileHover={{ scale: currentFrame > 0 ? 1.05 : 1 }}
                  whileTap={{ scale: currentFrame > 0 ? 0.95 : 1 }}
                >
                  Previous Frame
                </motion.button>
                {/* FIXED: Scrollable frame indicators container */}
                <div className="min-w-0 flex-1 px-2">
                  <div className="scrollbar-hide flex max-w-full items-center gap-1 overflow-x-auto">
                    <div className="flex items-center gap-1 px-1">
                      {analysis.analysis.utterances.map((_, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => setCurrentFrame(idx)}
                          className={`h-2 w-4 flex-shrink-0 rounded-full transition-colors ${
                            idx === currentFrame
                              ? "bg-purple-500"
                              : "bg-white/20 hover:bg-white/40"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title={`Frame ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* FIXED: Added forward button */}
                <motion.button
                  onClick={() =>
                    setCurrentFrame(
                      Math.min(
                        analysis.analysis.utterances.length - 1,
                        currentFrame + 1,
                      ),
                    )
                  }
                  disabled={
                    currentFrame === analysis.analysis.utterances.length - 1
                  }
                  className="flex-shrink-0 rounded-lg bg-white/10 px-3 py-2 text-xs text-white transition-colors hover:bg-white/20 disabled:opacity-50"
                  whileHover={{
                    scale:
                      currentFrame < analysis.analysis.utterances.length - 1
                        ? 1.05
                        : 1,
                  }}
                  whileTap={{
                    scale:
                      currentFrame < analysis.analysis.utterances.length - 1
                        ? 0.95
                        : 1,
                  }}
                >
                  Next Frame
                </motion.button>
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs text-white/60">
                  Frame {currentFrame + 1} of{" "}
                  {analysis.analysis.utterances.length}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export function DashboardClient({ quota, user }: DashboardClientProps) {
  const [mounted, setMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [currentQuota, setCurrentQuota] = useState(quota);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [quotaStatus, setQuotaStatus] = useState<QuotaStatus | null>(null);
  const router = useRouter();

  // Calculate remaining quota and usage
  const remaining = quota.maxRequests - quota.requestsUsed;
  const usagePercentage = (quota.requestsUsed / quota.maxRequests) * 100;

  // FIXED: Calculate what user can afford with simplified quota system
  const canAffordSentiment = Math.floor(remaining / 2); // 2 points per analysis
  const canAffordLive = Math.floor(remaining / 2); // 10 points per live detection

  // Fetch detailed quota status
  useEffect(() => {
    const fetchQuotaStatus = async () => {
      try {
        const response = await fetch("/api/user/quota-status");
        if (response.ok) {
          const data: QuotaStatus = await response.json();
          setQuotaStatus(data);
        }
      } catch (error) {
        console.error("Failed to fetch quota status:", error);
      }
    };

    setMounted(true);
    if (quota) {
      setCurrentQuota(quota);
    }
    fetchQuotaStatus();
  }, [quota]);

  const handleAnalysis = (analysisResult: Analysis) => {
    setAnalysis(analysisResult);
    console.log("Analysis completed:", analysisResult);
  };

  // FIXED: Refresh quota without page reload
  const refreshQuota = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch(window.location.pathname, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (response.ok) {
        window.location.reload();
      } else {
        const quotaResponse = await fetch("/api/user/quota-status");
        if (quotaResponse.ok) {
          const freshQuotaData = await quotaResponse.json();
          setQuotaStatus(freshQuotaData);
          console.log("✅ Quota refreshed successfully");
        }
      }
    } catch (error) {
      console.error("❌ Failed to refresh quota:", error);
      window.location.reload();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("❌ Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  // Get status color based on remaining quota
  const getStatusColor = () => {
    if (remaining <= 5) return "text-red-600 bg-red-100";
    if (remaining <= 15) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
  };

  // Get status message
  const getStatusMessage = () => {
    if (remaining === 0) return "No quota remaining";
    if (remaining <= 5) return "Low quota - consider upgrading";
    if (remaining <= 15) return "Moderate quota remaining";
    return "Good quota balance";
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <DashboardBackgroundAnimations />
        <LoadingAnimation />
      </div>
    );
  }

  const displayQuota = currentQuota || {
    secretKey: "",
    requestsUsed: 0,
    maxRequests: 100,
  };

  const hasValidSecretKey =
    displayQuota.secretKey && displayQuota.secretKey.trim() !== "";

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Background Animations */}
      <DashboardBackgroundAnimations />

      {/* FIXED: Animated Header with Live Detection Button */}
      <motion.header
        className="relative z-20 flex items-center justify-between p-4 sm:p-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
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
            <Sparkles className="h-6 w-6 text-purple-400" />
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
            AI Sentiment Dashboard
          </motion.h1>
        </motion.div>

        <div className="flex items-center gap-5">
          <motion.span
            className="hidden text-sm text-gray-300 sm:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {user?.name || "User"}
          </motion.span>

          {/* FIXED: Bouncy Live Detection Button with elevation animation */}
          {/* <motion.button
            onClick={() => router.push("/live-detection")}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-2 text-sm font-medium text-white transition-all duration-200 sm:px-4"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 25px rgba(34, 197, 94, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -10, 0],
              boxShadow: [
                "0 5px 15px rgba(34, 197, 94, 0.3)",
                "0 10px 25px rgba(34, 197, 94, 0.6)",
                "0 5px 15px rgba(34, 197, 94, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            initial={{ opacity: 0, x: 20 }}
          >
            <Camera className="h-4 w-4" />
            <span className="hidden sm:inline">Live Detection</span>
          </motion.button> */}
          <motion.button
            onClick={() => router.push("/live-detection")}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 sm:px-4"
            whileHover={{
              scale: 1.05,
              y: -8, // Elevation up on hover
              boxShadow: "0 15px 30px rgba(34, 197, 94, 0.5)",
            }}
            whileTap={{
              scale: 0.98,
              y: -2, // Slight elevation on tap
            }}
            animate={{
              y: [0, -5, 0], // Gentle elevation animation
              boxShadow: [
                "0 5px 15px rgba(34, 197, 94, 0.3)",
                "0 8px 20px rgba(34, 197, 94, 0.4)",
                "0 5px 15px rgba(34, 197, 94, 0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            // FIXED: Removed initial prop that was making it invisible
            // OR alternatively, add opacity: 1 to animate prop if you want fade-in effect
          >
            <Camera className="h-4 w-4" />
            <span className="hidden sm:inline">Live Detection</span>
          </motion.button>

          {/* Enhanced Refresh Quota Button */}
          <motion.button
            onClick={refreshQuota}
            disabled={isRefreshing}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-3 py-2 text-sm font-medium text-white transition-all duration-200 disabled:opacity-50 sm:px-4"
            whileHover={{
              scale: isRefreshing ? 1 : 1.05,
              boxShadow: isRefreshing
                ? "none"
                : "0 5px 15px rgba(34, 197, 94, 0.4)",
            }}
            whileTap={{ scale: isRefreshing ? 1 : 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={
                isRefreshing
                  ? { duration: 1, repeat: Infinity, ease: "linear" }
                  : { duration: 0.6 }
              }
              whileHover={!isRefreshing ? { rotate: 360 } : {}}
            >
              <TrendingUp className="h-4 w-4" />
            </motion.div>
            <span className="hidden sm:inline">
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </span>
          </motion.button>

          {/* Home Button */}
          <motion.button
            onClick={handleGoHome}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-2 text-sm font-medium text-white transition-all duration-200 sm:px-4"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Home className="h-4 w-4" />
            </motion.div>
            <span className="hidden sm:inline">Home</span>
          </motion.button>

          {/* Logout Button */}
          <motion.button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-3 py-2 text-sm font-medium text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(239, 68, 68, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {isLoggingOut ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="hidden sm:inline">Logging out...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="logout"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* FIXED: Simplified Quota Overview Cards */}
      <motion.div
        className="relative z-10 mb-6 w-full px-4 sm:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {/* Overall Quota */}
          <motion.div
            className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-4 backdrop-blur-xl"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
            }}
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/20 p-2">
                <Zap className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Total Quota
                </h3>
                <p className="text-xs text-purple-200">Combined usage</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">
                  {remaining}
                </span>
                <span className="text-xs text-purple-300">
                  / {quota.maxRequests}
                </span>
              </div>

              <div className="h-2 w-full rounded-full bg-gray-700">
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${100 - usagePercentage}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>

              <div className="text-center">
                <Badge className={getStatusColor()}>{getStatusMessage()}</Badge>
              </div>
            </div>
          </motion.div>

          {/* FIXED: Sentiment Analysis - 2 quota points */}
          <motion.div
            className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-4 backdrop-blur-xl"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
            }}
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/20 p-2">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Sentiment Analysis
                </h3>
                <p className="text-xs text-blue-200">2 quota each</p>
              </div>
            </div>

            <div className="space-y-1 text-center">
              <span className="text-lg font-bold text-white">
                {canAffordSentiment}
              </span>
              <p className="text-xs text-blue-200">analyses available</p>
              {canAffordSentiment > 0 ? (
                <CheckCircle className="mx-auto h-4 w-4 text-green-400" />
              ) : (
                <AlertCircle className="mx-auto h-4 w-4 text-red-400" />
              )}
            </div>
          </motion.div>

          {/* FIXED: Live Detection - 10 quota points */}
          <motion.div
            className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-900/50 to-emerald-900/50 p-4 backdrop-blur-xl"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)",
            }}
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-green-500/20 p-2">
                <Video className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Live Detection
                </h3>
                <p className="text-xs text-green-200">2 quota each</p>
              </div>
            </div>

            <div className="space-y-1 text-center">
              <span className="text-lg font-bold text-white">
                {canAffordLive}
              </span>
              <p className="text-xs text-green-200">sessions available</p>
              {canAffordLive > 0 ? (
                <CheckCircle className="mx-auto h-4 w-4 text-green-400" />
              ) : (
                <AlertCircle className="mx-auto h-4 w-4 text-red-400" />
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="relative z-10 w-full p-4 pt-0 sm:p-6 sm:pt-0">
        {/* Mobile Welcome Section */}
        <motion.div
          className="mb-6 w-full md:hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div
            className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-sm"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-2 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="h-6 w-6 text-purple-400" />
              </motion.div>
              <motion.h2
                className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Welcome back, {user?.name || "User"}!
              </motion.h2>
            </div>
            <motion.p
              className="text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {user?.isActive
                ? "Your subscription is active"
                : "Ready to analyze your videos"}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Video Upload Section */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.div
              className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-transparent p-6 shadow-2xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{
                scale: 1.005,
                y: -2,
              }}
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(20px)",
              }}
            >
              <motion.div
                className="relative z-10 mb-6 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <motion.div
                  className="relative rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-3"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 1.2,
                    boxShadow: "0 10px 25px rgba(139, 92, 246, 0.5)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-purple-400/50"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 0, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                  <Upload className="relative z-10 h-6 w-6 text-white" />
                </motion.div>
                <motion.h3
                  className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-xl font-bold text-transparent"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(139, 92, 246, 0.5)",
                      "0 0 20px rgba(139, 92, 246, 0.8)",
                      "0 0 10px rgba(139, 92, 246, 0.5)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Video Analysis
                </motion.h3>
              </motion.div>

              {/* AnimatedUpload Container */}
              <motion.div
                className="relative z-10 flex min-h-[400px] items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="w-full">
                  {hasValidSecretKey ? (
                    <AnimatedUpload
                      apiKey={displayQuota.secretKey}
                      onAnalysis={handleAnalysis}
                      acceptedTypes="video/mp4,video/mov,video/avi"
                      className="w-full"
                    />
                  ) : (
                    <div className="flex min-h-[400px] items-center justify-center rounded-2xl border-2 border-dashed border-red-400/50 bg-red-500/10 text-center text-white backdrop-blur-sm">
                      <div>
                        <p className="text-lg font-semibold">
                          ⚠️ API Key Required
                        </p>
                        <p className="text-sm text-white/70">
                          Please ensure your API key is properly configured.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* RESTORED: Detailed Sentiment Analysis Results */}
              {analysis && (
                <DetailedSentimentAnalysisResults analysis={analysis} />
              )}
            </motion.div>
          </motion.div>

          {/* Right Side Panel */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="flex h-full flex-col gap-6">
              {/* Desktop Welcome */}
              <motion.div
                className="hidden rounded-2xl border border-white/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md lg:block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
                }}
              >
                <div className="mb-2 flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Sparkles className="h-6 w-6 text-purple-400" />
                  </motion.div>
                  <motion.h2
                    className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-xl font-bold text-transparent"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(139, 92, 246, 0.5)",
                        "0 0 20px rgba(139, 92, 246, 0.8)",
                        "0 0 10px rgba(139, 92, 246, 0.5)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Welcome back, {user?.name || "User"}!
                  </motion.h2>
                </div>
                <motion.p
                  className="text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {user?.isActive
                    ? "Your subscription is active"
                    : "Ready to analyze your videos"}
                </motion.p>
              </motion.div>

              <motion.h3
                className="flex items-center gap-2 text-lg font-medium text-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                </motion.div>
                API Configuration
              </motion.h3>

              {/* API Key Section */}
              <motion.div
                className="rounded-2xl border border-white/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  boxShadow:
                    "0 20px 40px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.1)",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <motion.span
                  className="text-sm font-medium text-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  Secret key
                </motion.span>
                <motion.span
                  className="mb-4 block text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  This key should be used when calling our API, to authorize
                  your request. It can not be shared publicly, and needs to be
                  kept secret.
                </motion.span>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <motion.span
                    className="text-sm font-medium text-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    Key
                  </motion.span>
                  <div className="flex flex-wrap items-center gap-2">
                    <motion.span
                      className="font-mono w-full max-w-[200px] overflow-x-auto rounded-md border border-gray-600 bg-gray-800/50 px-3 py-1 text-sm text-gray-300 sm:w-auto"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.6 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {hasValidSecretKey
                        ? displayQuota.secretKey
                        : "No secret key available"}
                    </motion.span>
                    {hasValidSecretKey && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.7 }}
                      >
                        <CopyButton text={displayQuota.secretKey} />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Show message if no secret key */}
                {!hasValidSecretKey && (
                  <motion.div
                    className="mt-3 rounded-md border border-yellow-500/20 bg-yellow-500/10 p-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 }}
                  >
                    <p className="text-sm text-yellow-400">
                      ⚠️ Secret key not found. Please contact support or refresh
                      the page.
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* FIXED: Simplified Quota Section */}
              <motion.div
                className="rounded-2xl border border-white/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  boxShadow:
                    "0 20px 40px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.1)",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Video className="h-4 w-4 text-purple-400" />
                  </motion.div>
                  <motion.span
                    className="text-sm font-medium text-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    Monthly quota
                  </motion.span>
                  {isRefreshing && (
                    <motion.div
                      className="ml-2"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <TrendingUp className="h-3 w-3 text-green-400" />
                    </motion.div>
                  )}
                </div>

                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <motion.span
                    className="text-2xl font-bold text-gray-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    whileHover={{ scale: 1.05 }}
                    key={`${quota.requestsUsed}-${quota.maxRequests}`}
                  >
                    {quota.requestsUsed || 0} / {quota.maxRequests || 100}
                  </motion.span>
                  <motion.span
                    className="text-sm text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    quota points used
                  </motion.span>
                </div>

                <motion.div
                  className="relative h-3 w-full overflow-hidden rounded-full bg-gray-700"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1.7, duration: 0.8 }}
                >
                  <motion.div
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      usagePercentage > 90
                        ? "bg-gradient-to-r from-red-400 to-red-600"
                        : usagePercentage > 70
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                          : "bg-gradient-to-r from-purple-500 to-blue-500"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
                    key={usagePercentage}
                  />
                </motion.div>

                {/* FIXED: Enhanced quota breakdown for simplified system */}
                <motion.div
                  className="mt-4 space-y-2 border-t border-gray-600 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                >
                  <div className="space-y-1 text-xs text-gray-400">
                    <div className="flex justify-between">
                      <span>Sentiment Analysis (2 quota):</span>
                      <span className="text-green-300">
                        {canAffordSentiment}x
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Live Detection (2 quota):</span>
                      <span className="text-green-300">{canAffordLive}x</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-2 text-xs text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                >
                  {usagePercentage > 90 && (
                    <motion.span
                      className="font-medium text-red-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⚠️ Quota almost exhausted
                    </motion.span>
                  )}
                  {usagePercentage <= 90 && usagePercentage > 70 && (
                    <motion.span
                      className="font-medium text-orange-400"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⚡ Consider upgrading soon
                    </motion.span>
                  )}
                  {usagePercentage <= 70 && (
                    <motion.span
                      className="font-medium text-green-400"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✅ Quota healthy
                    </motion.span>
                  )}
                </motion.div>

                {/* Upgrade Button */}
                {usagePercentage > 80 && (
                  <motion.div
                    className="mt-4 border-t border-gray-600 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 }}
                  >
                    <motion.button
                      onClick={() => router.push("/pricing")}
                      className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(139, 92, 246, 0.4)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className="flex items-center justify-center gap-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Zap className="h-4 w-4" />
                        Upgrade Plan
                      </motion.span>
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>

              {/* Code Examples */}
              <motion.div
                className="flex-1 rounded-2xl border border-white/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  boxShadow:
                    "0 20px 40px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.1)",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <CodeExamples />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Floating Action Elements */}
      <motion.div
        className="fixed bottom-6 right-6 z-30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col gap-3"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Stats Indicator */}
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
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Activity className="h-4 w-4" />
              <span className="text-xs font-medium">{remaining} left</span>
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20" />
      </motion.div>
    </motion.div>
  );
}

export default DashboardClient;
