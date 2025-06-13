"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import pytorch from "~/assets/images/pytorch.svg";

const logos = [
  "https://res.cloudinary.com/dylcvquzw/image/upload/v1748418489/figma_bddqoh.svg",
  "https://res.cloudinary.com/dylcvquzw/image/upload/v1748417505/knowledge-graph-data-model_cwmbrm.svg",
  "https://res.cloudinary.com/dylcvquzw/image/upload/v1748417244/pytorch_sxcsgq.svg",
  "https://res.cloudinary.com/dl2adjye7/image/upload/v1716817722/Amazon_icon.svg_a4qmtg.png",
  "https://res.cloudinary.com/dylcvquzw/image/upload/v1748417381/nextjsIcon_xvw3z3.svg",
];

const lineWidth = 80;
const lineHeight = 2;

const LogoBeam = () => {
  return (
    <div className="flex min-h-52 items-center justify-center">
      <div className="relative flex items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-[#000] p-4">
          <img
            src={logos[0]}
            alt="Logo 1"
            className="brightness-0 invert filter"
          />
        </div>
        <div
          className="relative"
          style={{
            width: `${lineWidth}px`,
            height: `${lineHeight}px`,
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-transparent via-black to-transparent opacity-75"
            initial={{ x: "-40px" }}
            animate={{ x: `calc(${lineWidth}px + 40px)` }}
            transition={{
              repeat: Infinity,
              duration: 0.5,
              repeatDelay: 2.5,
              ease: "linear",
            }}
            style={{ willChange: "transform" }}
          />
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-black p-4">
          <img
            src={logos[2]}
            alt="Logo 2"
            className="brightness-0 invert filter"
          />
        </div>
        <div
          className="relative"
          style={{
            width: `${lineWidth}px`,
            height: `${lineHeight}px`,
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          <motion.div
            className="absolute right-0 top-0 h-full w-10 bg-gradient-to-r from-transparent via-black to-transparent opacity-75"
            initial={{ x: "40px" }}
            animate={{ x: `calc(-${lineWidth}px - 40px)` }}
            transition={{
              repeat: Infinity,
              duration: 0.5,
              repeatDelay: 3.5,
              ease: "linear",
            }}
            style={{ willChange: "transform" }}
          />
        </div>
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/70 bg-black p-4 shadow-[0_0_15px_5px_#dbe0e2]">
          <img
            src={logos[1]}
            alt="Logo 3"
            className="brightness-0 invert filter"
          />
          <motion.div
            className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{ willChange: "transform" }}
          />
        </div>
        <div
          className="relative"
          style={{
            width: `${lineWidth}px`,
            height: `${lineHeight}px`,
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-transparent via-black to-transparent opacity-75"
            initial={{ x: "-40px" }}
            animate={{ x: `calc(${lineWidth}px + 40px)` }}
            transition={{
              repeat: Infinity,
              duration: 0.5,
              repeatDelay: 4.5,
              ease: "linear",
            }}
            style={{ willChange: "transform" }}
          />
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-black p-4">
          <img
            src={logos[3]}
            alt="Logo 4"
            className="brightness-0 invert filter"
          />
        </div>
        <div
          className="relative"
          style={{
            width: `${lineWidth}px`,
            height: `${lineHeight}px`,
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-transparent via-black to-transparent opacity-75"
            initial={{ x: "-40px" }}
            animate={{ x: `calc(${lineWidth}px + 40px)` }}
            transition={{
              repeat: Infinity,
              duration: 0.5,
              repeatDelay: 5.5,
              ease: "linear",
            }}
            style={{ willChange: "transform" }}
          />
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-black p-4">
          <img
            src={logos[4]}
            alt="Logo 5"
            className="brightness-0 invert filter"
          />
        </div>
      </div>
    </div>
  );
};

const data = [50, 40, 300, 320, 500, 350, 200, 230, 500];
const maxData = Math.max(...data);
const chartHeight = 400;
const chartWidth = 800;

const CardWithEffect = ({ children }: { children: React.ReactNode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className="relative flex-1 overflow-hidden rounded-xl border border-white/30 bg-[#000] p-4"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ willChange: "transform" }}
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: "300px",
            height: "300px",
            top: mousePosition.y - 150,
            left: mousePosition.x - 150,
            background: "#5D2CA8",
            filter: "blur(100px)",
            transform: "translate(-0%, -0%)",
            zIndex: 10,
            willChange: "transform, top, left",
          }}
        />
      )}
      {children}
    </div>
  );
};

const AWSIcon = () => {
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="relative flex h-full flex-row items-center justify-center gap-8">
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/70 bg-black p-4 shadow-[0_0_15px_5px_#dbe0e2]">
          <img
            src={logos[3]}
            alt="Logo 1"
            className="brightness-0 invert filter"
          />
          <motion.div
            className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{ willChange: "transform" }}
          />
        </div>
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/70 bg-black p-4 shadow-[0_0_15px_5px_#dbe0e2]">
          <img
            src={logos[2]}
            alt="Logo 2"
            className="brightness-0 invert filter"
          />
          <motion.div
            className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{ willChange: "transform" }}
          />
        </div>
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/70 bg-black p-4 shadow-[0_0_15px_5px_#dbe0e2]">
          <img
            src={logos[4]}
            alt="Logo 3"
            className="brightness-0 invert filter"
          />
          <motion.div
            className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{ willChange: "transform" }}
          />
        </div>
      </div>

      <div className="mt-4 p-6 text-left">
        <h1 className="mb-2 text-2xl font-bold text-white">AWS Integration</h1>
        <p className="text-lg text-gray-400">
          integrate AWS and use seamlessly with us.
        </p>
      </div>
    </div>
  );
};

const BentoBox1 = () => {
  const chartRef = useRef(null);
  const [isChartVisible, setIsChartVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsChartVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, [chartRef]);

  return (
    <div className="flex min-h-screen items-center justify-center rounded-lg bg-[#000000] p-5 pb-32 sm:py-24 md:py-24 lg:py-32">
      <div className="flex min-h-[800px] w-full max-w-7xl flex-col gap-4 md:h-[800px] md:min-h-[800px] md:flex-row">
        <CardWithEffect>
          <div className="flex h-full flex-col justify-between">
            <div className="mb-4 mt-6 px-6">
              <div className="mb-6 flex items-center justify-between pb-2">
                <h2 className="text-xl text-white/70">Real-Time Analytics</h2>
                <div className="flex items-center">
                  <div className="h-1 w-8 rounded-lg bg-black"></div>
                  <span className="ml-2 text-sm text-white/70">
                    Data Integration
                  </span>
                </div>
              </div>
              <div
                ref={chartRef}
                className="relative mt-12 w-full"
                style={{ height: chartHeight }}
              >
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="h-full w-full pl-11"
                >
                  <defs>
                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#5D2CA8" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="url(#gradient)"
                    stroke="none"
                    points={`${(0 / (data.length - 1)) * chartWidth},${chartHeight} ${data
                      .map(
                        (value, index) =>
                          `${(index / (data.length - 1)) * chartWidth},${chartHeight - (value / maxData) * chartHeight}`,
                      )
                      .join(
                        " ",
                      )} ${(data.length - 1) * (chartWidth / (data.length - 1))},${chartHeight}`}
                  />
                  <motion.polyline
                    fill="none"
                    stroke="#5D2CA8"
                    strokeWidth="3"
                    className=""
                    points={data
                      .map(
                        (value, index) =>
                          `${(index / (data.length - 1)) * chartWidth},${chartHeight - (value / maxData) * chartHeight}`,
                      )
                      .join(" ")}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isChartVisible ? 1 : 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>
                <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
                  {Array.from(Array(7).keys()).map((i) => (
                    <div
                      key={i}
                      className="absolute left-0 flex w-full items-center text-sm text-white/30"
                      style={{ top: `${(100 / 6) * i}%` }}
                    >
                      <span className="mr-4">{`${10 + i * 10}%`}</span>
                      <div className="w-full border-t border-white/70"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 p-6 text-left">
              <h1 className="mb-2 text-2xl font-bold text-white">
                Incredible Performance
              </h1>
              <p className="text-lg text-white/70">
                Make your data work for you with real-time analytics and
                insights. Our platform provides powerful tools to visualize and
                analyze your data, helping you make informed decisions faster
                than ever before.
              </p>
            </div>
          </div>
        </CardWithEffect>
        <div className="flex h-full w-full flex-col gap-5 md:h-[800px] md:w-1/2">
          <CardWithEffect>
            <div className="flex h-full flex-col justify-center">
              <LogoBeam />
              <div className="p-6 text-left">
                <h1 className="mb-2 text-2xl font-bold text-white">
                  Multiple Technologies
                </h1>
                <p className="text-lg text-white/70">
                  Fly through your tasks with rapid-fire keyboard shortcuts for
                  everything. Literally everything.
                </p>
              </div>
            </div>
          </CardWithEffect>
          <CardWithEffect>
            <AWSIcon />
          </CardWithEffect>
        </div>
      </div>
    </div>
  );
};

function Bentodemo() {
  return (
    <div className="flex h-screen items-center justify-center">
      <BentoBox1 />
    </div>
  );
}

export default Bentodemo;
