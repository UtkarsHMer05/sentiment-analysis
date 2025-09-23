"use client";

import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Upload,
    AlertCircle,
    CheckCircle,
    Loader2,
    Zap,
    Activity,
    Brain,
    RefreshCw,
    Clock,
    X,
    ExternalLink,
    Home,
    BarChart3,
    Sparkles,
    Download,
    Eye,
    Settings,
    ToggleLeft,
    ToggleRight,
    FileSpreadsheet,
    Cloud,
    Hash,
    Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import {
    SentimentAnalysisDisplay,
    SummaryDisplay,
    EntityDisplay,
    WordCloudDisplay,
    ExportOptions,
} from "@/components/PdfAnalysisResults";

// Types
interface QuotaStatus {
    maxRequests: number;
    requestsUsed: number;
    remaining: number;
    canAfford: {
        sentiment_analysis: number;
        live_detection: number;
        pdf_analysis: number;
    };
}

interface PdfAnalysisResult {
    filename: string;
    total_pages: number;
    models_available: {
        sentiment: boolean;
        summary: boolean;
        entities: boolean;
    };
    analysis_type: string;
    individual_analysis?: Array<{
        page: number;
        text: string;
        full_text_length: number;
        sentiment?: string;
        summary?: string;
        entities?: Array<[string, string]>;
    }>;
    combined_analysis?: {
        total_text_length: number;
        preview: string;
        sentiment_distribution?: Record<string, number>;
        overall_sentiment?: string;
        summary?: string;
        top_entities?: Array<[string, number]>;
        total_entities?: number;
        wordcloud?: string;
    };
    userId: string;
    quotaUsed: number;
    remainingQuota: number;
    timestamp: string;
}

