"use client";

import Tag from "~/components/Tag";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const faqs = [
  {
    question: "How is Layers different from other AI models?",
    answer:
      "Unlike traditional sentiment analysis tools that feel clunky and overwhelming, our AI model puts human understanding first. We've built something that actually makes sense - where you can simply upload a video and immediately see what people are really feeling.Most sentiment tools force you to become a data scientist just to get basic insights. Our AI naturally recognizes genuine expressions and reactions, giving you clear, meaningful results that help you connect with your audience without drowning in technical complexity.",
  },
  {
    question: "Is there a learning curve?",
    answer:
      "Layers is designed to feel intuitive from day one. There is a small to no learning curve for uploading of data, so it's very user-friendly. We also provide comprehensive documentation and tutorials to help you get started quickly.",
  },
  {
    question: "How do you handle version control?",
    answer:
      "Every change in Layers is automatically saved and versioned. You can review history, restore previous versions, and create named versions for important milestones.",
  },
  {
    question: "Can I work offline?",
    answer:
      "We're sorry, but Layers is a cloud-based platform and requires an internet connection to access your models and training data. However, you can download your models and datasets for local use if needed.",
  },
  {
    question: "How does Layers handle collaboration?",
    answer:
      "Layers is built for collaboration. You can invite team members to your projects, share feedback, and work together in real-time.",
  },
];

export default function Faqs() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section id="faqs" className="relative overflow-hidden py-64">
      {/* Background effects with slightly different positioning */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2d1b3d0a_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(circle_at_center,_black,transparent_75%)]" />

      <div className="absolute right-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[35rem] w-[35rem] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <div className="container">
        {/* Elevated FAQ Section with purple-blue gradient */}
        <div
          className="relative rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-sm md:p-12"
          style={{
            background: "linear-gradient(135deg, #7e22ce, #3b82f6)",
          }}
        >
          {/* Enhanced inner glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-black/20"></div>

          {/* Improved pattern overlay */}
          <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,_#ffffff08_1px,transparent_1px)] [background-size:24px_24px]"></div>

          {/* Content container */}
          <div className="relative z-10">
            <div className="flex justify-center">
              <Tag>Faqs</Tag>
            </div>
            <h2 className="mx-auto mt-6 max-w-xl text-center text-6xl font-medium text-white">
              Questions? We&apos;ve got{" "}
              <span className="bg-gradient-to-r from-blue-300 via-white to-blue-400 bg-clip-text text-transparent">
                answers
              </span>
            </h2>

            <div className="mx-auto mt-12 flex max-w-xl flex-col gap-6">
              {faqs.map((faq, faqIndex) => (
                <div
                  key={faq.question}
                  onClick={() => setSelectedIndex(faqIndex)}
                  className="rounded-2xl border border-white/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/40"
                  style={{
                    background:
                      selectedIndex === faqIndex
                        ? "linear-gradient(135deg, #7e22ce, #84cc16)" // Purple to lime when selected
                        : "rgba(255, 255, 255, 0.1)", // Semi-transparent when not selected
                  }}
                >
                  <div className="flex items-start justify-between">
                    <h3 className="m-0 font-medium text-white">
                      {faq.question}
                    </h3>
                    <Plus
                      size={30}
                      className={twMerge(
                        "feather feather-plus flex-shrink-0 text-white transition duration-300",
                        selectedIndex === faqIndex && "rotate-45 text-lime-300",
                      )}
                    />
                  </div>

                  <AnimatePresence>
                    {selectedIndex === faqIndex && (
                      <motion.div
                        initial={{
                          height: 0,
                          marginTop: 0,
                        }}
                        animate={{
                          height: "auto",
                          marginTop: 24,
                        }}
                        exit={{
                          height: 0,
                          marginTop: 0,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/90">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
