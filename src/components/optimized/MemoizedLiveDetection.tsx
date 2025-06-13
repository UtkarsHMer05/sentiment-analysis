"use client";

import React, { memo, useMemo, useCallback, useState, useEffect } from "react"; // FIXED: Added missing imports
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Square,
  Play,
  Upload,
  Mic,
  MicOff,
  AlertCircle,
  Zap,
  Activity,
  Brain,
  Volume2,
  RefreshCw,
  Clock,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

import { useLiveDetection } from "~/hooks/useLiveDetection";
import { AutoUploadModal } from "../AutoUploadModal";
import { SentimentTrendChart } from "./SentimentTrendChart";
import { QuotaNotification } from "./QuotaNotification";

// Memoized components for performance
const MemoizedVideoControls = memo(
  ({
    cameraActive,
    isRecording,
    hasRecording,
    isListening,
    onStartCamera,
    onStopCamera,
    onStartRecording,
    onStopRecording,
    onStartListening,
    onStopListening,
    onUpload,
    onReset,
  }: {
    cameraActive: boolean;
    isRecording: boolean;
    hasRecording: boolean;
    isListening: boolean;
    onStartCamera: () => void;
    onStopCamera: () => void;
    onStartRecording: () => void;
    onStopRecording: () => void;
    onStartListening: () => void;
    onStopListening: () => void;
    onUpload: () => void;
    onReset: () => void;
  }) => (
    <motion.div className="mt-4 flex flex-wrap gap-2">
      {!cameraActive ? (
        <Button onClick={onStartCamera} className="flex items-center gap-2">
          <Camera className="h-4 w-4" />
          Start Camera
        </Button>
      ) : (
        <Button
          onClick={onStopCamera}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Camera className="h-4 w-4" />
          Stop Camera
        </Button>
      )}

      <AnimatePresence>
        {cameraActive && !isRecording && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Button
              onClick={onStartRecording}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Start Recording (60s max)
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Button
              onClick={onStopRecording}
              variant="destructive"
              className="flex items-center gap-2"
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
          >
            <Button
              onClick={onUpload}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Upload className="h-4 w-4" />
              Analyze with AWS (10 quota)
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={isListening ? onStopListening : onStartListening}
        variant={isListening ? "destructive" : "outline"}
        className="flex items-center gap-2"
      >
        <motion.div
          animate={isListening ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
        >
          {isListening ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </motion.div>
        {isListening ? "Stop Listening" : "Start Listening"}
      </Button>

      <Button
        onClick={onReset}
        variant="outline"
        className="flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Reset
      </Button>
    </motion.div>
  ),
);

MemoizedVideoControls.displayName = "MemoizedVideoControls";

const MemoizedAnalysisPanel = memo(
  ({
    currentEmotion,
    currentSentiment,
    transcriptText,
    isListening,
    sentimentHistory,
  }: {
    currentEmotion: string;
    currentSentiment: string;
    transcriptText: string;
    isListening: boolean;
    sentimentHistory: Array<{
      timestamp: number;
      emotion: string;
      sentiment: string;
      confidence: number;
    }>;
  }) => {
    const getEmotionColor = useCallback((emotion: string): string => {
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
    }, []);

    const getSentimentColor = useCallback((sentiment: string): string => {
      const colors: Record<string, string> = {
        positive: "text-green-500",
        negative: "text-red-500",
        neutral: "text-gray-500",
      };
      return colors[sentiment] || "text-gray-500";
    }, []);

    return (
      <div className="space-y-6">
        {/* Current Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Real-time Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Current Emotion
              </label>
              <motion.div
                className={`text-2xl font-bold ${getEmotionColor(currentEmotion)}`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.3 }}
              >
                {currentEmotion.charAt(0).toUpperCase() +
                  currentEmotion.slice(1)}
              </motion.div>
            </div>

            <Separator />

            <div>
              <label className="text-sm font-medium text-gray-600">
                Current Sentiment
              </label>
              <motion.div
                className={`text-2xl font-bold ${getSentimentColor(currentSentiment)}`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.5 }}
              >
                {currentSentiment.charAt(0).toUpperCase() +
                  currentSentiment.slice(1)}
              </motion.div>
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Sentiment Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SentimentTrendChart data={sentimentHistory} />
          </CardContent>
        </Card>

        {/* Live Transcript */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-blue-500" />
              Live Transcript
              {isListening && (
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-red-500"
                />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              className="max-h-32 overflow-y-auto rounded border bg-gray-50 p-3 text-sm"
              animate={transcriptText ? { borderColor: "#10b981" } : {}}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {transcriptText ? (
                  <motion.div
                    key={transcriptText}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {transcriptText}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400"
                  >
                    Start speaking to see live transcription...
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    );
  },
);

MemoizedAnalysisPanel.displayName = "MemoizedAnalysisPanel";

export default function OptimizedLiveEmotionCapture(): JSX.Element {
  const { state, actions, videoRef, hasRecording, cameraActive } =
    useLiveDetection();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [sentimentHistory, setSentimentHistory] = useState<
    Array<{
      timestamp: number;
      emotion: string;
      sentiment: string;
      confidence: number;
    }>
  >([]);

  // Memoized callbacks
  const handleUploadClick = useCallback(() => {
    if (hasRecording) {
      setShowUploadModal(true);
    }
  }, [hasRecording]);

  const handleModalClose = useCallback(() => {
    setShowUploadModal(false);
  }, []);

  const handleUploadComplete = useCallback((result: any) => {
    setShowUploadModal(false);
    console.log("Upload completed:", result);
  }, []);

  // Track sentiment history for trends
  useEffect(() => {
    if (state.isAnalyzing && state.currentEmotion !== "neutral") {
      setSentimentHistory((prev) => [
        ...prev.slice(-19), // Keep last 20 entries
        {
          timestamp: Date.now(),
          emotion: state.currentEmotion,
          sentiment: state.currentSentiment,
          confidence: 0.8, // You can calculate this from your analysis
        },
      ]);
    }
  }, [state.currentEmotion, state.currentSentiment, state.isAnalyzing]);

  // Memoized format duration
  const formatDuration = useMemo(
    () =>
      (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
      },
    [],
  );

  // Auto-stop at 60 seconds
  useEffect(() => {
    if (state.isRecording && state.duration >= 60) {
      actions.stopRecording();
    }
  }, [state.isRecording, state.duration, actions.stopRecording]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Live Emotion Detection
          </h1>
          <p className="text-lg text-gray-600">
            Real-time emotion and sentiment analysis with AI-powered insights
          </p>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            Maximum recording time: 60 seconds
          </div>
        </motion.div>

        {/* Quota Notification */}
        <QuotaNotification />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Video Feed */}
          <motion.div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={cameraActive ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
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
                      <Brain className="h-4 w-4 text-purple-500" />
                    </motion.div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <motion.video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full rounded-lg border bg-black shadow-lg"
                    style={{ aspectRatio: "16/9" }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Recording indicator */}
                  <AnimatePresence>
                    {state.isRecording && (
                      <motion.div
                        className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-white shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <motion.div
                          className="h-2 w-2 rounded-full bg-white"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        REC {formatDuration(state.duration)} / 01:00
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Time remaining */}
                  <AnimatePresence>
                    {state.isRecording && state.duration > 45 && (
                      <motion.div
                        className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-orange-600 px-3 py-1 text-white shadow-lg"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <Clock className="h-3 w-3" />
                        {60 - state.duration}s left
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Error overlay */}
                  <AnimatePresence>
                    {state.error && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Alert className="max-w-md">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{state.error}</AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Memoized Controls */}
                <MemoizedVideoControls
                  cameraActive={cameraActive}
                  isRecording={state.isRecording}
                  hasRecording={hasRecording}
                  isListening={state.isListening}
                  onStartCamera={actions.startCamera}
                  onStopCamera={actions.stopCamera}
                  onStartRecording={actions.startRecording}
                  onStopRecording={actions.stopRecording}
                  onStartListening={actions.startListening}
                  onStopListening={actions.stopListening}
                  onUpload={handleUploadClick}
                  onReset={actions.resetSession}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Memoized Analysis Panel */}
          <motion.div>
            <MemoizedAnalysisPanel
              currentEmotion={state.currentEmotion}
              currentSentiment={state.currentSentiment}
              transcriptText={state.transcriptText}
              isListening={state.isListening}
              sentimentHistory={sentimentHistory}
            />
          </motion.div>
        </div>
      </div>

      {/* Upload Modal */}
      <AutoUploadModal
        isOpen={showUploadModal}
        onClose={handleModalClose}
        videoBlob={actions.getVideoBlob()}
        onUploadComplete={handleUploadComplete}
      />
    </motion.div>
  );
}
