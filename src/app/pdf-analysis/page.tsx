import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import PdfAnalysisCapture from "~/components/PdfAnalysisCapture";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "PDF Sentiment Analysis - Sentiment Analysis",
    description:
        "Advanced PDF document analysis with sentiment analysis, summarization, and entity recognition",
};

export default async function PdfAnalysisPage() {
    // Check authentication
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    return (
        <main className="min-h-screen">
            <PdfAnalysisCapture />
        </main>
    );
}