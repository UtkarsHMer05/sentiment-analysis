"use client";

import dynamic from "next/dynamic";
import { ComponentType } from "react";

// Dynamic import with no SSR
const NoSSRWrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
