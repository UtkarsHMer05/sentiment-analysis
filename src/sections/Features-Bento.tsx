"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import dj from "~/assets/images/dj.png";
import { BentoGrid, BentoGridItem } from "~/components/ui/bento-grid";

export function BentoGridThirdDemo() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasBeenHovered, setHasBeenHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (hasBeenHovered && isFlipped) {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (rect) {
          const isCompletelyOutOfView =
            rect.bottom < 0 || rect.top > window.innerHeight;

          if (isCompletelyOutOfView) {
            setIsFlipped(false);
            setHasBeenHovered(false);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFlipped, hasBeenHovered]);

  const handleHover = () => {
    setIsFlipped(true);
    setHasBeenHovered(true);
  };

  const handleMouseLeave = () => {
    // Don't hide on mouse leave - only hide when scrolled out of view
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative overflow-hidden"
      animate={{
        paddingTop: isFlipped ? "8rem" : "2rem",
        paddingBottom: isFlipped ? "8rem" : "2rem",
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      style={{
        zIndex: 1,
      }}
    >
      {/* Background effects with matching colors */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e2a5e0a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(circle_at_center,_black,transparent_75%)]" />

      <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[40rem] w-[40rem] rounded-full bg-purple-600/20 blur-[128px]" />
      </div>

      <div className="container">
        {/* Flip Card Container */}
        <div
          className="relative"
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: "1000px",
            zIndex: 10,
          }}
        >
          <motion.div
            className="relative w-full"
            animate={{
              rotateY: isFlipped ? 0 : 180,
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{
              transformStyle: "preserve-3d",
              position: "relative",
              zIndex: 10,
            }}
          >
            {/* Back Side (Initially Visible - Flipped State) */}
            <motion.div
              className="absolute inset-0 w-full"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: isFlipped ? 1 : 10,
              }}
            >
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-blue-950/60 to-purple-950/80 p-6 shadow-2xl backdrop-blur-sm md:p-8">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
                <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,_#ffffff05_1px,transparent_1px)] [background-size:20px_20px]"></div>

                <div className="relative z-10 flex h-48 items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="mb-4"
                    >
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                        <span className="text-2xl">🚀</span>
                      </div>
                    </motion.div>
                    <h3 className="bg-gradient-to-r from-purple-300 via-blue-400 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
                      Hover to Reveal
                    </h3>
                    <p className="mt-2 text-purple-100/70">
                      Discover our AI capabilities
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Front Side (Content - Normal State) */}
            <motion.div
              className="relative w-full"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                position: "relative",
                zIndex: isFlipped ? 10 : 1,
                minHeight: isFlipped ? "auto" : "200px",
              }}
            >
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-blue-950/60 to-purple-950/80 p-8 shadow-2xl backdrop-blur-sm md:p-12">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
                <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,_#ffffff05_1px,transparent_1px)] [background-size:20px_20px]"></div>

                <div className="relative z-20">
                  <div className="mb-20 space-y-4 text-center">
                    <h2 className="bg-gradient-to-r from-purple-300 via-blue-400 to-purple-500 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                      Supercharge Your AI Model Training
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-purple-100/90 md:text-xl">
                      Transform your data into powerful AI-driven sentiment
                      analysis models with our cutting-edge platform
                    </p>
                  </div>

                  <div style={{ position: "relative", zIndex: 30 }}>
                    {/* Updated BentoGrid with consistent heights */}
                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-3">
                      {items.map((item, i) => (
                        <div
                          key={i}
                          className={cn(
                            "flex h-80 flex-col", // Fixed height and flex layout
                            item.className,
                          )}
                          style={{ position: "relative", zIndex: 30 + i }}
                        >
                          <div className="flex h-full flex-col rounded-xl border border-white/[0.2] bg-black p-4 backdrop-blur-sm">
                            {/* Header section with fixed height */}
                            <div className="flex h-48 flex-1 items-center justify-center overflow-hidden rounded-lg">
                              {item.header}
                            </div>

                            {/* Content section with consistent spacing */}
                            <div className="mt-4 flex flex-col justify-between">
                              <div className="mb-2 flex items-center">
                                {item.icon}
                                <h3 className="ml-2 text-lg font-bold text-white">
                                  {item.title}
                                </h3>
                              </div>
                              <div className="text-sm text-neutral-300">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Rest of your skeleton components remain the same...
const SkeletonOne = () => {
  const variants = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -5, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2"
      style={{ position: "relative", zIndex: 1 }}
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-blue-400/[0.3] bg-black/40 p-2 backdrop-blur-sm"
      >
        <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
        <div className="h-4 w-full rounded-full bg-gradient-to-r from-blue-900/60 to-purple-900/60" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex w-3/4 flex-row items-center space-x-2 rounded-full border border-purple-400/[0.3] bg-black/40 p-2 backdrop-blur-sm"
      >
        <div className="h-4 w-full rounded-full bg-gradient-to-r from-purple-900/60 to-blue-900/60" />
        <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-400 to-blue-500" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-blue-400/[0.3] bg-black/40 p-2 backdrop-blur-sm"
      >
        <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-400" />
        <div className="h-4 w-full rounded-full bg-gradient-to-r from-purple-900/60 to-blue-900/60" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const [isClient, setIsClient] = useState(false);
  const [randomWidths, setRandomWidths] = useState<number[]>([]);

  useEffect(() => {
    setIsClient(true);
    const widths = new Array(6)
      .fill(0)
      .map(() => Math.random() * (100 - 40) + 40);
    setRandomWidths(widths);
  }, []);

  const variants = {
    initial: { width: 0 },
    animate: { width: "100%", transition: { duration: 0.2 } },
    hover: { width: ["0%", "100%"], transition: { duration: 2 } },
  };

  if (!isClient) {
    return (
      <div
        className="flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2"
        style={{ position: "relative", zIndex: 1 }}
      >
        {new Array(6).fill(0).map((_, i) => (
          <div
            key={`skeleton-loading-${i}`}
            className="flex h-4 w-full flex-row items-center space-x-2 rounded-full border border-purple-400/[0.3] bg-black/40 p-2 backdrop-blur-sm"
            style={{ maxWidth: "60%" }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2"
      style={{ position: "relative", zIndex: 1 }}
    >
      {randomWidths.map((width, i) => (
        <motion.div
          key={`skeleton-two-${i}`}
          variants={variants}
          style={{ maxWidth: `${width}%` }}
          className="flex h-4 w-full flex-row items-center space-x-2 rounded-full border border-purple-400/[0.3] bg-black/40 p-2 backdrop-blur-sm"
        />
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => {
  return (
    <div
      style={{ position: "relative", zIndex: 1 }}
      className="flex h-full w-full items-center justify-center"
    >
      <Image
        alt="Smart"
        width={200}
        height={120}
        src={dj}
        className="object-contain"
      />
    </div>
  );
};

const SkeletonFour = () => {
  const first = {
    initial: { x: 20, rotate: -5 },
    hover: { x: 0, rotate: 0 },
  };
  const second = {
    initial: { x: -20, rotate: 5 },
    hover: { x: 0, rotate: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex h-full min-h-[6rem] w-full flex-1 flex-row space-x-2"
      style={{ position: "relative", zIndex: 1 }}
    >
      <motion.div
        variants={first}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-blue-400/[0.3] bg-black/40 p-2 backdrop-blur-sm"
      >
        <Image
          src="https://plus.unsplash.com/premium_photo-1678937608953-f4821e42dcdb?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="avatar"
          height="40"
          width="40"
          className="h-8 w-8 rounded-full"
        />
        <p className="mt-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-center text-xs font-semibold text-transparent">
          Basic AI Model
        </p>
        <p className="mt-2 rounded-full border border-blue-500 bg-gradient-to-r from-blue-600 to-purple-600 px-2 py-1 text-xs font-semibold text-white">
          Starter
        </p>
      </motion.div>
      <motion.div
        className="relative flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-purple-400/[0.4] bg-black/50 p-2 backdrop-blur-sm"
        style={{ zIndex: 2 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=3432&auto=format&fit=crop"
          alt="avatar"
          height="40"
          width="40"
          className="h-8 w-8 rounded-full"
        />
        <p className="mt-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-xs font-semibold text-transparent">
          Full AI-Powered Model
        </p>
        <p className="mt-2 rounded-full border border-purple-500 bg-gradient-to-r from-purple-600 to-blue-600 px-2 py-1 text-xs font-semibold text-white">
          Pro
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-purple-400/[0.3] bg-black/40 p-2 backdrop-blur-sm"
      >
        <Image
          src="https://images.unsplash.com/photo-1542185400-f1c993ecbea2?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="avatar"
          height="40"
          width="40"
          className="h-8 w-8 rounded-full"
        />
        <p className="mt-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-center text-xs font-semibold text-transparent">
          Enterprise Model
        </p>
        <p className="mt-2 rounded-full border border-blue-500 bg-gradient-to-r from-blue-800 to-purple-800 px-2 py-1 text-xs font-semibold text-white">
          Enterprise
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -5, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2"
      style={{ position: "relative", zIndex: 1 }}
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-start space-x-2 rounded-2xl border border-blue-400/[0.3] bg-black/40 p-2 backdrop-blur-sm"
      >
        <Image
          src="https://plus.unsplash.com/premium_photo-1678937610952-94d467ca3b02?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="avatar"
          height="40"
          width="40"
          className="h-8 w-8 rounded-full"
        />
        <p className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-xs text-transparent">
          Build powerful Sentiment Analysis Models with AI....
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex w-3/4 flex-row items-center justify-end space-x-2 rounded-full border border-purple-400/[0.3] bg-black/40 p-2 backdrop-blur-sm"
      >
        <p className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-xs text-transparent">
          Start Building Now
        </p>
        <div className="h-4 w-4 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-400 to-blue-500" />
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: "AWS Integration",
    description: (
      <span className="text-sm">
        Integrate powerful AWS capabilities to train your model.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-blue-400" />,
  },
  {
    title: "Open Source",
    description: (
      <span className="text-sm">
        Code your own Model with our open-source framework.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-purple-400" />,
  },
  {
    title: "Sentiment Analysis",
    description: (
      <span className="text-sm">
        Create context-aware models that understand user sentiment.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-blue-400" />,
  },
  {
    title: "User Analytics",
    description: (
      <span className="text-sm">
        Track and analyze your Model&apos;s performance and user interactions.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-purple-400" />,
  },
  {
    title: "Multi-language Support",
    description: (
      <span className="text-sm">
        Deploy your Model in multiple languages for better Analysis.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-blue-400" />,
  },
];
