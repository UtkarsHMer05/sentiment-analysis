"use client";

import { AnimationPlaybackControls, motion, useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function CallToAction() {
  const animation = useRef<AnimationPlaybackControls>();
  const [scope, animate] = useAnimate();

  const [slowDownAnimation, setSlowDownAnimation] = useState(false);

  useEffect(() => {
    animation.current = animate(
      scope.current,
      { x: "-50%" },
      { duration: 30, ease: "linear", repeat: Infinity },
    );
  }, []);

  useEffect(() => {
    if (animation.current) {
      if (slowDownAnimation) {
        animation.current.speed = 0.5;
      } else {
        animation.current.speed = 1;
      }
    }
  }, []);

  return (
    <section className="py-2">
      <div className="flex overflow-x-clip p-4">
        <motion.div
          ref={scope}
          className="flex flex-none gap-16 pr-16 text-lg font-medium sm:text-xl md:text-2xl"
          onMouseEnter={() => setSlowDownAnimation(true)}
          onMouseLeave={() => setSlowDownAnimation(false)}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex items-center gap-16">
              <span className="text-base text-lime-400 sm:text-lg md:text-xl">
                &#10038;
              </span>
              <span className={twMerge(slowDownAnimation && "text-lime-400")}>
                Try for Very Low Cost
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
