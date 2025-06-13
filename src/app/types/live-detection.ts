export interface CameraOption {
  deviceId: string;
  label: string;
  kind: string;
}

export interface EmotionResult {
  label: string;
  confidence: number;
}

export interface SentimentResult {
  label: string;
  confidence: number;
}

export interface ProcessingResult {
  success: boolean;
  results?: {
    text: string;
    emotions: EmotionResult[];
    sentiments: SentimentResult[];
    top_emotion: string;
    top_sentiment: string;
  };
  error?: string;
  quotaInfo?: {
    used: number;
    remaining: number;
    type: string;
  };
}

export interface QuotaStatus {
  maxRequests: number;
  requestsUsed: number;
  remaining: number;
  resetDate: Date;
  quotaCosts: {
    sentiment_analysis: number;
    live_emotion_1min: number;
    live_emotion_2min: number;
  };
  canAfford: {
    sentiment_analysis: number;
    live_emotion_1min: number;
    live_emotion_2min: number;
  };
}

export interface TranscriptionChunk {
  id: string;
  text: string;
  timestamp: number;
  confidence?: number;
}

export type DurationType = "1min" | "2min";
export type CameraSourceType = "webcam" | "phone";
