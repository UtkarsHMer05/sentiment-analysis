import { Suspense } from "react";
import Pricing from "~/sections/pricing";

function PricingFallback() {
  return (
    <section className="relative overflow-hidden pb-32">
      <div className="container">
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-blue-950/60 to-purple-950/80 p-8 shadow-2xl backdrop-blur-sm md:p-12">
          <div className="flex justify-center">
            <div className="animate-pulse h-64 w-full max-w-5xl bg-white/10 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<PricingFallback />}>
      <Pricing />
    </Suspense>
  );
}
