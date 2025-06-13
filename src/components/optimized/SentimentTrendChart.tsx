"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface SentimentDataPoint {
  timestamp: number;
  emotion: string;
  sentiment: string;
  confidence: number;
}

interface SentimentTrendChartProps {
  data: SentimentDataPoint[];
}

export function SentimentTrendChart({ data }: SentimentTrendChartProps) {
  // Process data for visualization
  const chartData = useMemo(() => {
    if (data.length === 0)
      return { points: [], trend: "neutral", avgConfidence: 0 };

    const points = data.slice(-10).map((point, index) => {
      const sentimentValue =
        point.sentiment === "positive"
          ? 1
          : point.sentiment === "negative"
            ? -1
            : 0;
      return {
        x: (index / Math.max(data.slice(-10).length - 1, 1)) * 100,
        y: 50 + sentimentValue * 30, // Scale to 0-100 range
        sentiment: point.sentiment,
        emotion: point.emotion,
        confidence: point.confidence,
        timestamp: point.timestamp,
      };
    });

    // FIXED: Calculate trend with proper null checks
    const recentPoints = points.slice(-5);
    let trend: "positive" | "negative" | "neutral" = "neutral";

    if (recentPoints.length >= 2) {
      const lastPoint = recentPoints[recentPoints.length - 1];
      const firstPoint = recentPoints[0];

      // FIXED: Add null checks for array access
      if (lastPoint && firstPoint) {
        if (lastPoint.y > firstPoint.y) {
          trend = "positive";
        } else if (lastPoint.y < firstPoint.y) {
          trend = "negative";
        } else {
          trend = "neutral";
        }
      }
    }

    const avgConfidence =
      data.length > 0
        ? data.reduce((sum, point) => sum + point.confidence, 0) / data.length
        : 0;

    return { points, trend, avgConfidence };
  }, [data]);

  const getTrendIcon = () => {
    switch (chartData.trend) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "negative":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    switch (chartData.trend) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (data.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-gray-400">
        <p className="text-sm">Start recording to see sentiment trends</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Trend Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getTrendIcon()}
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {chartData.trend.charAt(0).toUpperCase() + chartData.trend.slice(1)}{" "}
            Trend
          </span>
        </div>
        <div className="text-xs text-gray-500">
          Avg Confidence: {(chartData.avgConfidence * 100).toFixed(1)}%
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-24 w-full">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          {/* Grid lines */}
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Center line */}
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="#d1d5db"
            strokeWidth="1"
            strokeDasharray="2,2"
          />

          {/* Sentiment line */}
          {chartData.points.length > 1 && (
            <motion.path
              d={`M ${chartData.points
                .map((point) => `${point.x},${point.y}`)
                .join(" L ")}`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          )}

          {/* Data points */}
          {chartData.points.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="2"
              fill={
                point.sentiment === "positive"
                  ? "#10b981"
                  : point.sentiment === "negative"
                    ? "#ef4444"
                    : "#6b7280"
              }
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-xs text-gray-500">
          <span>Positive</span>
          <span>Neutral</span>
          <span>Negative</span>
        </div>
      </div>

      {/* Recent emotions */}
      <div className="flex flex-wrap gap-1">
        {data.slice(-5).map((point, index) => (
          <motion.div
            key={index}
            className={`rounded-full px-2 py-1 text-xs ${
              point.sentiment === "positive"
                ? "bg-green-100 text-green-800"
                : point.sentiment === "negative"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {point.emotion}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
