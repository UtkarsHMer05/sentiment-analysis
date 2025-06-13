"use client";

import { useState } from "react";
import { AnimatedUpload } from "../animated-upload";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp, BarChart3, Zap } from "lucide-react";

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

interface InferenceProps {
  quota: {
    secretKey: string;
  };
}

export interface Analysis {
  analysis: {
    utterances: Array<{
      start_time: number;
      end_time: number;
      text: string;
      emotions: Array<{ label: string; confidence: number }>;
      sentiments: Array<{ label: string; confidence: number }>;
    }>;
  };
}

export function Inference({ quota }: InferenceProps) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const getAverageScores = () => {
    if (!analysis?.analysis.utterances.length) return null;

    // Aggregate all the scores
    const emotionScores: Record<string, number[]> = {};
    const sentimentScores: Record<string, number[]> = {};

    analysis.analysis.utterances.forEach((utterance) => {
      utterance.emotions.forEach((emotion) => {
        if (!emotionScores[emotion.label]) emotionScores[emotion.label] = [];
        emotionScores[emotion.label]!.push(emotion.confidence);
      });
      utterance.sentiments.forEach((sentiment) => {
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

  return (
    <motion.div
      className="flex h-fit w-full flex-col gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Upload Section with Beautiful Animations */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md"
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
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
              <Sparkles className="relative z-10 h-6 w-6 text-white" />
            </motion.div>
            <motion.h2
              className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent"
              animate={{
                textShadow: [
                  "0 0 10px rgba(139, 92, 246, 0.5)",
                  "0 0 20px rgba(139, 92, 246, 0.8)",
                  "0 0 10px rgba(139, 92, 246, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Video Upload & Analysis
            </motion.h2>
          </motion.div>

          {/* AnimatedUpload Component - This is the key fix */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <AnimatedUpload
              onAnalysis={setAnalysis}
              apiKey={quota.secretKey}
              acceptedTypes="video/mp4,video/mov,video/avi"
              className="w-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Overall Analysis Section */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
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
            initial={{ opacity: 0, x: -20 }}
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
                    {EMOTION_EMOJI[averages?.topEmotion?.label!]}
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
                    {SENTIMENT_EMOJI[averages?.topSentiment?.label!]}
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
      </motion.div>

      {/* Enhanced Utterances Analysis Section */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div
              className="relative rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-3"
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
                boxShadow: "0 10px 25px rgba(249, 115, 22, 0.5)",
              }}
            >
              <Zap className="h-6 w-6 text-white" />
            </motion.div>
            <motion.h2
              className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-xl font-bold text-transparent"
              animate={{
                textShadow: [
                  "0 0 10px rgba(249, 115, 22, 0.5)",
                  "0 0 20px rgba(249, 115, 22, 0.8)",
                  "0 0 10px rgba(249, 115, 22, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Detailed Analysis
            </motion.h2>
          </motion.div>

          <AnimatePresence mode="wait">
            {analysis ? (
              <motion.div
                key="utterances"
                className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {analysis?.analysis.utterances.map((utterance, i) => {
                  return (
                    <motion.div
                      key={
                        utterance.start_time.toString() +
                        utterance.end_time.toString()
                      }
                      className="flex h-fit w-full flex-wrap justify-between gap-8 rounded-xl border border-white/20 bg-white/5 px-6 py-4 backdrop-blur-md sm:gap-4"
                      initial={{ opacity: 0, x: -30, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{
                        delay: 1 + i * 0.1,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)",
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      {/* Time and text */}
                      <motion.div
                        className="flex w-full max-w-24 flex-col justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 + i * 0.1 }}
                      >
                        <motion.div
                          className="text-sm font-semibold text-white"
                          whileHover={{ scale: 1.05 }}
                        >
                          {Number(utterance.start_time).toFixed(1)} -{" "}
                          {Number(utterance.end_time).toFixed(1)}s
                        </motion.div>
                        <motion.div
                          className="mt-1 text-xs text-white/60"
                          animate={{
                            opacity: [0.6, 0.9, 0.6],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          {utterance.text}
                        </motion.div>
                      </motion.div>

                      {/* Emotions */}
                      <motion.div
                        className="flex w-full max-w-48 flex-col gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 + i * 0.1 }}
                      >
                        <span className="text-sm font-medium text-white">
                          Emotions
                        </span>
                        {utterance.emotions.map((emo, j) => {
                          return (
                            <motion.div
                              key={emo.label}
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.4 + i * 0.1 + j * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <motion.span
                                className="w-16 whitespace-nowrap text-xs text-white/70"
                                animate={{
                                  scale: [1, 1.1, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: j * 0.2,
                                }}
                              >
                                {EMOTION_EMOJI[emo.label]} {emo.label}
                              </motion.span>
                              <div className="flex-1">
                                <div className="h-2 w-full rounded-full bg-white/20">
                                  <motion.div
                                    style={{
                                      width: `${emo.confidence * 100}%`,
                                    }}
                                    className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${emo.confidence * 100}%`,
                                    }}
                                    transition={{
                                      delay: 1.5 + i * 0.1 + j * 0.05,
                                      duration: 1,
                                      ease: "easeOut",
                                    }}
                                  />
                                </div>
                                <span className="w-8 text-right text-xs text-white/60">
                                  {(emo.confidence * 100).toFixed(0)}%
                                </span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>

                      {/* Sentiments */}
                      <motion.div
                        className="flex w-full max-w-48 flex-col gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 + i * 0.1 }}
                      >
                        <span className="text-sm font-medium text-white">
                          Sentiments
                        </span>
                        {utterance.sentiments.map((sentiment, j) => {
                          return (
                            <motion.div
                              key={sentiment.label}
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.5 + i * 0.1 + j * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <motion.span
                                className="w-16 whitespace-nowrap text-xs text-white/70"
                                animate={{
                                  scale: [1, 1.1, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: j * 0.3,
                                }}
                              >
                                {SENTIMENT_EMOJI[sentiment.label]}{" "}
                                {sentiment.label}
                              </motion.span>
                              <div className="flex-1">
                                <div className="h-2 w-full rounded-full bg-white/20">
                                  <motion.div
                                    style={{
                                      width: `${sentiment.confidence * 100}%`,
                                    }}
                                    className="h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400"
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${sentiment.confidence * 100}%`,
                                    }}
                                    transition={{
                                      delay: 1.6 + i * 0.1 + j * 0.05,
                                      duration: 1,
                                      ease: "easeOut",
                                    }}
                                  />
                                </div>
                                <span className="w-8 text-right text-xs text-white/60">
                                  {(sentiment.confidence * 100).toFixed(0)}%
                                </span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="placeholder-utterances"
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
                    className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Zap className="h-6 w-6 text-orange-400" />
                  </motion.div>
                  <span className="text-sm text-white/60">
                    Upload a video to see detailed analysis
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
