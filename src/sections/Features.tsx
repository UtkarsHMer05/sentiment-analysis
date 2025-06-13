"use client";

import FeatureCard from "~/components/FeatureCard";
import Tag from "~/components/Tag";
import avatar1 from "~/assets/images/avatar-ashwin-santiago.jpg";
import avatar2 from "~/assets/images/avatar-florence-shaw.jpg";
import avatar3 from "~/assets/images/avatar-lula-meyers.jpg";
import Image from "next/image";
import Avatar from "~/components/Avatar";
import { Ellipsis } from "lucide-react";
import Key from "~/components/Key";
import { motion } from "framer-motion";

const features = [
  "Asset Library",
  "Open Source",
  "Real-time Analytics",
  "Smart Sync",
  "Auto Layout",
  "Low Cost Training",
  "Smart Guides",
];

const parentVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.7,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-24">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e2a5e0a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(circle_at_center,_black,transparent_75%)]" />

      <div className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[40rem] w-[40rem] rounded-full bg-purple-600/20 blur-[128px]" />
      </div>

      <div className="container">
        {/* Elevated Features Section */}
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-blue-950/60 to-purple-950/80 p-8 shadow-2xl backdrop-blur-sm md:p-12">
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,_#ffffff05_1px,transparent_1px)] [background-size:20px_20px]"></div>

          {/* Content container */}
          <div className="relative z-10">
            <div className="flex justify-center">
              <Tag>Features</Tag>
            </div>
            <h2 className="m-auto mt-6 max-w-2xl text-center text-6xl font-medium">
              Where analytics meets{" "}
              <span className="bg-gradient-to-r from-purple-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Simplicity
              </span>
            </h2>
            <motion.div
              variants={parentVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-3">
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <FeatureCard
                    title="Real-time Emotion Detection and Analysis"
                    description="Track emotional changes moment-by-moment with millisecond-accurate detection algorithms"
                    className="md:col-span-2 lg:col-span-1"
                  >
                    <div className="flex aspect-video items-center justify-center">
                      <Avatar className="z-40">
                        <Image
                          src={avatar1}
                          alt="Avatar 1"
                          className="rounded-full"
                        />
                      </Avatar>
                      <Avatar className="z-30 -ml-6 border-indigo-500">
                        <Image
                          src={avatar2}
                          alt="Avatar 2"
                          className="rounded-full"
                        />
                      </Avatar>
                      <Avatar className="z-20 -ml-6 border-amber-500">
                        <Image
                          src={avatar3}
                          alt="Avatar 3"
                          className="rounded-full"
                        />
                      </Avatar>
                      <Avatar className="z-10 -ml-6 border-transparent">
                        <div className="flex size-full items-center justify-center rounded-full bg-neutral-700">
                          <Ellipsis size={30} />
                        </div>
                      </Avatar>
                    </div>
                  </FeatureCard>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <FeatureCard
                    title="Emotion Intelligence"
                    description="Upload any video and get instant emotional insights with frame-by-frame analysis"
                    className="group transition duration-500 md:col-span-2 lg:col-span-1"
                  >
                    <div className="flex aspect-video items-center justify-center">
                      <p className="text-center text-4xl font-extrabold text-white/20 transition duration-500 group-hover:text-white/40">
                        We've made an{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          incredible
                        </span>{" "}
                        model this year!
                      </p>
                    </div>
                  </FeatureCard>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <FeatureCard
                    title="Keyboard quick actions"
                    description="Powerful commands to Signup quickly and start using our model"
                    className="group md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-auto"
                  >
                    <div className="flex aspect-video items-center justify-center gap-4">
                      <Key className="w-28 outline outline-2 outline-offset-2 outline-transparent transition-all duration-500 group-hover:translate-y-1 group-hover:outline-lime-400">
                        Shift
                      </Key>
                      <Key className="outline outline-2 outline-offset-2 outline-transparent transition-all delay-150 duration-500 group-hover:translate-y-1 group-hover:outline-lime-400">
                        alt
                      </Key>
                      <Key className="outline outline-2 outline-offset-2 outline-transparent transition-all delay-300 duration-500 group-hover:translate-y-1 group-hover:outline-lime-400">
                        L
                      </Key>
                    </div>
                  </FeatureCard>
                </motion.div>
              </div>
            </motion.div>

            <div className="m-auto my-8 flex max-w-3xl flex-wrap items-center justify-center gap-2">
              {features.map((feature) => (
                <div
                  className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-neutral-900 px-3 py-1.5 transition duration-500 hover:scale-105 md:px-5 md:py-2"
                  key={feature}
                >
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-xl text-white transition duration-500 group-hover:rotate-45">
                    &#10038;
                  </span>
                  <span className="font-medium md:text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
