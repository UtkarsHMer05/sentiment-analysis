import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import AnimatedBackground from "~/components/AnimatedBackground";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Sentiment Analysis Model - Layers",
  description: "Created by Utkarsh Khajuria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} relative min-h-screen overflow-x-hidden font-sans text-white antialiased`}
      >
        <Providers>
          <AnimatedBackground />

          {/* Page Content */}
          <div className="relative z-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
