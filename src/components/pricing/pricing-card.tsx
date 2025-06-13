// components/pricing/pricing-card.tsx
import { Check, Sparkles } from "lucide-react";
import { PRICING_PLANS } from "~/lib/stripe";

interface PricingCardProps {
  plan: (typeof PRICING_PLANS)[keyof typeof PRICING_PLANS];
  planType: keyof typeof PRICING_PLANS;
  onGetStarted: () => void;
  loading: boolean;
  isPopular?: boolean;
}

export function PricingCard({
  plan,
  planType,
  onGetStarted,
  loading,
  isPopular,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl bg-white p-8 shadow-xl ${isPopular ? "scale-105 ring-2 ring-purple-500" : ""} transition-all duration-300 hover:shadow-2xl`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
          <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-sm font-medium text-white">
            <Sparkles className="h-4 w-4" />
            Most Popular
          </div>
        </div>
      )}

      <div className="mb-8 text-center">
        <h3 className="mb-2 text-2xl font-bold text-gray-900">{plan.name}</h3>
        <div className="flex items-center justify-center gap-1">
          <span className="text-4xl font-bold text-gray-900">
            ${plan.price}
          </span>
          <span className="text-gray-500">/month</span>
        </div>
        <p className="mt-2 text-gray-600">{plan.requests} video analyses</p>
      </div>

      <ul className="mb-8 space-y-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onGetStarted}
        disabled={loading}
        className={`w-full rounded-lg px-6 py-3 font-medium transition-all duration-200 ${
          isPopular
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
            : "bg-gray-900 text-white hover:bg-gray-800"
        } disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Processing...
          </div>
        ) : (
          "Get Started"
        )}
      </button>
    </div>
  );
}
