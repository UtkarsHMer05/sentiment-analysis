import { Suspense } from "react";
import Bentodemo from "~/components/bentogrid";
import CallToAction from "~/sections/CallToAction";
import Faqs from "~/sections/Faqs";
import Features from "~/sections/Features";
import { BentoGridThirdDemo } from "~/sections/Features-Bento";
import Footer from "~/sections/Footer";
import Hero from "~/sections/Hero";
import Integrations from "~/sections/Integrations";
import Introduction from "~/sections/Introduction";
import LogoTicker from "~/sections/LogoTicker";
import Navbar from "~/sections/Navbar";
import Pricing from "~/sections/pricing";
import Testimonials from "~/sections/Testimonials";

function PricingFallback() {
  return (
    <section className="relative overflow-hidden pb-32">
      <div className="container">
        <div className="animate-pulse h-96 w-full bg-white/10 rounded-3xl" />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoTicker />
      <Introduction />
      <Features />
      <BentoGridThirdDemo />
      <Integrations />
      <Bentodemo />
      <Faqs />
      <Suspense fallback={<PricingFallback />}>
        <Pricing />
      </Suspense>
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}

