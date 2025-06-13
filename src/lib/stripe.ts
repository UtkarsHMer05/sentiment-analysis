// lib/stripe.ts
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
  typescript: true,
});

export const PRICING_PLANS = {
  basic: {
    name: "Basic",
    price: 9.99,
    priceId: "price_basic_monthly", // Replace with your actual Stripe price ID
    requests: 30,
    features: [
      "30 video analyses",
      "Basic sentiment detection",
      "Email support",
    ],
  },
  pro: {
    name: "Pro",
    price: 29.99,
    priceId: "price_pro_monthly", // Replace with your actual Stripe price ID
    requests: 100,
    features: [
      "100 video analyses",
      "Advanced sentiment detection",
      "Priority support",
      "API access",
    ],
  },
  premium: {
    name: "Premium",
    price: 99.99,
    priceId: "price_premium_monthly", // Replace with your actual Stripe price ID
    requests: 500,
    features: [
      "500 video analyses",
      "Real-time processing",
      "24/7 support",
      "Custom integrations",
    ],
  },
} as const;

export type PlanType = keyof typeof PRICING_PLANS;
