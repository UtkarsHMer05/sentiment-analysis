"use client";

export default function AnimatedBackground() {
  return (
    <>
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 -z-50">
        {/* Main Animated Gradient Background */}
        <div
          className="animate-gradient-shift absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0f1419 0%, #1a1f3a 25%, #2d1b3d 50%, #1e2a5e 75%, #0f1419 100%)",
            backgroundSize: "400% 400%",
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute inset-0">
          {/* Large Orb 1 */}
          <div
            className="animate-float-slow absolute h-96 w-96 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
              top: "10%",
              left: "10%",
              animationDelay: "0s",
            }}
          />

          {/* Large Orb 2 */}
          <div
            className="animate-float-medium absolute h-80 w-80 rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)",
              top: "60%",
              right: "15%",
              animationDelay: "2s",
            }}
          />

          {/* Large Orb 3 */}
          <div
            className="animate-float-fast absolute h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)",
              bottom: "20%",
              left: "20%",
              animationDelay: "4s",
            }}
          />

          {/* Medium Orbs */}
          <div
            className="animate-pulse-slow absolute h-48 w-48 rounded-full opacity-30 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)",
              top: "30%",
              right: "30%",
              animationDelay: "1s",
            }}
          />

          <div
            className="animate-pulse-medium absolute h-40 w-40 rounded-full opacity-25 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)",
              bottom: "40%",
              right: "10%",
              animationDelay: "3s",
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {/* Small Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="animate-float-particle absolute h-2 w-2 rounded-full bg-purple-400/30"
              style={{
                left: `${(i * 23.7) % 100}%`,
                top: `${(i * 31.3) % 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + (i % 10)}s`,
              }}
            />
          ))}
        </div>

        {/* Animated Emojis for Sentiment Analysis */}
        <div className="absolute inset-0 overflow-hidden">
          {[
            "😊",
            "😢",
            "😠",
            "😮",
            "😐",
            "🤔",
            "💡",
            "🚀",
            "⭐",
            "🎯",
            "📊",
            "💎",
          ].map((emoji, i) => (
            <div
              key={i}
              className="animate-emoji-float absolute text-2xl opacity-40"
              style={{
                left: `${(i * 13.7) % 100}%`,
                top: `${(i * 19.3) % 100}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${8 + (i % 6)}s`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>

        {/* Animated Graph Elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute opacity-20"
              style={{
                left: `${(i * 25.3) % 100}%`,
                top: `${(i * 33.7) % 100}%`,
              }}
            >
              <div className="animate-graph-bars flex items-end gap-1">
                {[...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className="animate-bar-grow w-1 rounded-t bg-gradient-to-t from-purple-400 to-pink-400"
                    style={{
                      height: `${20 + j * 8}px`,
                      animationDelay: `${i * 0.2 + j * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #8b5cf6 1px, transparent 1px),
                radial-gradient(circle at 75% 75%, #ec4899 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px, 40px 40px",
            }}
          />
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-20px, -60px) scale(0.9);
          }
          75% {
            transform: translate(-40px, -20px) scale(1.05);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(40px, -40px) rotate(120deg);
          }
          66% {
            transform: translate(-30px, -30px) rotate(240deg);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(50px, -50px) scale(1.2);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-medium {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.15);
          }
        }

        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-100px) translateX(30px);
            opacity: 1;
          }
          50% {
            transform: translateY(-200px) translateX(-20px);
            opacity: 0.7;
          }
          75% {
            transform: translateY(-150px) translateX(40px);
            opacity: 0.9;
          }
        }

        @keyframes emoji-float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translate(50px, -50px) rotate(90deg) scale(1.2);
            opacity: 0.8;
          }
          50% {
            transform: translate(-30px, -100px) rotate(180deg) scale(0.8);
            opacity: 0.6;
          }
          75% {
            transform: translate(30px, -75px) rotate(270deg) scale(1.1);
            opacity: 0.7;
          }
        }

        @keyframes graph-bars {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes bar-grow {
          0% {
            height: 5px;
          }
          50% {
            height: var(--target-height, 20px);
          }
          100% {
            height: 5px;
          }
        }

        .animate-gradient-shift {
          animation: gradient-shift 20s ease infinite;
        }

        .animate-float-slow {
          animation: float-slow 25s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 20s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 15s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-pulse-medium {
          animation: pulse-medium 6s ease-in-out infinite;
        }

        .animate-float-particle {
          animation: float-particle 15s linear infinite;
        }

        .animate-emoji-float {
          animation: emoji-float 8s ease-in-out infinite;
        }

        .animate-graph-bars {
          animation: graph-bars 4s ease-in-out infinite;
        }

        .animate-bar-grow {
          animation: bar-grow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
