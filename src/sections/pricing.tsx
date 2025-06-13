// src/sections/pricing.tsx
"use client";

import { Check } from "lucide-react";
import React, { useMemo, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { CardSpotlight } from "~/components/ui/card-spotlight";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn, User, AlertTriangle } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$19",
    priceId: "price_1RU3xjAcQYldD2xkBylzOt30",
    quota: 30,
    features: [
      "Slower Training",
      "5,000 MB Data Training",
      "Basic Templates",
      "Standard Support",
      "Basic Analytics",
    ],
  },
  {
    name: "Professional",
    price: "$49",
    priceId: "price_1RU3ysAcQYldD2xkdr5dnFPl",
    quota: 100,
    popular: true,
    features: [
      "Faster Active Training",
      "50,000 MB Data Training",
      "Advanced Templates",
      "Priority Support",
      "Advanced Analytics",
      "AI-Powered Features",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceId: null,
    quota: 1000,
    features: [
      "Custom Training Speed",
      "Unlimited Data Training",
      "Dedicated Account Manager",
      "SLA Guarantee",
      "Custom Integrations",
      "Custom AI Training",
    ],
  },
];

const generateRandomGradient = () => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = 300 + Math.random() * 500;
  const opacity = 0.2 + Math.random() * 0.4;

  return `radial-gradient(circle ${size}px at ${x}% ${y}%, rgba(59, 130, 246, ${opacity}) 0%, transparent 70%)`;
};

