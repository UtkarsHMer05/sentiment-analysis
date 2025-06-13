"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerUser } from "~/actions/auth";
import logoImage from "~/assets/images/logo.svg";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Zap,
  Shield,
  Globe,
  Clock,
  BarChart3,
  Users,
  TrendingUp,
  Brain,
  Activity,
  Sparkles,
  Check,
  X,
} from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
type RegisterUserData = {
  name: string;
  email: string;
  password: string;
};
// Enhanced signup schema with password confirmation
const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupSchema = z.infer<typeof signupSchema>;

// Password strength evaluation function
const evaluatePasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score < 3)
    return { strength: "Weak", color: "text-red-400", bgColor: "bg-red-400" };
  if (score < 4)
    return {
      strength: "Medium",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400",
    };
  if (score < 5)
    return {
      strength: "Strong",
      color: "text-green-400",
      bgColor: "bg-green-400",
    };
  return {
    strength: "Very Strong",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400",
  };
};

// Password requirements component
const PasswordRequirements = ({ password }: { password: string }) => {
  const requirements = [
    { text: "At least 8 characters", test: password.length >= 8 },
    { text: "Contains lowercase letter", test: /[a-z]/.test(password) },
    { text: "Contains uppercase letter", test: /[A-Z]/.test(password) },
    { text: "Contains number", test: /[0-9]/.test(password) },
    { text: "Contains special character", test: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1">
      {requirements.map((req, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex items-center gap-2 text-xs ${
            req.test ? "text-green-400" : "text-gray-400"
          }`}
        >
          {req.test ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
          {req.text}
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced features for signup page with vibrant colors
const signupFeatures = [
  { name: "Instant Setup", icon: Zap, color: "text-yellow-400" },
  { name: "Secure Account", icon: Shield, color: "text-emerald-400" },
  { name: "Global Access", icon: Globe, color: "text-blue-400" },
  { name: "Real-time AI", icon: Clock, color: "text-purple-400" },
  { name: "Advanced Analytics", icon: BarChart3, color: "text-pink-400" },
  { name: "Team Collaboration", icon: Users, color: "text-cyan-400" },
];

// Updated testimonials data with proper typing and profile images
interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
  rating: number;
  img: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Data Scientist",
    company: "TechCorp",
    text: "Layers transformed our sentiment analysis workflow. The accuracy is incredible!",
    avatar: "SC",
    rating: 5,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    name: "Marcus Rodriguez",
    role: "ML Engineer",
    company: "DataFlow",
    text: "Best AI platform I've used. The real-time processing is game-changing.",
    avatar: "MR",
    rating: 5,
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Emily Watson",
    role: "Product Manager",
    company: "InnovateLab",
    text: "Incredible results with minimal setup time. Highly recommend!",
    avatar: "EW",
    rating: 5,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    name: "David Kim",
    role: "CTO",
    company: "StartupXYZ",
    text: "The sentiment analysis accuracy exceeded our expectations by far.",
    avatar: "DK",
    rating: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    name: "Lisa Chang",
    role: "Product Designer",
    company: "DesignFlow",
    text: "The user interface is intuitive and the results are consistently accurate.",
    avatar: "LC",
    rating: 5,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  },
  {
    name: "Alex Thompson",
    role: "Software Engineer",
    company: "TechStart",
    text: "Integration was seamless and the API documentation is excellent.",
    avatar: "AT",
    rating: 5,
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
];

// Pre-generated animation data to prevent hydration issues
const generateFloatingElements = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 3 + (i % 5),
    initialX: (i * 23.7) % 100,
    initialY: (i * 31.3) % 100,
    duration: 20 + (i % 15),
    delay: i * 0.8,
    opacity: 0.3 + (i % 3) * 0.2,
  }));
};

const generateOrbData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 80 + ((i * 40) % 160),
    x: (i * 37.5) % 100,
    y: (i * 47.3) % 100,
    duration: 25 + (i % 20),
    delay: i * 3,
  }));
};

const generateEmojiData = (count: number) => {
  const emojis = ["😊", "😢", "😠", "😮", "😐", "🤔", "💡", "🚀", "⭐", "🎯"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: emojis[i % emojis.length],
    x: (i * 13.7) % 100,
    y: (i * 19.3) % 100,
    scale: 0.8 + (i % 3) * 0.3,
    duration: 4 + (i % 6),
    delay: i * 0.5,
  }));
};

const generateGraphData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    height: 20 + ((i * 15) % 60),
    x: (i * 25.3) % 100,
    y: (i * 33.7) % 100,
    duration: 3 + (i % 4),
    delay: i * 0.2,
  }));
};

// Static data
const floatingElements = generateFloatingElements(35);
const orbData = generateOrbData(8);
const emojiData = generateEmojiData(15);
const graphData = generateGraphData(15);

// Enhanced Background Animations with vibrant gradients
const EnhancedBackgroundAnimations = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Vibrant Dynamic Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-20"
        animate={{
          background: [
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #e94560 100%)",
            "linear-gradient(135deg, #16213e 0%, #0f3460 25%, #533483 50%, #e94560 75%, #1a1a2e 100%)",
            "linear-gradient(135deg, #0f3460 0%, #533483 25%, #e94560 50%, #1a1a2e 75%, #16213e 100%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Vibrant Floating Orbs */}
      {orbData.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-2xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Elements with vibrant colors */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-cyan-400/40 to-purple-500/40"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.initialX}%`,
            top: `${element.initialY}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 30, 0],
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [element.opacity, element.opacity * 2, element.opacity],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Rotating Emojis in Circular Motion */}
      {emojiData.map((emoji) => (
        <motion.div
          key={emoji.id}
          className="absolute text-3xl"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [0, emoji.scale, 0],
            opacity: [0, 1, 0],
            x: [0, 50 * Math.cos((emoji.id * Math.PI) / 6), 0],
            y: [0, 50 * Math.sin((emoji.id * Math.PI) / 6), 0],
          }}
          transition={{
            duration: emoji.duration,
            repeat: Infinity,
            delay: emoji.delay,
            ease: "easeInOut",
          }}
        >
          {emoji.emoji}
        </motion.div>
      ))}

      {/* Animated Graph Elements */}
      {graphData.map((graph) => (
        <motion.div
          key={graph.id}
          className="absolute"
          style={{
            left: `${graph.x}%`,
            top: `${graph.y}%`,
          }}
        >
          <motion.div
            className="flex items-end gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{
              duration: graph.duration,
              repeat: Infinity,
              delay: graph.delay,
            }}
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 rounded-t bg-gradient-to-t from-purple-400 to-pink-400"
                animate={{
                  height: [5, graph.height + i * 8, 5],
                }}
                transition={{
                  duration: graph.duration,
                  repeat: Infinity,
                  delay: graph.delay + i * 0.1,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      ))}

      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_#8b5cf6_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_#ec4899_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>
    </>
  );
};

// Enhanced Features Display
const AnimatedSignupFeatures = () => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {signupFeatures.map((feature, index) => (
        <motion.div
          key={feature.name}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{
            scale: 1.08,
            y: -5,
            boxShadow: "0 15px 25px -5px rgba(139, 92, 246, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            delay: index * 0.1,
            duration: 0.6,
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="group flex cursor-pointer flex-col items-center rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-pink-900/40 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50"
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6 }}
            className="mb-2"
          >
            <feature.icon className={`h-6 w-6 ${feature.color}`} />
          </motion.div>
          <span className="text-xs font-semibold text-white transition-colors duration-300 group-hover:text-purple-200">
            {feature.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

// Bottom Testimonials Component
const BottomTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  if (!currentTestimonial) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-6 left-6 right-6 z-40"
    >
      <div className="mx-auto max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-900/80 to-pink-900/80 p-4 backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <motion.div
                  className="h-12 w-12 overflow-hidden rounded-full border-2 border-purple-400/50"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={currentTestimonial.img}
                    alt={`${currentTestimonial.name}'s profile picture`}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="flex h-full w-full items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white">
                            ${currentTestimonial.avatar}
                          </div>
                        `;
                      }
                    }}
                  />
                </motion.div>
              </div>

              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    {currentTestimonial.name}
                  </span>
                  <span className="text-xs text-purple-200">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </span>
                  <div className="flex gap-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-xs text-yellow-400"
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-purple-100">
                  "{currentTestimonial.text}"
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-3 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${
                index === currentIndex ? "bg-purple-400" : "bg-gray-600"
              }`}
              whileHover={{ scale: 1.1 }}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    strength: "Weak",
    color: "text-red-400",
    bgColor: "bg-red-400",
  });

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch form values
  const nameValue = form.watch("name");
  const emailValue = form.watch("email");
  const passwordValue = form.watch("password");
  const confirmPasswordValue = form.watch("confirmPassword");

  // Update password strength when password changes
  useEffect(() => {
    if (passwordValue) {
      setPasswordStrength(evaluatePasswordStrength(passwordValue));
    }
  }, [passwordValue]);

  // Clear error when form values change
  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [nameValue, emailValue, passwordValue, confirmPasswordValue, error]);

  async function onSubmit(data: SignupSchema) {
    try {
      setLoading(true);
      setError("");

      // Check password strength before allowing signup
      const strength = evaluatePasswordStrength(data.password);
      if (strength.strength === "Weak" || strength.strength === "Medium") {
        setError(
          "Password strength is too low. Please create a stronger password to continue.",
        );
        setLoading(false);
        return;
      }

      console.log("🔄 Attempting signup with:", {
        email: data.email,
        name: data.name,
      });

      // ✅ FIXED: Only pass the fields that registerUser expects
      const registerData: RegisterUserData = {
        name: data.name,
        email: data.email,
        password: data.password,
        // Don't include confirmPassword - it's only for form validation
      };

      const result = await registerUser(registerData);

      if (result.error) {
        console.log("❌ Signup error:", result.error);
        setError(result.error);
      } else if (result.success) {
        console.log("✅ Signup successful, showing success animation...");
        setSuccess(true);

        // Check if user came from pricing page
        const redirect = searchParams.get("redirect");
        const plan = searchParams.get("plan");

        setTimeout(() => {
          if (redirect === "pricing" && plan) {
            // Redirect to login page with plan info to continue payment flow
            router.push(`/login?redirect=pricing&plan=${plan}`);
          } else {
            // Normal redirect to login
            router.push("/login");
          }
        }, 2000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("🚨 Signup error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  // Success Screen
  if (success) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <EnhancedBackgroundAnimations />
        <div className="flex min-h-screen items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-purple-500"
            >
              <CheckCircle className="h-10 w-10 text-white" />
            </motion.div>
            <motion.h2
              className="mb-2 text-3xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to Layers!
            </motion.h2>
            <motion.p
              className="text-purple-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {searchParams.get("redirect") === "pricing"
                ? "Redirecting to login to continue with your plan..."
                : "Account created successfully! Redirecting to login..."}
            </motion.p>
            <motion.div
              className="mt-4 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-2 w-2 rounded-full bg-emerald-400"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background Animations */}
      <EnhancedBackgroundAnimations />

      {/* Clickable Floating Logo in Top Right Corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="fixed right-6 top-6 z-50"
      >
        <Link href="/">
          <motion.div
            className="cursor-pointer rounded-full border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/80 to-pink-900/80 p-4 backdrop-blur-md"
            whileHover={{
              scale: 1.1,
              rotate: 360,
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <Image src={logoImage} alt="Layers logo" className="h-10 w-10" />
          </motion.div>
        </Link>
      </motion.div>

      {/* Split Screen Layout */}
      <div className="relative flex min-h-screen">
        {/* Left Side - Enhanced Visual Content */}
        <div className="relative hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-12">
          {/* Content */}
          <div className="relative z-10 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <motion.h1
                className="mb-6 text-6xl font-bold text-white"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(139, 92, 246, 0.5)",
                    "0 0 40px rgba(139, 92, 246, 0.8)",
                    "0 0 20px rgba(139, 92, 246, 0.5)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Join{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Layers
                </span>{" "}
                Today
              </motion.h1>
              <motion.p
                className="mb-8 text-2xl text-purple-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Start your AI sentiment analysis journey
              </motion.p>
            </motion.div>

            {/* Enhanced Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <h3 className="mb-6 text-xl font-semibold text-white">
                What You'll Get
              </h3>
              <AnimatedSignupFeatures />
            </motion.div>

            {/* Animated Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-1 gap-6 pt-8"
            >
              {[
                {
                  title: "Free 10 API Calls",
                  description: "Start analyzing immediately",
                  icon: Sparkles,
                  color: "text-yellow-400",
                },
                {
                  title: "Advanced AI Models",
                  description: "State-of-the-art sentiment analysis",
                  icon: Brain,
                  color: "text-purple-400",
                },
                {
                  title: "Real-time Processing",
                  description: "Get instant results",
                  icon: Activity,
                  color: "text-emerald-400",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="flex items-center gap-4 rounded-xl border border-purple-500/20 bg-purple-900/20 p-4 backdrop-blur-sm"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.2 }}
                >
                  <motion.div
                    className={`rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-purple-300">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Side - Enhanced Signup Form */}
        <div className="relative flex flex-1 items-center justify-center px-4 lg:px-12">
          {/* Additional background effects for right side */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative z-10 w-full max-w-md space-y-8"
          >
            <div className="text-center">
              <motion.h2
                className="text-4xl font-bold text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Create your account
              </motion.h2>
              <motion.p
                className="mt-2 text-lg text-purple-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {searchParams.get("plan")
                  ? `Get started with ${searchParams.get("plan")} plan`
                  : "Join thousands of satisfied users"}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 shadow-2xl backdrop-blur-xl"
            >
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/20 p-4 text-sm text-red-200"
                  >
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}

                <div className="space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <motion.label
                      className={`absolute left-12 z-10 transition-all duration-300 ${
                        focusedField === "name" || nameValue
                          ? "-top-2 bg-purple-900 px-2 text-xs text-purple-300"
                          : "top-3 text-sm text-gray-400"
                      }`}
                      animate={{
                        y: focusedField === "name" || nameValue ? -10 : 0,
                        scale: focusedField === "name" || nameValue ? 0.85 : 1,
                      }}
                    >
                      Full name
                    </motion.label>
                    <div className="relative">
                      <motion.input
                        {...form.register("name")}
                        type="text"
                        disabled={loading}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className="block w-full rounded-lg border border-purple-500/30 bg-purple-900/30 px-4 py-3 pl-12 text-white placeholder-transparent backdrop-blur-sm transition-all duration-300 focus:scale-[1.02] focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                        whileFocus={{ scale: 1.02 }}
                        animate={{
                          boxShadow:
                            focusedField === "name"
                              ? "0 0 20px rgba(139, 92, 246, 0.4)"
                              : "0 0 0px rgba(139, 92, 246, 0)",
                        }}
                      />
                      <User className="absolute left-3 top-3 z-20 h-5 w-5 text-purple-400" />
                    </div>
                    {form.formState.errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-300"
                      >
                        {form.formState.errors.name.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <motion.label
                      className={`absolute left-12 z-10 transition-all duration-300 ${
                        focusedField === "email" || emailValue
                          ? "-top-2 bg-purple-900 px-2 text-xs text-purple-300"
                          : "top-3 text-sm text-gray-400"
                      }`}
                      animate={{
                        y: focusedField === "email" || emailValue ? -10 : 0,
                        scale:
                          focusedField === "email" || emailValue ? 0.85 : 1,
                      }}
                    >
                      Email address
                    </motion.label>
                    <div className="relative">
                      <motion.input
                        {...form.register("email")}
                        type="email"
                        disabled={loading}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="block w-full rounded-lg border border-purple-500/30 bg-purple-900/30 px-4 py-3 pl-12 text-white placeholder-transparent backdrop-blur-sm transition-all duration-300 focus:scale-[1.02] focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                        whileFocus={{ scale: 1.02 }}
                        animate={{
                          boxShadow:
                            focusedField === "email"
                              ? "0 0 20px rgba(139, 92, 246, 0.4)"
                              : "0 0 0px rgba(139, 92, 246, 0)",
                        }}
                      />
                      <Mail className="absolute left-3 top-3 z-20 h-5 w-5 text-purple-400" />
                    </div>
                    {form.formState.errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-300"
                      >
                        {form.formState.errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <motion.label
                      className={`absolute left-12 z-10 transition-all duration-300 ${
                        focusedField === "password" || passwordValue
                          ? "-top-2 bg-purple-900 px-2 text-xs text-purple-300"
                          : "top-3 text-sm text-gray-400"
                      }`}
                      animate={{
                        y:
                          focusedField === "password" || passwordValue
                            ? -10
                            : 0,
                        scale:
                          focusedField === "password" || passwordValue
                            ? 0.85
                            : 1,
                      }}
                    >
                      Password
                    </motion.label>
                    <div className="relative">
                      <motion.input
                        {...form.register("password")}
                        type={showPassword ? "text" : "password"}
                        disabled={loading}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        className="block w-full rounded-lg border border-purple-500/30 bg-purple-900/30 px-4 py-3 pl-12 pr-12 text-white placeholder-transparent backdrop-blur-sm transition-all duration-300 focus:scale-[1.02] focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                        whileFocus={{ scale: 1.02 }}
                        animate={{
                          boxShadow:
                            focusedField === "password"
                              ? "0 0 20px rgba(139, 92, 246, 0.4)"
                              : "0 0 0px rgba(139, 92, 246, 0)",
                        }}
                      />
                      <Lock className="absolute left-3 top-3 z-20 h-5 w-5 text-purple-400" />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 z-20 text-purple-400 hover:text-purple-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          animate={{ rotate: showPassword ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </motion.div>
                      </motion.button>
                    </div>

                    {/* Password Strength Indicator */}
                    {passwordValue && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2"
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            Password Strength:
                          </span>
                          <span
                            className={`text-xs font-semibold ${passwordStrength.color}`}
                          >
                            {passwordStrength.strength}
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-700">
                          <motion.div
                            className={`h-full rounded-full ${passwordStrength.bgColor}`}
                            initial={{ width: 0 }}
                            animate={{
                              width:
                                passwordStrength.strength === "Weak"
                                  ? "25%"
                                  : passwordStrength.strength === "Medium"
                                    ? "50%"
                                    : passwordStrength.strength === "Strong"
                                      ? "75%"
                                      : "100%",
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <PasswordRequirements password={passwordValue} />
                      </motion.div>
                    )}

                    {form.formState.errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-300"
                      >
                        {form.formState.errors.password.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="relative">
                    <motion.label
                      className={`absolute left-12 z-10 transition-all duration-300 ${
                        focusedField === "confirmPassword" ||
                        confirmPasswordValue
                          ? "-top-2 bg-purple-900 px-2 text-xs text-purple-300"
                          : "top-3 text-sm text-gray-400"
                      }`}
                      animate={{
                        y:
                          focusedField === "confirmPassword" ||
                          confirmPasswordValue
                            ? -10
                            : 0,
                        scale:
                          focusedField === "confirmPassword" ||
                          confirmPasswordValue
                            ? 0.85
                            : 1,
                      }}
                    >
                      Confirm Password
                    </motion.label>
                    <div className="relative">
                      <motion.input
                        {...form.register("confirmPassword")}
                        type={showConfirmPassword ? "text" : "password"}
                        disabled={loading}
                        onFocus={() => setFocusedField("confirmPassword")}
                        onBlur={() => setFocusedField(null)}
                        className="block w-full rounded-lg border border-purple-500/30 bg-purple-900/30 px-4 py-3 pl-12 pr-12 text-white placeholder-transparent backdrop-blur-sm transition-all duration-300 focus:scale-[1.02] focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                        whileFocus={{ scale: 1.02 }}
                        animate={{
                          boxShadow:
                            focusedField === "confirmPassword"
                              ? "0 0 20px rgba(139, 92, 246, 0.4)"
                              : "0 0 0px rgba(139, 92, 246, 0)",
                        }}
                      />
                      <Lock className="absolute left-3 top-3 z-20 h-5 w-5 text-purple-400" />
                      <motion.button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-3 z-20 text-purple-400 hover:text-purple-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          animate={{ rotate: showConfirmPassword ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </motion.div>
                      </motion.button>
                    </div>
                    {form.formState.errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-300"
                      >
                        {form.formState.errors.confirmPassword.message}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Enhanced Submit Button */}
                <motion.button
                  type="submit"
                  disabled={
                    loading ||
                    (!!passwordValue &&
                      (passwordStrength.strength === "Weak" ||
                        passwordStrength.strength === "Medium"))
                  }
                  className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500 px-4 py-4 text-lg font-semibold text-white transition-all duration-300 hover:from-emerald-400 hover:via-purple-400 hover:to-pink-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: loading
                      ? "0 0 30px rgba(139, 92, 246, 0.7)"
                      : "0 5px 20px rgba(139, 92, 246, 0.4)",
                  }}
                >
                  {loading && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: [-100, 400] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                        />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5" />
                        {!!passwordValue &&
                        (passwordStrength.strength === "Weak" ||
                          passwordStrength.strength === "Medium")
                          ? "Password Too Weak"
                          : searchParams.get("plan")
                            ? "Create Account & Continue"
                            : "Create Account"}
                      </>
                    )}
                  </span>
                </motion.button>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center text-sm text-purple-200"
                >
                  Already have an account?{" "}
                  <Link
                    className="font-medium text-purple-400 transition-colors hover:text-purple-300"
                    href={`/login${
                      searchParams.get("redirect") && searchParams.get("plan")
                        ? `?redirect=${searchParams.get("redirect")}&plan=${searchParams.get("plan")}`
                        : ""
                    }`}
                  >
                    Sign in
                  </Link>
                </motion.p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Testimonials */}
      <BottomTestimonials />
    </div>
  );
}
