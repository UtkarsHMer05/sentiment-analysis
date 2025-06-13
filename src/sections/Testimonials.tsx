"use client";

import { cn } from "~/lib/utils";

import Image from "next/image";
import Marquee from "~/components/ui/marquee";

const reviews = [
  {
    name: "Michael Chen",
    username: "@mchen",
    body: "The cost-effective training approach saved us 70% compared to other platforms. We trained our sentiment model on millions of reviews without breaking the budget.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    name: "Sarah Miller",
    username: "@sarahm",
    body: "Incredible scalability! We went from analyzing 1K to 1M customer feedbacks daily. The model maintains 95% accuracy even at massive scale.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    name: "David Park",
    username: "@dpark",
    body: "Real-time sentiment analysis transformed our customer service. We can now detect negative sentiment instantly and respond proactively.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    name: "Emma Wilson",
    username: "@emmaw",
    body: "The multi-model training support is phenomenal. Our sentiment model accurately analyzes customer emotions across 15 different languages seamlessly.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    name: "James Rodriguez",
    username: "@jrod",
    body: "Training speed is unmatched. What used to take weeks now completes in hours. The automated hyperparameter tuning delivers optimal results every time.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Lisa Chang",
    username: "@lisac",
    body: "The granular emotion detection goes beyond positive/negative. We can now identify frustration, excitement, and satisfaction with remarkable precision.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  },
  {
    name: "Alex Thompson",
    username: "@alexth",
    body: "Custom domain adaptation made our model industry-specific. It understands financial sentiment nuances that generic models completely miss.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    name: "Maria Garcia",
    username: "@mariag",
    body: "The API integration was seamless. Within minutes, our existing applications were enhanced with powerful sentiment analysis capabilities.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-96 cursor-pointer overflow-hidden rounded-xl border p-6",
        "border-purple-400/[0.2] bg-gradient-to-br from-purple-600/40 via-blue-600/40 to-purple-800/40 backdrop-blur-sm hover:bg-purple-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <Image
          className="rounded-full"
          width={48}
          height={48}
          alt={`${name}'s profile picture`}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-lg font-medium text-white">
            {name}
          </figcaption>
          <p className="text-sm font-medium text-purple-200/90">{username}</p>
        </div>
      </div>
      <blockquote className="mt-4 text-base leading-relaxed text-white/90">
        {body}
      </blockquote>
    </figure>
  );
};

export default function Testimonials() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="bg-gradient-to-r from-purple-300 via-blue-400 to-purple-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Trusted by Data Scientists Worldwide
          </h2>
          <p className="mt-4 text-lg text-purple-100/90">
            See how our AI sentiment analysis platform is transforming
            businesses
          </p>
        </div>
      </div>

      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:25s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:25s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0f1419] via-[#0f1419]/80 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0f1419] via-[#0f1419]/80 to-transparent"></div>
      </div>
    </section>
  );
}