// Quota Stacking Confirmation Modal - FIXED TYPE
const QuotaStackingModal = ({
  isOpen,
  onClose,
  onConfirm,
  selectedPlan,
  currentQuota,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedPlan?: (typeof plans)[0] | null;
  currentQuota?: { maxRequests: number; requestsUsed: number } | null; // FIXED: Added | null
}) => {
  if (!selectedPlan || !currentQuota) return null;

  const remainingQuota = currentQuota.maxRequests - currentQuota.requestsUsed;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative mx-4 w-full max-w-md rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-900/90 to-red-900/90 p-8 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white/70 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500"
              >
                <AlertTriangle className="h-8 w-8 text-white" />
              </motion.div>

              <h3 className="mb-2 text-2xl font-bold text-white">
                You Already Have Quota!
              </h3>
              <p className="mb-4 text-orange-200">
                You currently have{" "}
                <span className="font-bold text-white">{remainingQuota}</span>{" "}
                API calls remaining.
              </p>

              <div className="mb-6 rounded-lg border border-orange-400/30 bg-orange-500/20 p-4">
                <p className="mb-2 text-sm text-orange-200">
                  Purchasing {selectedPlan.name} plan will:
                </p>
                <p className="text-lg font-semibold text-white">
                  Add {selectedPlan.quota} more API calls
                </p>
                <p className="mt-1 text-sm text-orange-300">
                  Total: {remainingQuota + selectedPlan.quota} API calls
                </p>
              </div>

              <p className="mb-6 text-sm text-orange-200">
                Are you sure you want to purchase additional quota?
              </p>

              <div className="space-y-3">
                <button
                  onClick={onConfirm}
                  className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-orange-400 hover:to-red-400 hover:shadow-lg"
                >
                  Yes, Add More Quota
                </button>

                <button
                  onClick={onClose}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                >
                  No, Keep Current Plan
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Login Modal Component
const LoginModal = ({
  isOpen,
  onClose,
  selectedPlan,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: (typeof plans)[0] | null;
}) => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    if (selectedPlan) {
      localStorage.setItem(
        "selectedPlan",
        JSON.stringify({
          name: selectedPlan.name,
          priceId: selectedPlan.priceId,
          price: selectedPlan.price,
          quota: selectedPlan.quota,
        }),
      );
    }
    router.push(
      "/login?redirect=pricing&plan=" +
        (selectedPlan?.name.toLowerCase() || ""),
    );
  };

  const handleSignupRedirect = () => {
    if (selectedPlan) {
      localStorage.setItem(
        "selectedPlan",
        JSON.stringify({
          name: selectedPlan.name,
          priceId: selectedPlan.priceId,
          price: selectedPlan.price,
          quota: selectedPlan.quota,
        }),
      );
    }
    router.push(
      "/signup?redirect=pricing&plan=" +
        (selectedPlan?.name.toLowerCase() || ""),
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative mx-4 w-full max-w-md rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/90 to-pink-900/90 p-8 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white/70 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <User className="h-8 w-8 text-white" />
              </motion.div>

              <h3 className="mb-2 text-2xl font-bold text-white">
                Sign in Required
              </h3>
              <p className="mb-4 text-purple-200">
                Please sign in to your account to continue with your
                subscription
              </p>

              {selectedPlan && (
                <div className="mb-6 rounded-lg border border-purple-400/30 bg-purple-500/20 p-3">
                  <p className="text-sm text-purple-200">Selected Plan:</p>
                  <p className="text-lg font-semibold text-white">
                    {selectedPlan.name}
                  </p>
                  <p className="text-sm text-purple-300">
                    {selectedPlan.quota} API calls/month
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={handleLoginRedirect}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-purple-400 hover:to-pink-400 hover:shadow-lg"
                >
                  <LogIn className="h-5 w-5" />
                  Sign In
                </button>

                <div className="text-center text-sm text-purple-200">
                  Don't have an account?{" "}
                  <button
                    onClick={handleSignupRedirect}
                    className="font-medium text-purple-400 hover:text-purple-300"
                  >
                    Sign up here
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Pricing() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedPlanForLogin, setSelectedPlanForLogin] = useState<
    (typeof plans)[0] | null
  >(null);
  const [currentUserQuota, setCurrentUserQuota] = useState<{
    maxRequests: number;
    requestsUsed: number;
  } | null>(null);

  // Fix hydration by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch current user quota when logged in
  useEffect(() => {
    if (session?.user?.id) {
      fetchUserQuota();
    }
  }, [session]);

  const fetchUserQuota = async () => {
    try {
      const response = await fetch("/api/user/quota");
      if (response.ok) {
        const quota = await response.json();
        setCurrentUserQuota(quota);
      }
    } catch (error) {
      console.error("Failed to fetch user quota:", error);
    }
  };

  const cardGradients = useMemo(() => {
    if (!isClient) return plans.map(() => "");

    return plans.map(() => {
      const numGradients = 1 + Math.floor(Math.random() * 3);
      const gradients = Array(numGradients).fill(0).map(generateRandomGradient);
      return gradients.join(", ");
    });
  }, [isClient]);

  // Function to handle Stripe checkout
  const handleStripeCheckout = async (
    priceId: string,
    planName: string,
    isStacking = false,
  ) => {
    try {
      setLoadingPlan(planName);

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          planName,
          userId: session?.user?.id,
          isStacking, // Pass stacking flag
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Checkout error:", errorData);
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Stripe checkout error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Failed to start checkout: ${errorMessage}. Please try again.`);
    } finally {
      setLoadingPlan(null);
    }
  };

  // Check for stored plan after login
  useEffect(() => {
    if (session && isClient) {
      const storedPlan = localStorage.getItem("selectedPlan");
      if (storedPlan) {
        try {
          const plan = JSON.parse(storedPlan);
          localStorage.removeItem("selectedPlan");

          console.log(`Proceeding with ${plan.name} plan...`);

          if (plan.priceId) {
            setTimeout(() => {
              handleStripeCheckout(plan.priceId, plan.name);
            }, 1000);
          }
        } catch (error) {
          console.error("Error parsing stored plan:", error);
        }
      }
    }
  }, [session, isClient]);

  const handleContactSales = () => {
    if (!session) {
      setSelectedPlanForLogin(
        plans.find((p) => p.name === "Enterprise") || null,
      );
      setShowLoginModal(true);
      return;
    }
    router.push("/contact");
  };

  const handleGetStarted = (plan: (typeof plans)[0]) => {
    if (!session) {
      setSelectedPlanForLogin(plan);
      setShowLoginModal(true);
      return;
    }

    if (plan.price === "Custom") {
      handleContactSales();
      return;
    }

    // Check if user has existing quota
    if (currentUserQuota && currentUserQuota.maxRequests > 10) {
      const remainingQuota =
        currentUserQuota.maxRequests - currentUserQuota.requestsUsed;
      if (remainingQuota > 0) {
        // Show quota stacking confirmation
        setSelectedPlanForLogin(plan);
        setShowQuotaModal(true);
        return;
      }
    }

    // Proceed with normal checkout
    if (plan.priceId) {
      handleStripeCheckout(plan.priceId, plan.name);
    }
  };

  const handleQuotaStackingConfirm = () => {
    setShowQuotaModal(false);
    if (selectedPlanForLogin?.priceId) {
      handleStripeCheckout(
        selectedPlanForLogin.priceId,
        selectedPlanForLogin.name,
        true,
      );
    }
  };

  // Show loading state during server-side rendering
  if (!isClient) {
    return (
      <section className="relative overflow-hidden pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e2a5e0a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(circle_at_center,_black,transparent_75%)]" />
        <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[40rem] w-[40rem] rounded-full bg-purple-600/20 blur-[128px]" />
        </div>
        <div className="container">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-blue-950/60 to-purple-950/80 p-8 shadow-2xl backdrop-blur-sm md:p-12">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,_#ffffff05_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="relative z-10">
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-neutral-900 px-3 py-1.5 md:px-5 md:py-2">
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-xl text-white">
                    &#10038;
                  </span>
                  <span className="font-medium md:text-lg">Pricing</span>
                </div>
              </div>
              <h2 className="m-auto mt-6 max-w-2xl text-center text-6xl font-medium">
                Simple, Transparent{" "}
                <span className="bg-gradient-to-r from-purple-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Pricing
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/70 md:text-xl">
                Choose the perfect plan for your AI training Quota needs
              </p>
              <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-6 md:grid-cols-3 lg:gap-8">
                {plans.map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse rounded-lg border border-white/10 bg-white/5 p-6 md:p-8"
                  >
                    <div className="h-64 rounded bg-white/10"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden pb-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e2a5e0a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(circle_at_center,_black,transparent_75%)]" />

      <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[40rem] w-[40rem] rounded-full bg-purple-600/20 blur-[128px]" />
      </div>

      <div className="container">
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-blue-950/60 to-purple-950/80 p-8 shadow-2xl backdrop-blur-sm md:p-12">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
          <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,_#ffffff05_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="relative z-10">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-neutral-900 px-3 py-1.5 transition duration-500 hover:scale-105 md:px-5 md:py-2">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-xl text-white transition duration-500">
                  &#10038;
                </span>
                <span className="font-medium md:text-lg">Pricing</span>
              </div>
            </div>

            <h2 className="m-auto mt-6 max-w-2xl text-center text-6xl font-medium">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-purple-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/70 md:text-xl">
              Choose the perfect plan for your AI training Quota needs
            </p>

            {session && (
              <div className="mx-auto mt-4 flex max-w-sm items-center justify-center gap-2 rounded-full border border-green-500/30 bg-green-500/20 px-4 py-2 text-sm text-green-300">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                Signed in as {session.user?.name || session.user?.email}
                {currentUserQuota && (
                  <span className="ml-2 text-xs">
                    (
                    {currentUserQuota.maxRequests -
                      currentUserQuota.requestsUsed}{" "}
                    quota left)
                  </span>
                )}
              </div>
            )}

            <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-6 md:grid-cols-3 lg:gap-8">
              {plans.map((plan, index) => (
                <CardSpotlight
                  key={index}
                  className={`group flex flex-col p-6 backdrop-blur-sm backdrop-saturate-150 md:p-8 ${
                    plan.popular
                      ? "scale-105 shadow-lg shadow-blue-500/20 ring-2 ring-lime-500/50"
                      : "transition-transform duration-300 hover:scale-[1.02]"
                  }`}
                  style={{
                    background: cardGradients[index],
                  }}
                  color={
                    plan.popular
                      ? "rgba(29, 78, 216, 0.55)"
                      : "rgba(59, 130, 246, 0.45)"
                  }
                >
                  <div className="flex-1">
                    {plan.popular && (
                      <span className="mb-4 inline-block rounded-full border border-lime-400/30 bg-lime-500/20 px-4 py-1 text-sm font-medium text-lime-300">
                        Most Popular
                      </span>
                    )}
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {plan.name}
                    </h3>
                    <div className="mb-4 flex items-baseline">
                      <span className="bg-gradient-to-r from-lime-400 to-white bg-clip-text text-4xl font-bold text-transparent">
                        {plan.price}
                      </span>
                      {plan.price !== "Custom" && (
                        <span className="ml-2 text-white/80">/month</span>
                      )}
                    </div>

                    {/* Quota Display */}
                    <div className="mb-6 rounded-lg border border-lime-400/20 bg-lime-500/10 p-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-lime-400">
                          {plan.quota}
                        </div>
                        <div className="text-sm text-lime-300">
                          API calls{plan.price !== "Custom" ? "/purchase" : ""}
                        </div>
                      </div>
                    </div>

                    <ul className="mb-8 space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Check className="h-5 w-5 shrink-0 text-lime-400" />
                          <span className="text-white/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <button
                      onClick={() => handleGetStarted(plan)}
                      disabled={loadingPlan === plan.name}
                      className={`relative w-full overflow-hidden rounded-lg px-6 py-4 font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                        plan.popular
                          ? "bg-lime-500 text-blue-900 shadow-lg shadow-lime-500/25 hover:bg-lime-400 hover:shadow-lime-500/40"
                          : "border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:shadow-lg"
                      }`}
                    >
                      {loadingPlan === plan.name && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: [-100, 400] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                      <span className="relative flex items-center justify-center gap-2">
                        {loadingPlan === plan.name ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                            />
                            Processing...
                          </>
                        ) : (
                          <>
                            {!session && <LogIn className="h-4 w-4" />}
                            {plan.price === "Custom"
                              ? "Contact Sales"
                              : currentUserQuota &&
                                  currentUserQuota.maxRequests > 10 &&
                                  currentUserQuota.maxRequests -
                                    currentUserQuota.requestsUsed >
                                    0
                                ? "Add More Quota"
                                : "Get Started"}
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </CardSpotlight>
              ))}
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setSelectedPlanForLogin(null);
        }}
        selectedPlan={selectedPlanForLogin}
      />

      <QuotaStackingModal
        isOpen={showQuotaModal}
        onClose={() => {
          setShowQuotaModal(false);
          setSelectedPlanForLogin(null);
        }}
        onConfirm={handleQuotaStackingConfirm}
        selectedPlan={selectedPlanForLogin}
        currentQuota={currentUserQuota}
      />
    </section>
  );
}
