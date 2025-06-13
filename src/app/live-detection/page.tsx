import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import LiveEmotionCapture from "~/components/LiveEmotionCapture";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Emotion Detection - Sentiment Analysis",
  description:
    "Real-time emotion and sentiment analysis with live transcription",
};

export default async function LiveDetectionPage() {
  // Check authentication
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen">
      <LiveEmotionCapture />
    </main>
  );
}
