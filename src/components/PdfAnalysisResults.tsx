import { memo } from "react";
import { motion } from "framer-motion";
import {
    BarChart3,
    Brain,
    FileText,
    Hash,
    Tag,
    TrendingUp,
    TrendingDown,
    Minus,
    Download,
    Eye,
    Cloud,
    Users,
    MapPin,
    Building,
    User,
    Calendar,
    Sparkles,
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    Meh,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Types
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

// Sentiment Analysis Component
export const SentimentAnalysisDisplay = memo(
    ({ result }: { result: PdfAnalysisResult }) => {
        const getSentimentColor = (sentiment: string) => {
            switch (sentiment?.toLowerCase()) {
                case "positive":
                    return "text-white bg-black border border-white/20";
                case "negative":
                    return "text-white bg-black border border-white/20";
                case "neutral":
                    return "text-white bg-black border border-white/20";
                default:
                    return "text-white bg-black border border-white/20";
            }
        };

        const getSentimentIcon = (sentiment: string) => {
            switch (sentiment?.toLowerCase()) {
                case "positive":
                    return TrendingUp;
                case "negative":
                    return TrendingDown;
                case "neutral":
                    return Minus;
                default:
                    return Brain;
            }
        };

        const getSentimentEmoji = (sentiment: string) => {
            switch (sentiment?.toLowerCase()) {
                case "positive":
                    return "😊";
                case "negative":
                    return "😞";
                case "neutral":
                    return "😐";
                default:
                    return "🤔";
            }
        };

        const getSentimentBadgeColor = (sentiment: string) => {
            return "bg-black text-white border border-white/20";
        };

        return (
            <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {/* Combined Analysis Sentiment */}
                {result.combined_analysis?.overall_sentiment && (
                    <Card className="border border-white/20 bg-black">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-slate-100">
                                <Brain className="h-5 w-5 text-blue-400" />
                                Overall Document Sentiment
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                {(() => {
                                    const Icon = getSentimentIcon(result.combined_analysis!.overall_sentiment!);
                                    const emoji = getSentimentEmoji(result.combined_analysis!.overall_sentiment!);
                                    return (
                                        <div
                                            className={`rounded-xl p-4 ${getSentimentColor(
                                                result.combined_analysis!.overall_sentiment!
                                            )}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{emoji}</span>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                        </div>
                                    );
                                })()}
                                <div>
                                    <h3 className="text-2xl font-bold text-white capitalize">
                                        {result.combined_analysis.overall_sentiment}
                                    </h3>
                                    <p className="text-gray-400">Overall document sentiment</p>
                                </div>
                            </div>

                            {result.combined_analysis.sentiment_distribution && (
                                <div className="mt-6 space-y-3">
                                    <h4 className="text-sm font-medium text-gray-300">
                                        Sentiment Distribution Across Document
                                    </h4>
                                    {Object.entries(result.combined_analysis.sentiment_distribution).map(
                                        ([sentiment, percentage]) => (
                                            <div key={sentiment} className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg">{getSentimentEmoji(sentiment)}</span>
                                                        <span className="text-gray-300 capitalize">{sentiment}</span>
                                                    </div>
                                                    <span className="text-purple-400 font-medium">{percentage.toFixed(1)}%</span>
                                                </div>
                                                <Progress
                                                    value={percentage}
                                                    className="h-2"
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Detailed Sentiment Table */}
                {result.individual_analysis && result.individual_analysis.length > 0 && (
                    <Card className="border border-white/20 bg-black">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-slate-100">
                                <MessageSquare className="h-5 w-5 text-blue-400" />
                                Detailed Content Analysis
                            </CardTitle>
                            <p className="text-sm text-slate-400">
                                Content breakdown with sentiment analysis for each section
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                {result.individual_analysis
                                    .filter((page) => page.sentiment)
                                    .map((page, index) => (
                                        <motion.div
                                            key={`${page.page}-${index}`}
                                            className="rounded-lg border border-white/20 bg-black p-4 hover:bg-neutral-900 transition-all duration-200"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="grid gap-4 md:grid-cols-[1fr,auto] md:items-start">
                                                {/* Content Column */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Badge variant="outline" className="text-white border-white/20 bg-black">
                                                            {`Comment ${index + 1}`}
                                                        </Badge>
                                                        <span className="text-xs text-slate-400">
                                                            {page.full_text_length} characters
                                                        </span>
                                                    </div>
                                                    <div className="rounded-md bg-black border border-white/20 p-3">
                                                        <p className="text-sm text-slate-200 leading-relaxed">
                                                            {page.text.length > 300
                                                                ? `${page.text.substring(0, 300)}...`
                                                                : page.text}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Sentiment Column */}
                                                <div className="flex flex-col items-center gap-2 md:min-w-[120px]">
                                                    <div
                                                        className={`rounded-lg border px-3 py-2 text-center ${getSentimentBadgeColor(page.sentiment!)}`}
                                                    >
                                                        <div className="text-2xl mb-1">
                                                            {getSentimentEmoji(page.sentiment!)}
                                                        </div>
                                                        <div className="text-xs font-medium capitalize">
                                                            {page.sentiment}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                            </div>

                            {/* Summary Stats */}
                            <div className="mt-6 p-4 rounded-lg bg-black border border-white/20">
                                <h4 className="text-sm font-medium text-purple-300 mb-3">Analysis Summary</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">📄</div>
                                        <div className="text-white font-medium">{result.individual_analysis.length}</div>
                                        <div className="text-gray-400">
                                            {result.filename.toLowerCase().endsWith('.pdf') ? 'Pages' : 'Sheets'}
                                        </div>
                                    </div>
                                    {result.combined_analysis?.sentiment_distribution &&
                                        Object.entries(result.combined_analysis.sentiment_distribution).map(([sentiment, count]) => (
                                            <div key={sentiment} className="text-center">
                                                <div className="text-2xl mb-1">{getSentimentEmoji(sentiment)}</div>
                                                <div className="text-white font-medium">{Math.round(count)}%</div>
                                                <div className="text-gray-400 capitalize">{sentiment}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Individual Page Sentiments - Compact Grid View */}
                {result.individual_analysis && result.individual_analysis.length > 0 && (
                    <Card className="border border-white/20 bg-black">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <FileText className="h-5 w-5 text-purple-400" />
                                Quick Sentiment Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-h-[300px] overflow-y-auto pr-2">
                                {result.individual_analysis
                                    .filter((page) => page.sentiment)
                                    .map((page, index) => {
                                        const Icon = getSentimentIcon(page.sentiment!);
                                        const emoji = getSentimentEmoji(page.sentiment!);
                                        return (
                                            <motion.div
                                                key={`${page.page}-${index}`}
                                                className={`rounded-lg border p-3 ${getSentimentColor(
                                                    page.sentiment!
                                                )} hover:scale-105 transition-transform duration-200 cursor-pointer`}
                                                whileHover={{ scale: 1.05 }}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: page.page * 0.05 }}
                                            >
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-lg">{emoji}</span>
                                                    <Icon className="h-4 w-4" />
                                                    <span className="text-sm font-medium">
                                                        {`Comment ${index + 1}`}
                                                    </span>
                                                </div>
                                                <p className="text-xs capitalize opacity-80">
                                                    {page.sentiment}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </motion.div>
        );
    }
);

SentimentAnalysisDisplay.displayName = "SentimentAnalysisDisplay";

// Summary Display Component
export const SummaryDisplay = memo(({ result }: { result: PdfAnalysisResult }) => {
    return (
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            {/* Combined Summary */}
            {result.combined_analysis?.summary && (
                <Card className="border border-white/20 bg-black">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <Sparkles className="h-5 w-5 text-indigo-400" />
                            Document Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-xl bg-black p-4">
                            <p className="text-gray-200 leading-relaxed">
                                {result.combined_analysis.summary}
                            </p>
                        </div>
                        <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                            <span>Length: {result.combined_analysis.total_text_length} characters</span>
                            <Separator orientation="vertical" className="h-4 bg-white/20" />
                            <span>Pages: {result.total_pages}</span>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Individual Page Summaries */}
            {result.individual_analysis && result.individual_analysis.length > 0 && (
                <Card className="border border-white/20 bg-black">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <FileText className="h-5 w-5 text-indigo-400" />
                            Page Summaries
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {result.individual_analysis
                                .filter((page) => page.summary)
                                .map((page, index) => (
                                    <motion.div
                                        key={`${page.page}-${index}`}
                                        className="rounded-lg border border-white/20 bg-black p-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="mb-2 flex items-center gap-2">
                                            <Badge variant="outline" className="text-indigo-400 border-indigo-400/50">
                                                Page {page.page}
                                            </Badge>
                                            <span className="text-xs text-gray-400">
                                                {page.full_text_length} characters
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-200 leading-relaxed">
                                            {page.summary && page.summary.startsWith('Text too short for summarization')
                                                ? page.text || ''
                                                : page.summary}
                                        </p>
                                    </motion.div>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </motion.div>
    );
});

SummaryDisplay.displayName = "SummaryDisplay";

// Entity Recognition Display Component
export const EntityDisplay = memo(({ result }: { result: PdfAnalysisResult }) => {
    const getEntityIcon = (entityType: string) => {
        switch (entityType.toUpperCase()) {
            case "PERSON":
                return User;
            case "ORG":
            case "ORGANIZATION":
                return Building;
            case "GPE":
            case "LOCATION":
                return MapPin;
            case "DATE":
                return Calendar;
            default:
                return Tag;
        }
    };

    const getEntityColor = (entityType: string) => {
        return "text-white bg-black border border-white/20";
    };

    return (
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            {/* Top Entities from Combined Analysis */}
            {result.combined_analysis?.top_entities && (
                <Card className="border border-white/20 bg-black">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <Hash className="h-5 w-5 text-emerald-400" />
                            Top Entities
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {result.combined_analysis.top_entities.slice(0, 10).map(([entity, count], index) => (
                                <motion.div
                                    key={entity}
                                    className="flex items-center justify-between rounded-lg bg-black p-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-emerald-500/20 p-2">
                                            <Tag className="h-4 w-4 text-emerald-400" />
                                        </div>
                                        <span className="font-medium text-white">{entity}</span>
                                    </div>
                                    <Badge variant="outline" className="text-emerald-400 border-emerald-400/50">
                                        {count}
                                    </Badge>
                                </motion.div>
                            ))}
                        </div>
                        {result.combined_analysis.total_entities && (
                            <div className="mt-4 text-center text-sm text-gray-400">
                                Total entities found: {result.combined_analysis.total_entities}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Individual Page Entities */}
            {result.individual_analysis && result.individual_analysis.length > 0 && (
                <Card className="border border-white/20 bg-black">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <Users className="h-5 w-5 text-emerald-400" />
                            Entities by Page
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {result.individual_analysis
                                .filter((page) => page.entities && page.entities.length > 0)
                                .map((page, pageIndex) => (
                                    <motion.div
                                        key={`${page.page}-${pageIndex}`}
                                        className="rounded-lg border border-white/20 bg-black p-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: pageIndex * 0.1 }}
                                    >
                                        <div className="mb-3 flex items-center gap-2">
                                            <Badge variant="outline" className="text-emerald-400 border-emerald-400/50">
                                                Page {page.page}
                                            </Badge>
                                            <span className="text-xs text-gray-400">
                                                {page.entities?.length} entities
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {page.entities?.map(([entity, entityType], entityIndex) => {
                                                const Icon = getEntityIcon(entityType);
                                                return (
                                                    <motion.div
                                                        key={`${entity}-${entityIndex}`}
                                                        className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-xs ${getEntityColor(
                                                            entityType
                                                        )}`}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: entityIndex * 0.02 }}
                                                    >
                                                        <Icon className="h-3 w-3" />
                                                        <span>{entity}</span>
                                                        <span className="text-xs opacity-70">({entityType})</span>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </motion.div>
    );
});

EntityDisplay.displayName = "EntityDisplay";

// Word Cloud Display Component
export const WordCloudDisplay = memo(({ result }: { result: PdfAnalysisResult }) => {
    if (!result.combined_analysis?.wordcloud) {
        return null;
    }

    // If the backend already returns a data:image/png;base64,... string, use it directly
    // Otherwise, fallback to prepending the prefix
    let wordcloudSrc = result.combined_analysis.wordcloud;
    if (!wordcloudSrc.startsWith('data:image')) {
        wordcloudSrc = `data:image/png;base64,${wordcloudSrc}`;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <Card className="border border-white/20 bg-black">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Cloud className="h-5 w-5 text-white" />
                        Word Cloud
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-xl bg-black p-4">
                        <div className="flex justify-center">
                            <img
                                src={wordcloudSrc}
                                alt="Word Cloud"
                                className="max-h-96 w-auto rounded-lg"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
});

WordCloudDisplay.displayName = "WordCloudDisplay";

// Export Data Component
export const ExportOptions = memo(({ result }: { result: PdfAnalysisResult }) => {
    const downloadResults = () => {
        const dataStr = JSON.stringify(result, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${result.filename.replace(".pdf", "")}_analysis.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <Card className="border border-white/20 bg-black">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Download className="h-5 w-5 text-gray-400" />
                        Export Results
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Button
                            onClick={downloadResults}
                            variant="outline"
                            className="border border-white/20 bg-black text-white hover:bg-neutral-900"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download JSON
                        </Button>
                        <Button
                            variant="outline"
                            className="border border-white/20 bg-black text-white opacity-60"
                            disabled
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Export PDF Report
                            <span className="ml-2 text-xs opacity-60">(Coming Soon)</span>
                        </Button>
                    </div>
                    <div className="mt-4 text-xs text-gray-400">
                        Analysis completed on {new Date(result.timestamp).toLocaleString()}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
});

ExportOptions.displayName = "ExportOptions";