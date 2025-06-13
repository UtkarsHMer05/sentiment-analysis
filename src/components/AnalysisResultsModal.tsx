"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  BarChart3,
  Code2,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AnalysisResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: any;
}

interface EmotionPoint {
  time: number;
  emotion: string;
  sentiment: string;
  emotionConfidence: number;
  sentimentConfidence: number;
}

interface EmotionAverage {
  emotion: string;
  avgConfidence: number;
  count: number;
}

interface SentimentAverage {
  sentiment: string;
  avgConfidence: number;
  count: number;
}

const TABS = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "timeline", label: "Timeline Analysis", icon: Clock },
  { id: "transcript", label: "Transcription", icon: FileText },
  { id: "insights", label: "Insights", icon: TrendingUp },
  { id: "raw", label: "Raw JSON", icon: Code2 },
];

// Emotion to emoji mapping
const EMOTION_EMOJIS: Record<string, string> = {
  joy: "😄",
  sadness: "😢",
  anger: "😡",
  disgust: "🤢",
  fear: "😱",
  surprise: "😲",
  neutral: "😐",
};

// Sentiment colors
const SENTIMENT_COLORS: Record<string, string> = {
  positive: "text-green-600 bg-green-100",
  negative: "text-red-600 bg-red-100",
  neutral: "text-gray-600 bg-gray-100",
};

