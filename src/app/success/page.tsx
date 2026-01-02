// app/success/page.tsx
import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

function SuccessFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="animate-pulse h-64 w-64 bg-green-100 rounded-lg" />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessFallback />}>
      <SuccessContent />
    </Suspense>
  );
}