// Enhanced Background Animations Component
const PdfAnalysisBackgroundAnimations = memo(() => {
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
            {/* Animated Gradient Orbs */}
            <motion.div
                className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute right-1/4 top-3/4 h-96 w-96 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -50, 0],
                    y: [0, 30, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating Elements */}
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-2 w-2 rounded-full bg-purple-400/30"
                    style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}

            {/* Animated Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(147,51,234,0.1)_1px,transparent_1px)] [background-size:50px_50px]" />
        </div>
    );
});

PdfAnalysisBackgroundAnimations.displayName = "PdfAnalysisBackgroundAnimations";


// Main PDF Analysis Component
export default function PdfAnalysisCapture() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // State
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [analysisMode, setAnalysisMode] = useState<"individual" | "combined" | "both">("both");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [analysisResult, setAnalysisResult] = useState<PdfAnalysisResult | null>(null);
    const [quotaStatus, setQuotaStatus] = useState<QuotaStatus | null>(null);
    const [serviceStatus, setServiceStatus] = useState<{
        status: string;
        allModelsReady: boolean;
        modelStatus?: Record<string, boolean>;
    } | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Check service status and quota on mount
    useEffect(() => {
        checkServiceStatus();
        fetchQuotaStatus();
    }, []);

    const checkServiceStatus = async () => {
        try {
            const response = await fetch("/api/pdf-analysis");
            const data = await response.json();
            setServiceStatus(data);
        } catch (error) {
            console.error("Failed to check service status:", error);
            setServiceStatus({
                status: "unavailable",
                allModelsReady: false,
            });
        }
    };

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

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileName = file.name.toLowerCase();
            const validExtensions = ['.pdf', '.xlsx', '.xls'];
            const isValidFile = validExtensions.some(ext => fileName.endsWith(ext));

            if (!isValidFile) {
                setError("Please select a PDF or Excel file (.pdf, .xlsx, .xls)");
                return;
            }
            if (file.size > 50 * 1024 * 1024) { // 50MB
                setError("File size must be less than 50MB");
                return;
            }
            setSelectedFile(file);
            setError(null);
            setAnalysisResult(null);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;

        if (quotaStatus && quotaStatus.canAfford.pdf_analysis < 1) {
            setError("Insufficient quota. You need 2 quota points for PDF analysis.");
            return;
        }

        setIsAnalyzing(true);
        setUploadProgress(0);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("analysisType", analysisMode);

            // Simulate upload progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            const response = await fetch("/api/pdf-analysis", {
                method: "POST",
                body: formData,
            });

            clearInterval(progressInterval);
            setUploadProgress(100);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || errorData.message || "Analysis failed");
            }

            const result: PdfAnalysisResult = await response.json();
            setAnalysisResult(result);

            // Refresh quota status
            await fetchQuotaStatus();

        } catch (error) {
            console.error("Analysis error:", error);
            setError(error instanceof Error ? error.message : "Analysis failed");
        } finally {
            setIsAnalyzing(false);
            setUploadProgress(0);
        }
    };

    const resetAnalysis = () => {
        setSelectedFile(null);
        setAnalysisResult(null);
        setError(null);
        setUploadProgress(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
            <PdfAnalysisBackgroundAnimations />

            {/* Header */}
            <motion.header
                className="relative z-20 flex items-center justify-between border-b border-white/10 bg-black/20 p-4 backdrop-blur-xl sm:p-6"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-4">
                    <motion.div
                        className="rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 p-3"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <FileText className="h-6 w-6 text-purple-400" />
                    </motion.div>
                    <div>
                        <h1 className="text-xl font-bold text-white sm:text-2xl">
                            Document Sentiment Analyzer
                        </h1>
                        <p className="text-sm text-gray-300">
                            Advanced PDF and Excel document analysis with AI
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Service Status Indicator */}
                    {serviceStatus && (
                        <motion.div
                            className={`flex items-center gap-2 rounded-lg px-3 py-1 text-xs ${serviceStatus.allModelsReady
                                ? "bg-green-900/50 text-green-200"
                                : "bg-yellow-900/50 text-yellow-200"
                                }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div
                                className={`h-2 w-2 rounded-full ${serviceStatus.allModelsReady ? "bg-green-400" : "bg-yellow-400"
                                    }`}
                            />
                            {serviceStatus.allModelsReady ? "Ready" : "Loading Models"}
                        </motion.div>
                    )}

                    {/* Quota Display */}
                    {quotaStatus && (
                        <motion.div
                            className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Zap className="h-3 w-3 text-purple-400" />
                            <span>{quotaStatus.remaining} quota</span>
                        </motion.div>
                    )}

                    <Button
                        onClick={() => router.push("/dashboard")}
                        variant="outline"
                        size="sm"
                        className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                    >
                        <Home className="mr-2 h-4 w-4" />
                        Dashboard
                    </Button>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="relative z-10 flex flex-col items-center justify-center p-4 sm:p-6">
                <div className="w-full max-w-4xl space-y-6">

                    {/* File Upload Section */}
                    {!analysisResult && (
                        <motion.div
                            className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl sm:p-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="text-center">
                                <motion.div
                                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20"
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Upload className="h-8 w-8 text-purple-400" />
                                </motion.div>

                                <h2 className="mb-2 text-2xl font-bold text-white">
                                    Upload Document
                                </h2>
                                <p className="mb-6 text-gray-300">
                                    Select a PDF or Excel file for comprehensive sentiment analysis, summarization, and entity recognition
                                </p>

                                {/* File Input */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.xlsx,.xls"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />

                                {!selectedFile ? (
                                    <motion.div
                                        className="cursor-pointer rounded-xl border-2 border-dashed border-purple-400/50 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-12 transition-all hover:border-purple-400 hover:bg-purple-900/40"
                                        onClick={() => fileInputRef.current?.click()}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FileText className="mx-auto mb-4 h-12 w-12 text-purple-400" />
                                        <p className="text-lg font-medium text-white">
                                            Click to select document file
                                        </p>
                                        <p className="mt-2 text-sm text-gray-400">
                                            Supports PDF and Excel files • Maximum file size: 50MB
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        className="rounded-xl bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-6"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="rounded-lg bg-purple-500/20 p-3">
                                                    <FileText className="h-6 w-6 text-purple-400" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-medium text-white">{selectedFile.name}</p>
                                                    <p className="text-sm text-gray-400">
                                                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={resetAnalysis}
                                                variant="ghost"
                                                size="sm"
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {isAnalyzing && (
                                            <motion.div
                                                className="mt-4"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <div className="mb-2 flex items-center justify-between text-sm">
                                                    <span className="text-gray-300">
                                                        {uploadProgress < 100 ? "Uploading..." : "Analyzing..."}
                                                    </span>
                                                    <span className="text-purple-400">{uploadProgress}%</span>
                                                </div>
                                                <Progress value={uploadProgress} className="h-2" />
                                            </motion.div>
                                        )}

                                        {!isAnalyzing && (
                                            <motion.div
                                                className="mt-4"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <Button
                                                    onClick={handleAnalyze}
                                                    disabled={!serviceStatus?.allModelsReady || (quotaStatus?.canAfford.pdf_analysis ?? 0) < 1}
                                                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                                                >
                                                    <Brain className="mr-2 h-4 w-4" />
                                                    Analyze Document (2 quota)
                                                </Button>

                                                {!serviceStatus?.allModelsReady && (
                                                    <p className="mt-2 text-xs text-yellow-400">
                                                        AI models are still loading. Please wait...
                                                    </p>
                                                )}

                                                {(quotaStatus?.canAfford.pdf_analysis ?? 0) < 1 && (
                                                    <p className="mt-2 text-xs text-red-400">
                                                        Insufficient quota. You need 2 quota points for document analysis.
                                                    </p>
                                                )}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}

                                {error && (
                                    <motion.div
                                        className="mt-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <Alert className="border-red-500/50 bg-red-900/50">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription className="text-red-200">
                                                {error}
                                            </AlertDescription>
                                        </Alert>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Results Section */}
                    {analysisResult && (
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Results Header */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
                                    <p className="text-gray-300">
                                        {analysisResult.filename} • {analysisResult.total_pages} pages
                                    </p>
                                </div>
                                <Button
                                    onClick={resetAnalysis}
                                    variant="outline"
                                    className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                                >
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    New Analysis
                                </Button>
                            </div>

                            {/* Analysis Results Display */}
                            <div className="space-y-6">
                                {/* Analysis Tabs/Sections */}
                                <div className="grid gap-6">
                                    {/* Sentiment Analysis */}
                                    {(analysisResult.combined_analysis?.overall_sentiment ||
                                        analysisResult.individual_analysis?.some((p: any) => p.sentiment)) && (
                                            <SentimentAnalysisDisplay result={analysisResult} />
                                        )}

                                    {/* Summary */}
                                    {(analysisResult.combined_analysis?.summary ||
                                        analysisResult.individual_analysis?.some((p: any) => p.summary)) && (
                                            <SummaryDisplay result={analysisResult} />
                                        )}

                                    {/* Entities */}
                                    {(analysisResult.combined_analysis?.top_entities ||
                                        analysisResult.individual_analysis?.some((p: any) => p.entities?.length)) && (
                                            <EntityDisplay result={analysisResult} />
                                        )}

                                    {/* Word Cloud */}
                                    {analysisResult.combined_analysis?.wordcloud && (
                                        <WordCloudDisplay result={analysisResult} />
                                    )}

                                    {/* Export Options */}
                                    <ExportOptions result={analysisResult} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
}