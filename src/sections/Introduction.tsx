"use client";

import Tag from "~/components/Tag";
import {
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const text = `You’re chasing breakthrough insights, but outdated analysis methods bury you in complexity and endless manual work..`;
const words = text.split(" ");

export default function Introduction() {
  const scrollTarget = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start end", "end end"],
  });

  const [currentWord, setCurrentWord] = useState(0);

  const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length]);

  useEffect(() => {
    wordIndex.on("change", (latest) => {
      setCurrentWord(latest);
    });
  }, [wordIndex]);

  useMotionValueEvent(scrollYProgress, "change", (latest) =>
    console.log(latest),
  );

  return (
    <section className="lg:py-30 py-20">
      <div className="container">
        <div className="sticky top-28 md:top-32">
          <div className="flex justify-center">
            <Tag>Introduction Layers</Tag>
          </div>
          <div className="mt-10 text-center text-2xl font-medium md:text-4xl lg:text-7xl">
            <span>Your Insights deserve better.&nbsp;</span>
            <span className="text-white/15">
              {words.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className={twMerge(
                    "text-white/15 transition duration-500",
                    wordIndex < currentWord && "text-white",
                  )}
                >{`${word} `}</span>
              ))}
            </span>
            <span className="block text-lime-400">
              That&apos;s why we built Layers.
            </span>
          </div>
        </div>
        <div ref={scrollTarget} className="h-[150vh]"></div>
      </div>
    </section>
  );
}
