import React from "react";
import { twMerge } from "tailwind-merge";

const FeatureCard = (props: {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  const { title, description, children, className } = props;

  return (
    <div
      className={twMerge(
        "flex h-full cursor-pointer flex-col rounded-3xl border border-white/10 bg-neutral-900 p-6",
        className,
      )}
    >
      <div className="aspect-video flex-shrink-0">{children}</div>
      <div className="flex flex-1 flex-col">
        <h3 className="mt-6 text-3xl font-medium">{title}</h3>
        <p className="mt-2 flex-1 text-white/50">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
