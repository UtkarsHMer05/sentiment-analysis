"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Zap,
  CheckCircle,
  X,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface QuotaStatus {
  remaining: number;
  maxRequests: number;
  used: number;
  resetDate: string;
}

export function QuotaNotification() {
  const [quotaStatus, setQuotaStatus] = useState<QuotaStatus | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch quota status
  useEffect(() => {
    const fetchQuotaStatus = async () => {
      try {
        const response = await fetch("/api/user/quota-status");
        if (response.ok) {
          const data = await response.json();
          setQuotaStatus(data);

          // Show notification if quota is low
          const usagePercentage = (data.used / data.maxRequests) * 100;
          setShowNotification(usagePercentage >= 80);
        }
      } catch (error) {
        console.error("Failed to fetch quota status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotaStatus();

    // Refresh quota status every 30 seconds
    const interval = setInterval(fetchQuotaStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getQuotaLevel = () => {
    if (!quotaStatus) return "unknown";
    const usagePercentage = (quotaStatus.used / quotaStatus.maxRequests) * 100;

    if (usagePercentage >= 90) return "critical";
    if (usagePercentage >= 80) return "warning";
    if (usagePercentage >= 60) return "moderate";
    return "good";
  };

  const getQuotaColor = () => {
    const level = getQuotaLevel();
    switch (level) {
      case "critical":
        return "text-red-600";
      case "warning":
        return "text-orange-600";
      case "moderate":
        return "text-yellow-600";
      default:
        return "text-green-600";
    }
  };

  const getQuotaIcon = () => {
    const level = getQuotaLevel();
    switch (level) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "moderate":
        return <Zap className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getProgressColor = () => {
    const level = getQuotaLevel();
    switch (level) {
      case "critical":
        return "bg-red-500";
      case "warning":
        return "bg-orange-500";
      case "moderate":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  if (loading || !quotaStatus) {
    return (
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-300" />
            <div className="h-4 flex-1 animate-pulse rounded bg-gray-300" />
          </div>
        </div>
      </motion.div>
    );
  }

  const usagePercentage = (quotaStatus.used / quotaStatus.maxRequests) * 100;

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Main Quota Display */}
        <motion.div
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getQuotaIcon()}
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  API Quota Status
                </h3>
                <p className="text-xs text-gray-500">
                  {quotaStatus.remaining} of {quotaStatus.maxRequests} requests
                  remaining
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className={`text-lg font-bold ${getQuotaColor()}`}>
                  {quotaStatus.remaining}
                </div>
                <div className="text-xs text-gray-500">remaining</div>
              </div>

              <div className="w-24">
                <Progress value={usagePercentage} className="h-2" />
                <div className="mt-1 text-center text-xs text-gray-500">
                  {usagePercentage.toFixed(0)}% used
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Low Quota Warning */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              className="mt-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-orange-800">
                      Quota Running Low
                    </span>
                    <p className="text-sm text-orange-700">
                      You have {quotaStatus.remaining} requests remaining.
                      Consider upgrading your plan to continue using live
                      detection.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700"
                      onClick={() => (window.location.href = "/pricing")}
                    >
                      <CreditCard className="mr-1 h-3 w-3" />
                      Upgrade
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowNotification(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quota Breakdown */}
        <motion.div
          className="mt-3 grid grid-cols-3 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="rounded-lg bg-blue-50 p-3 text-center">
            <div className="text-lg font-bold text-blue-600">
              {quotaStatus.used}
            </div>
            <div className="text-xs text-blue-800">Used</div>
          </div>

          <div className="rounded-lg bg-green-50 p-3 text-center">
            <div className="text-lg font-bold text-green-600">
              {quotaStatus.remaining}
            </div>
            <div className="text-xs text-green-800">Remaining</div>
          </div>

          <div className="rounded-lg bg-purple-50 p-3 text-center">
            <div className="text-lg font-bold text-purple-600">
              {quotaStatus.maxRequests}
            </div>
            <div className="text-xs text-purple-800">Total</div>
          </div>
        </motion.div>

        {/* Cost Information */}
        <motion.div
          className="mt-3 rounded-lg bg-gray-50 p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Live Detection Cost: 10 quota per analysis</span>
            <Badge variant="secondary" className="text-xs">
              <TrendingUp className="mr-1 h-3 w-3" />
              {Math.floor(quotaStatus.remaining / 10)} analyses available
            </Badge>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
