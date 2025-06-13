"use client";

import logoImage from "~/assets/images/logo.svg";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Button from "~/components/Button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "Integrations", href: "#Integrations" },
  { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const smoothScrollTo = (targetPosition: number, duration: number = 1500) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  };

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    if (href === "#") {
      smoothScrollTo(0, 1500);
    } else {
      const targetElement = document.querySelector(href) as HTMLElement;
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 100;
        smoothScrollTo(offsetTop, 1500);
      }
    }

    setIsOpen(false);
  };

  // Handle navigation to auth pages
  const handleLoginClick = () => {
    router.push("/login");
    setIsOpen(false);
  };

  const handleSignupClick = () => {
    router.push("/signup");
    setIsOpen(false);
  };

  const handleDashboardClick = () => {
    router.push("/dashboard");
    setIsOpen(false);
  };

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <section className="fixed top-0 z-50 w-full py-4 lg:py-8">
        <div className="container max-w-5xl">
          <div className="rounded-[27px] border border-white/15 bg-neutral-950/70 backdrop-blur lg:rounded-full">
            <figure className="grid grid-cols-2 items-center px-4 py-2 lg:grid-cols-3 lg:px-2">
              <div>
                <Image
                  src={logoImage}
                  alt="layer logo"
                  className="h-9 w-auto md:h-auto"
                />
              </div>
              <div className="hidden items-center justify-center lg:flex">
                <nav className="flex gap-6 font-medium">
                  {navLinks.map((each) => (
                    <a
                      href={each.href}
                      key={each.label}
                      onClick={(e) => handleSmoothScroll(e, each.href)}
                      className="cursor-pointer transition-colors hover:text-lime-400"
                    >
                      {each.label}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex justify-end gap-4">
                <div className="h-8 w-16 animate-pulse rounded bg-gray-600"></div>
                <div className="h-8 w-16 animate-pulse rounded bg-gray-600"></div>
              </div>
            </figure>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="fixed top-0 z-50 w-full py-4 lg:py-8">
        <div className="container max-w-5xl">
          <div className="rounded-[27px] border border-white/15 bg-neutral-950/70 backdrop-blur lg:rounded-full">
            <figure className="grid grid-cols-2 items-center px-4 py-2 lg:grid-cols-3 lg:px-2">
              <div>
                <Image
                  src={logoImage}
                  alt="layer logo"
                  className="h-9 w-auto md:h-auto"
                />
              </div>
              <div className="hidden items-center justify-center lg:flex">
                <nav className="flex gap-6 font-medium">
                  {navLinks.map((each) => (
                    <a
                      href={each.href}
                      key={each.label}
                      onClick={(e) => handleSmoothScroll(e, each.href)}
                      className="cursor-pointer transition-colors hover:text-lime-400"
                    >
                      {each.label}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden"
                >
                  {!isOpen ? (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{
                        opacity: isOpen ? 0 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu className="text-white" size={30} />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <X className="text-white" size={30} />
                    </motion.div>
                  )}
                </button>

                {/* Conditional rendering based on authentication status */}
                {session ? (
                  // User is logged in - show Dashboard button
                  <>
                    <span className="hidden items-center text-sm text-white lg:flex">
                      Welcome, {session.user?.name || "User"}
                    </span>
                    <Button
                      variant="primary"
                      className="hidden items-center lg:inline-flex"
                      onClick={handleDashboardClick}
                    >
                      Dashboard
                    </Button>
                  </>
                ) : (
                  // User is not logged in - show Login/Signup buttons
                  <>
                    <Button
                      variant="secondary"
                      className="hidden items-center lg:inline-flex"
                      onClick={handleLoginClick}
                    >
                      Login
                    </Button>
                    <Button
                      variant="primary"
                      className="hidden items-center lg:inline-flex"
                      onClick={handleSignupClick}
                    >
                      Signup
                    </Button>
                  </>
                )}
              </div>
            </figure>

            <AnimatePresence>
              {isOpen && (
                <motion.figure
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden lg:hidden"
                >
                  <div className="flex flex-col items-center gap-4 py-4">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        className="cursor-pointer transition-colors hover:text-lime-400"
                      >
                        {link.label}
                      </a>
                    ))}

                    {/* Mobile menu - conditional rendering */}
                    {session ? (
                      // User is logged in - show Dashboard button
                      <>
                        <span className="text-sm text-white">
                          Welcome, {session.user?.name || "User"}
                        </span>
                        <Button
                          className="w-3/4"
                          variant="primary"
                          onClick={handleDashboardClick}
                        >
                          Dashboard
                        </Button>
                      </>
                    ) : (
                      // User is not logged in - show Login/Signup buttons
                      <>
                        <Button
                          className="w-3/4"
                          variant="secondary"
                          onClick={handleLoginClick}
                        >
                          Log In
                        </Button>
                        <Button
                          className="w-3/4"
                          variant="primary"
                          onClick={handleSignupClick}
                        >
                          Sign Up
                        </Button>
                      </>
                    )}
                  </div>
                </motion.figure>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <div className="pb-[86px] md:pb-[98px]"></div>
    </>
  );
}
