"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Eye, EyeOff, Key } from "lucide-react";

interface ApiKeyManagerProps {
  apiKey: string;
}

export function ApiKeyManager({ apiKey }: ApiKeyManagerProps) {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Store API key in localStorage for live detection
    if (apiKey) {
      localStorage.setItem("sentiment_api_key", apiKey);
    }
  }, [apiKey]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy API key:", error);
    }
  };

  const maskedKey = apiKey
    ? `${apiKey.substring(0, 8)}${"*".repeat(32)}${apiKey.substring(-8)}`
    : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Key for Live Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="api-key">Your API Key</Label>
          <div className="mt-1 flex gap-2">
            <Input
              id="api-key"
              type="text"
              value={showKey ? apiKey : maskedKey}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {copied && (
          <Alert>
            <AlertDescription>API key copied to clipboard!</AlertDescription>
          </Alert>
        )}

        <Alert>
          <AlertDescription>
            This API key is automatically used for live emotion detection. Keep
            it secure and don't share it publicly.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
