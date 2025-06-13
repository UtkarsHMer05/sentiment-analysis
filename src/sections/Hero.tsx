"use client";

import Button from "~/components/Button";
import designExample1 from "~/assets/images/design-example-1.png";
import designExample2 from "~/assets/images/design-example-2.png";
import Image from "next/image";
import Pointer from "~/components/Pointer";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import cursorImage from "~/assets/images/cursor-you.svg";

export default function Hero() {
  const [leftDesignScope, leftDesignAnimate] = useAnimate();
  const [leftPointerScope, leftPointerAnimate] = useAnimate();
  const [rightDesignScope, rightDesignAnimate] = useAnimate();
  const [rightPointerScope, rightPointerAnimate] = useAnimate();

  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    leftDesignAnimate([
      [leftDesignScope.current, { opacity: 1 }, { duration: 0.5 }],
      [leftDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
    ]);

    leftPointerAnimate([
      [leftPointerScope.current, { opacity: 1 }, { duration: 0.5 }],
      [leftPointerScope.current, { y: 0, x: -100 }, { duration: 0.5 }],
      [
        leftPointerScope.current,
        { y: [0, 16, 0], x: 0 },
        { duration: 0.5, ease: "easeInOut" },
      ],
    ]);

    rightDesignAnimate([
      [rightDesignScope.current, { opacity: 1 }, { duration: 0.5, delay: 1.5 }],
      [rightDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
    ]);

    rightPointerAnimate([
      [
        rightPointerScope.current,
        { opacity: 1 },
        { duration: 0.5, delay: 1.5 },
      ],
      [rightPointerScope.current, { y: 0, x: 175 }, { duration: 0.5 }],
      [
        rightPointerScope.current,
        { y: [0, 20, 0], x: 0 },
        { duration: 0.5, ease: "easeInOut" },
      ],
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Navigate to signup page with email as query parameter
      router.push(`/signup?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <section
      className="overflow-x-clip py-24"
      style={{
        cursor: `url(${cursorImage.src}), auto`,
      }}
    >
      <div className="container relative">
        <motion.div
          ref={leftDesignScope}
          initial={{ opacity: 0, y: 100, x: -100 }}
          className="absolute -left-40 top-16 hidden lg:block"
          drag
        >
          <Image
            draggable={false}
            src={designExample1}
            alt="design example 1"
          />
        </motion.div>
        <motion.div
          ref={leftPointerScope}
          initial={{ opacity: 0, y: 100, x: -200 }}
          className="absolute left-56 top-96 hidden lg:block"
        >
          <Pointer name="Utkarsh" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100, x: 100 }}
          ref={rightDesignScope}
          className="absolute -right-80 -top-16 hidden lg:block"
          drag
        >
          <Image
            draggable={false}
            src={designExample2}
            alt="design example 2"
          />
        </motion.div>
        <motion.div
          ref={rightPointerScope}
          initial={{ opacity: 0, x: 275, y: 100 }}
          className="absolute -top-4 right-20 hidden lg:block"
        >
          <Pointer color="red" name="Sparsh" />
        </motion.div>

        <div className="flex justify-center">
          <div className="inline-flex rounded-full bg-gradient-to-r from-purple-400 to-pink-400 px-3 py-1 font-semibold text-neutral-950">
            💡Sentiment Analysis Model✨
          </div>
        </div>
        <h1 className="mt-6 text-center text-6xl font-medium md:text-7xl lg:text-9xl">
          Emotions decoded, Insights delivered
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xl text-white/50">
          Video emotions shouldn&apos;t be a mystery. Detect, decode, and act
          with ease.
        </p>
        <form
          className="mx-auto mt-8 flex max-w-lg rounded-full border border-white/50 p-2"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full flex-1 bg-transparent px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            size="sm"
            className="whitespace-nowrap"
            type="submit"
            variant="primary"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </section>
  );
}
