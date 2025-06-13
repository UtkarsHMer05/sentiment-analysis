// app/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Sparkles } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!sessionId) {
      router.push("/pricing");
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionId, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -right-32 -top-40 h-80 w-80 rounded-full bg-green-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="animate-blob animation-delay-2000 absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-blue-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="animate-blob animation-delay-4000 absolute left-40 top-40 h-80 w-80 rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
      </div>

      <div className="relative z-10 p-8 text-center">
        <div className="mb-8">
          <div className="mb-6 inline-flex h-24 w-24 animate-bounce items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>

          <h1 className="mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            Payment Successful!
          </h1>

          <p className="mx-auto mb-8 max-w-md text-xl text-gray-600">
            Your subscription has been activated. You now have access to your
            video sentiment analysis quota.
          </p>
        </div>

        <div className="mx-auto mb-8 max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-500" />
            <span className="text-lg font-semibold text-gray-900">
              Redirecting to Dashboard
            </span>
          </div>

          <div className="mb-4 text-3xl font-bold text-purple-600">
            {countdown}
          </div>

          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000"
              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 font-medium text-white transition-all duration-200 hover:from-purple-600 hover:to-blue-600"
        >
          Go to Dashboard Now
        </button>
      </div>
    </div>
  );
}
