import { WebSocketServer, WebSocket } from "ws";
import { createServer } from "http";
import { parse } from "url";
import jwt from "jsonwebtoken";
import { db } from "~/server/db";

interface WebSocketMessage {
  type:
    | "video_frame"
    | "audio_chunk"
    | "text_input"
    | "start_analysis"
    | "stop_analysis";
  data: any;
  timestamp: number;
}

interface AnalysisResult {
  emotion: string;
  sentiment: string;
  confidence: number;
  keywords: string[];
  timestamp: number;
}

interface ClientConnection {
  ws: WebSocket;
  userId: string;
  isAnalyzing: boolean;
  lastAnalysis: AnalysisResult | null;
}

class LiveAnalysisServer {
  private wss: WebSocketServer;
  private clients: Map<string, ClientConnection> = new Map();
  private analysisInterval: NodeJS.Timeout | null = null;

  constructor(port: number = 8080) {
    const server = createServer();
    this.wss = new WebSocketServer({ server });

    this.wss.on("connection", this.handleConnection.bind(this));

    server.listen(port, () => {
      console.log(`🚀 WebSocket server running on port ${port}`);
    });

    // Start analysis loop
    this.startAnalysisLoop();
  }

  private async handleConnection(ws: WebSocket, request: any): Promise<void> {
    try {
      const { query } = parse(request.url || "", true);
      const token = query.token;

      // Fix: Handle string | string[] | undefined type
      const tokenString = Array.isArray(token) ? token[0] : token;

      if (!tokenString || typeof tokenString !== "string") {
        ws.close(1008, "Authentication token required");
        return;
      }

      // Verify JWT token
      const decoded = this.verifyToken(tokenString);
      if (!decoded || !decoded.userId) {
        ws.close(1008, "Invalid authentication token");
        return;
      }

      const userId = decoded.userId;
      const clientId = `${userId}_${Date.now()}`;

      // Store client connection
      this.clients.set(clientId, {
        ws,
        userId,
        isAnalyzing: false,
        lastAnalysis: null,
      });

      console.log(`✅ Client connected: ${clientId}`);

      // Handle messages
      ws.on("message", (data: Buffer) => {
        this.handleMessage(clientId, data);
      });

      // Handle disconnect
      ws.on("close", () => {
        this.clients.delete(clientId);
        console.log(`❌ Client disconnected: ${clientId}`);
      });

      // Send welcome message
      this.sendToClient(clientId, {
        type: "connected",
        data: { message: "Connected to live analysis server" },
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Connection error:", error);
      ws.close(1011, "Internal server error");
    }
  }

  private verifyToken(token: string): { userId: string } | null {
    try {
      // Implement your JWT verification logic here
      const decoded = jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "fallback-secret",
      ) as any;
      return { userId: decoded.sub || decoded.userId };
    } catch (error) {
      console.error("Token verification failed:", error);
      return null;
    }
  }

  private handleMessage(clientId: string, data: Buffer): void {
    try {
      const client = this.clients.get(clientId);
      if (!client) return;

      const message: WebSocketMessage = JSON.parse(data.toString());

      switch (message.type) {
        case "start_analysis":
          client.isAnalyzing = true;
          this.sendToClient(clientId, {
            type: "analysis_started",
            data: { message: "Live analysis started" },
            timestamp: Date.now(),
          });
          break;

        case "stop_analysis":
          client.isAnalyzing = false;
          this.sendToClient(clientId, {
            type: "analysis_stopped",
            data: { message: "Live analysis stopped" },
            timestamp: Date.now(),
          });
          break;

        case "video_frame":
          if (client.isAnalyzing) {
            this.processVideoFrame(clientId, message.data);
          }
          break;

        case "audio_chunk":
          if (client.isAnalyzing) {
            this.processAudioChunk(clientId, message.data);
          }
          break;

        case "text_input":
          if (client.isAnalyzing) {
            this.processTextInput(clientId, message.data);
          }
          break;

        default:
          console.warn(`Unknown message type: ${message.type}`);
      }
    } catch (error) {
      console.error("Message handling error:", error);
    }
  }

  private async processVideoFrame(
    clientId: string,
    frameData: any,
  ): Promise<void> {
    // Placeholder for video frame processing
    const mockEmotionAnalysis = this.generateMockEmotionAnalysis();

    this.sendToClient(clientId, {
      type: "video_analysis",
      data: mockEmotionAnalysis,
      timestamp: Date.now(),
    });
  }

  private async processAudioChunk(
    clientId: string,
    audioData: any,
  ): Promise<void> {
    // Placeholder for audio processing
    const mockAudioAnalysis = this.generateMockAudioAnalysis();

    this.sendToClient(clientId, {
      type: "audio_analysis",
      data: mockAudioAnalysis,
      timestamp: Date.now(),
    });
  }

  private async processTextInput(
    clientId: string,
    textData: any,
  ): Promise<void> {
    const client = this.clients.get(clientId);
    if (!client) return;

    // Simple keyword-based sentiment analysis
    const sentiment = this.analyzeTextSentiment(textData.text);

    client.lastAnalysis = {
      emotion: sentiment.emotion,
      sentiment: sentiment.sentiment,
      confidence: sentiment.confidence,
      keywords: sentiment.keywords,
      timestamp: Date.now(),
    };

    this.sendToClient(clientId, {
      type: "text_analysis",
      data: client.lastAnalysis,
      timestamp: Date.now(),
    });
  }

  private analyzeTextSentiment(text: string): AnalysisResult {
    const positiveKeywords = [
      "happy",
      "joy",
      "excited",
      "amazing",
      "wonderful",
      "great",
      "excellent",
      "love",
      "awesome",
    ];
    const negativeKeywords = [
      "sad",
      "angry",
      "frustrated",
      "terrible",
      "awful",
      "hate",
      "bad",
      "worst",
    ];
    const fearKeywords = [
      "scared",
      "afraid",
      "terrified",
      "worried",
      "anxious",
      "nervous",
    ];
    const surpriseKeywords = [
      "surprised",
      "shocked",
      "amazed",
      "astonished",
      "unexpected",
    ];

    const words = text.toLowerCase().split(/\s+/);
    const foundKeywords: string[] = [];

    let positiveCount = 0;
    let negativeCount = 0;
    let fearCount = 0;
    let surpriseCount = 0;

    words.forEach((word) => {
      if (positiveKeywords.includes(word)) {
        positiveCount++;
        foundKeywords.push(word);
      } else if (negativeKeywords.includes(word)) {
        negativeCount++;
        foundKeywords.push(word);
      } else if (fearKeywords.includes(word)) {
        fearCount++;
        foundKeywords.push(word);
      } else if (surpriseKeywords.includes(word)) {
        surpriseCount++;
        foundKeywords.push(word);
      }
    });

    let emotion = "neutral";
    let sentiment = "neutral";
    let confidence = 0.5;

    if (positiveCount > 0) {
      emotion = "joy";
      sentiment = "positive";
      confidence = Math.min((positiveCount / words.length) * 3, 1.0);
    } else if (negativeCount > 0) {
      emotion = "sadness";
      sentiment = "negative";
      confidence = Math.min((negativeCount / words.length) * 3, 1.0);
    } else if (fearCount > 0) {
      emotion = "fear";
      sentiment = "negative";
      confidence = Math.min((fearCount / words.length) * 3, 1.0);
    } else if (surpriseCount > 0) {
      emotion = "surprise";
      sentiment = "neutral";
      confidence = Math.min((surpriseCount / words.length) * 3, 1.0);
    }

    return {
      emotion,
      sentiment,
      confidence,
      keywords: foundKeywords,
      timestamp: Date.now(),
    };
  }

  private generateMockEmotionAnalysis(): AnalysisResult {
    const emotions = [
      "joy",
      "sadness",
      "anger",
      "fear",
      "surprise",
      "disgust",
      "neutral",
    ];
    const sentiments = ["positive", "negative", "neutral"];

    // Fix: Ensure we always return valid strings
    const randomEmotion =
      emotions[Math.floor(Math.random() * emotions.length)] || "neutral";
    const randomSentiment =
      sentiments[Math.floor(Math.random() * sentiments.length)] || "neutral";

    return {
      emotion: randomEmotion,
      sentiment: randomSentiment,
      confidence: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
      keywords: ["mock", "analysis"],
      timestamp: Date.now(),
    };
  }

  private generateMockAudioAnalysis(): AnalysisResult {
    return this.generateMockEmotionAnalysis();
  }

  private sendToClient(clientId: string, message: any): void {
    const client = this.clients.get(clientId);
    if (client && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(JSON.stringify(message));
    }
  }

  private startAnalysisLoop(): void {
    this.analysisInterval = setInterval(() => {
      // Send periodic updates to analyzing clients
      this.clients.forEach((client, clientId) => {
        if (client.isAnalyzing && client.lastAnalysis) {
          this.sendToClient(clientId, {
            type: "periodic_update",
            data: client.lastAnalysis,
            timestamp: Date.now(),
          });
        }
      });
    }, 2000); // Update every 2 seconds
  }

  public stop(): void {
    if (this.analysisInterval) {
      clearInterval(this.analysisInterval);
    }
    this.wss.close();
  }
}

// Export for use in your application
export default LiveAnalysisServer;

// Start server if this file is run directly (ES module syntax)
if (import.meta.url === `file://${process.argv[1]}`) {
  new LiveAnalysisServer(8080);
}