// Enhanced animation variants
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const tabContentVariants = {
  hidden: { opacity: 0, x: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export function AnalysisResultsModal({
  isOpen,
  onClose,
  analysis,
}: AnalysisResultsModalProps) {
  const [tab, setTab] = useState("overview");

  if (!isOpen || !analysis) return null;

  const utterances = analysis.utterances || [];
  const quotaInfo = analysis.quotaInfo || {};

  // Calculate comprehensive statistics
  const allEmotions: any[] = [];
  const allSentiments: any[] = [];
  let fullTranscript = "";

  utterances.forEach((utt: any) => {
    fullTranscript += utt.text || "";
    if (utt.emotions) allEmotions.push(...utt.emotions);
    if (utt.sentiments) allSentiments.push(...utt.sentiments);
  });

  // Calculate overall emotion and sentiment scores
  const emotionCounts: Record<string, number> = {};
  const sentimentCounts: Record<string, number> = {};
  const emotionConfidences: Record<string, number[]> = {};
  const sentimentConfidences: Record<string, number[]> = {};

  allEmotions.forEach((emotion) => {
    const label = emotion.label || emotion.emotion;
    emotionCounts[label] = (emotionCounts[label] || 0) + 1;
    if (!emotionConfidences[label]) emotionConfidences[label] = [];
    emotionConfidences[label].push(emotion.confidence);
  });

  allSentiments.forEach((sentiment) => {
    const label = sentiment.label || sentiment.sentiment;
    sentimentCounts[label] = (sentimentCounts[label] || 0) + 1;
    if (!sentimentConfidences[label]) sentimentConfidences[label] = [];
    sentimentConfidences[label].push(sentiment.confidence);
  });

  // Get weighted averages with explicit typing
  const emotionAverages: EmotionAverage[] = Object.entries(emotionConfidences)
    .map(([emotion, confidences]: [string, number[]]) => ({
      emotion,
      avgConfidence:
        confidences.reduce((a: number, b: number) => a + b, 0) /
        confidences.length,
      count: emotionCounts[emotion] || 0,
    }))
    .sort(
      (a: EmotionAverage, b: EmotionAverage) =>
        b.avgConfidence - a.avgConfidence,
    );

  const sentimentAverages: SentimentAverage[] = Object.entries(
    sentimentConfidences,
  )
    .map(([sentiment, confidences]: [string, number[]]) => ({
      sentiment,
      avgConfidence:
        confidences.reduce((a: number, b: number) => a + b, 0) /
        confidences.length,
      count: sentimentCounts[sentiment] || 0,
    }))
    .sort(
      (a: SentimentAverage, b: SentimentAverage) =>
        b.avgConfidence - a.avgConfidence,
    );

  // Safe access with fallbacks
  const topEmotion: EmotionAverage = emotionAverages[0] || {
    emotion: "neutral",
    avgConfidence: 0,
    count: 0,
  };
  const topSentiment: SentimentAverage = sentimentAverages[0] || {
    sentiment: "neutral",
    avgConfidence: 0,
    count: 0,
  };

  // Calculate emotion progression over time with proper typing
  const emotionProgression: EmotionPoint[] = utterances.map(
    (utt: any, idx: number) => ({
      time: utt.start_time || idx,
      emotion: utt.emotions?.[0]?.label || "neutral",
      sentiment: utt.sentiments?.[0]?.label || "neutral",
      emotionConfidence: utt.emotions?.[0]?.confidence || 0,
      sentimentConfidence: utt.sentiments?.[0]?.confidence || 0,
    }),
  );

  // FIXED: Format transcript with proper line breaks
  const formatTranscript = (text: string) => {
    return (
      text
        .trim()
        .split(/[.!?]+/)
        .filter((sentence) => sentence.trim().length > 0)
        .map((sentence) => sentence.trim())
        .join(".\n") +
      (text.trim().endsWith(".") ||
      text.trim().endsWith("!") ||
      text.trim().endsWith("?")
        ? ""
        : ".")
    );
  };

  const overviewTab = (
    <div className="space-y-4 pb-4">
      {/* Compressed Overall Results */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Card className="border-0 bg-gradient-to-r from-purple-100 to-blue-100 p-3 shadow-md">
          <h4 className="mb-1 text-xs font-medium text-gray-600">
            Overall Dominant Emotion
          </h4>
          <div className="flex items-center gap-2 text-lg font-bold text-blue-700">
            <span className="text-xl">
              {EMOTION_EMOJIS[topEmotion.emotion] || "😐"}
            </span>
            {topEmotion.emotion.charAt(0).toUpperCase() +
              topEmotion.emotion.slice(1)}
          </div>
          <p className="text-xs text-gray-500">
            Confidence: {(topEmotion.avgConfidence * 100).toFixed(1)}% •{" "}
            {topEmotion.count} utterances
          </p>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-blue-100 to-green-100 p-3 shadow-md">
          <h4 className="mb-1 text-xs font-medium text-gray-600">
            Overall Dominant Sentiment
          </h4>
          <div className="flex items-center gap-2 text-lg font-bold text-green-700">
            {topSentiment.sentiment.charAt(0).toUpperCase() +
              topSentiment.sentiment.slice(1)}
          </div>
          <p className="text-xs text-gray-500">
            Confidence: {(topSentiment.avgConfidence * 100).toFixed(1)}% •{" "}
            {topSentiment.count} utterances
          </p>
        </Card>
      </div>

      {/* Compressed Emotion Distribution */}
      <div>
        <h4 className="mb-2 text-sm font-medium">Emotion Distribution</h4>
        <div className="space-y-2">
          {emotionAverages
            .slice(0, 4)
            .map((emotion: EmotionAverage, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="flex w-16 items-center gap-1">
                  <span className="text-sm">
                    {EMOTION_EMOJIS[emotion.emotion] || "😐"}
                  </span>
                  <span className="text-xs font-medium">{emotion.emotion}</span>
                </div>
                <div className="flex-1">
                  <Progress
                    value={emotion.avgConfidence * 100}
                    className="h-2"
                  />
                </div>
                <div className="w-12 text-right text-xs text-gray-500">
                  {(emotion.avgConfidence * 100).toFixed(1)}%
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Compressed Sentiment Distribution */}
      <div>
        <h4 className="mb-2 text-sm font-medium">Sentiment Distribution</h4>
        <div className="space-y-2">
          {sentimentAverages.map((sentiment: SentimentAverage, idx: number) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-16">
                <Badge
                  className={`text-xs ${SENTIMENT_COLORS[sentiment.sentiment] || "bg-gray-100"}`}
                >
                  {sentiment.sentiment}
                </Badge>
              </div>
              <div className="flex-1">
                <Progress
                  value={sentiment.avgConfidence * 100}
                  className="h-2"
                />
              </div>
              <div className="w-12 text-right text-xs text-gray-500">
                {(sentiment.avgConfidence * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compressed Quick Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-purple-50 p-2">
          <div className="text-lg font-bold text-purple-600">
            {utterances.length}
          </div>
          <div className="text-xs text-gray-600">Segments</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-2">
          <div className="text-lg font-bold text-blue-600">
            {utterances.length > 0
              ? Math.max(
                  ...utterances.map((u: any) => u.end_time || 0),
                ).toFixed(1)
              : "0"}
            s
          </div>
          <div className="text-xs text-gray-600">Duration</div>
        </div>
        <div className="rounded-lg bg-green-50 p-2">
          <div className="text-lg font-bold text-green-600">
            {fullTranscript.trim().split(/\s+/).length}
          </div>
          <div className="text-xs text-gray-600">Words</div>
        </div>
      </div>
    </div>
  );

  const timelineTab = (
    <div className="space-y-3">
      <h4 className="mb-3 text-sm font-medium">
        Time-Based Emotion & Sentiment Analysis
      </h4>
      <ScrollArea className="h-80">
        <div className="space-y-3 pr-4">
          {utterances.map((utt: any, idx: number) => {
            const topEmotion = utt.emotions?.[0];
            const topSentiment = utt.sentiments?.[0];

            return (
              <motion.div
                key={idx}
                className="rounded-lg border bg-gradient-to-r from-gray-50 to-blue-50 p-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {utt.start_time?.toFixed(1)}s - {utt.end_time?.toFixed(1)}
                      s
                    </Badge>
                    <span className="text-xs text-gray-500">
                      (
                      {((utt.end_time || 0) - (utt.start_time || 0)).toFixed(1)}
                      s)
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {topEmotion && (
                      <Badge variant="secondary" className="text-xs">
                        {EMOTION_EMOJIS[topEmotion.label] || ""}{" "}
                        {topEmotion.label}
                        <span className="ml-1 text-gray-500">
                          {(topEmotion.confidence * 100).toFixed(0)}%
                        </span>
                      </Badge>
                    )}
                    {topSentiment && (
                      <Badge
                        className={`text-xs ${SENTIMENT_COLORS[topSentiment.label] || "bg-gray-100"}`}
                      >
                        {topSentiment.label}
                        <span className="ml-1 opacity-75">
                          {(topSentiment.confidence * 100).toFixed(0)}%
                        </span>
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="mb-2 text-sm font-medium italic text-gray-800">
                  "{utt.text?.trim()}"
                </p>

                <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-2">
                  <div>
                    <p className="mb-1 font-medium text-gray-600">Emotions:</p>
                    <div className="space-y-1">
                      {(utt.emotions || [])
                        .slice(0, 3)
                        .map((emotion: any, i: number) => (
                          <div key={i} className="flex justify-between">
                            <span>
                              {EMOTION_EMOJIS[emotion.label] || ""}{" "}
                              {emotion.label}
                            </span>
                            <span className="text-gray-500">
                              {(emotion.confidence * 100).toFixed(1)}%
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-gray-600">
                      Sentiments:
                    </p>
                    <div className="space-y-1">
                      {(utt.sentiments || [])
                        .slice(0, 3)
                        .map((sentiment: any, i: number) => (
                          <div key={i} className="flex justify-between">
                            <span
                              className={
                                SENTIMENT_COLORS[sentiment.label] ||
                                "text-gray-600"
                              }
                            >
                              {sentiment.label}
                            </span>
                            <span className="text-gray-500">
                              {(sentiment.confidence * 100).toFixed(1)}%
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );

  const transcriptTab = (
    <div className="space-y-3">
      <h4 className="mb-2 text-sm font-medium">Complete Transcript</h4>
      <ScrollArea className="h-80">
        <div className="rounded border bg-white p-3 shadow-inner">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-700">
            {formatTranscript(fullTranscript) || "No transcript available."}
          </pre>
        </div>
      </ScrollArea>
      <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
        <div>Total words: {fullTranscript.trim().split(/\s+/).length}</div>
        <div>Total characters: {fullTranscript.length}</div>
      </div>
    </div>
  );

  const insightsTab = (
    <div className="space-y-3">
      <Card className="p-3">
        <h4 className="mb-2 text-sm font-medium">Emotional Journey</h4>
        <ScrollArea className="h-40">
          <div className="space-y-1 pr-4">
            {emotionProgression.map((point: EmotionPoint, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded p-1 text-sm"
              >
                <div className="w-10 text-xs text-gray-500">
                  {point.time.toFixed(1)}s
                </div>
                <div className="flex flex-1 items-center gap-2">
                  <span>{EMOTION_EMOJIS[point.emotion]}</span>
                  <span className="font-medium">{point.emotion}</span>
                  <span className="text-gray-500">→</span>
                  <Badge
                    className={`text-xs ${SENTIMENT_COLORS[point.sentiment]}`}
                  >
                    {point.sentiment}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Card className="p-3">
        <h4 className="mb-2 text-sm font-medium">Key Insights</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 rounded p-2 hover:bg-yellow-50">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span>
              Most confident emotion: <strong>{topEmotion.emotion}</strong> (
              {(topEmotion.avgConfidence * 100).toFixed(1)}%)
            </span>
          </div>
          <div className="flex items-center gap-2 rounded p-2 hover:bg-blue-50">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span>
              Dominant sentiment: <strong>{topSentiment.sentiment}</strong> (
              {(topSentiment.avgConfidence * 100).toFixed(1)}%)
            </span>
          </div>
          <div className="flex items-center gap-2 rounded p-2 hover:bg-purple-50">
            <Clock className="h-4 w-4 text-purple-500" />
            <span>
              Analysis covered {utterances.length} distinct speech segments
            </span>
          </div>
        </div>
      </Card>
    </div>
  );

  const rawTab = (
    <div>
      <h4 className="mb-2 text-sm font-medium">Raw Analysis Data</h4>
      <ScrollArea className="h-80 w-full">
        <div className="rounded border bg-gray-50 p-3 shadow-inner">
          <pre className="font-mono whitespace-pre-wrap text-xs text-gray-600">
            {JSON.stringify(analysis, null, 2)}
          </pre>
        </div>
      </ScrollArea>
      <div className="mt-2 text-xs text-gray-500">
        Scroll to view complete analysis data
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-600/60 via-blue-600/60 to-purple-400/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="mx-4 max-h-[90vh] w-full max-w-5xl overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="overflow-hidden border-0 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 py-3 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="h-5 w-5" />
                    Comprehensive AI Analysis Results
                  </CardTitle>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
                <p className="text-sm opacity-90">
                  Complete emotion and sentiment analysis with timeline and
                  insights
                </p>
              </CardHeader>

              <CardContent className="flex max-h-[75vh] flex-col overflow-y-auto p-4">
                {/* Compressed Quota Info */}
                {quotaInfo && Object.keys(quotaInfo).length > 0 && (
                  <div className="mb-3 flex-shrink-0 rounded-lg bg-purple-50 p-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Quota Usage:</span>
                      <span className="font-medium">
                        {quotaInfo.used}/{quotaInfo.maxRequests} (
                        {quotaInfo.remaining} remaining)
                      </span>
                    </div>
                  </div>
                )}

                {/* Compressed Tabs */}
                <div className="mb-3 flex flex-shrink-0 gap-1 overflow-x-auto">
                  {TABS.map(({ id, label, icon: Icon }, index) => (
                    <motion.div
                      key={id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={tab === id ? "default" : "outline"}
                        className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs transition-all duration-300 ${
                          tab === id
                            ? "scale-105 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setTab(id)}
                      >
                        <Icon className="h-3 w-3" />
                        {label}
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <Separator className="mb-3 flex-shrink-0" />

                {/* Compressed Tab Content */}
                <div className="min-h-0 flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="h-full overflow-y-auto"
                    >
                      {tab === "overview" && overviewTab}
                      {tab === "timeline" && timelineTab}
                      {tab === "transcript" && transcriptTab}
                      {tab === "insights" && insightsTab}
                      {tab === "raw" && rawTab}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Fixed Close Button */}
                <motion.div
                  className="mt-3 flex flex-shrink-0 justify-end border-t pt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={onClose}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl"
                    >
                      Close Results
                    </Button>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
