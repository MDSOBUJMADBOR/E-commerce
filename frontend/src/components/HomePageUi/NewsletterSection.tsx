"use client";

import React, { useState } from "react";
import {
  Mail,
  SendHorizontal,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NewsletterBanner: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setIsLoading(true);

    // Simulated API request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
    }, 1200);
  };

  return (
    <div className="container mx-auto w-full p-4 md:p-6 lg:p-8">
      {/* =====================================================
          MAIN NEWSLETTER BANNER
      ===================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl  bg-[#E9F7F1] px-6 py-8 shadow-md transition-all duration-300  xl:flex-row  "
      >
        {/* =====================================================
            BACKGROUND DECORATIONS
        ===================================================== */}

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#00AA55]/10 blur-2xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-[#1FE0A0]/10 blur-2xl"
        />

        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <div className="relative z-10 flex w-full flex-col items-center gap-6 text-center md:w-auto md:flex-row md:gap-10 md:text-left">
          {/* =====================================================
              ILLUSTRATION
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{
              y: -5,
              rotate: 1,
            }}
            className="shrink-0"
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/NewsletterSection-image.png"
                alt="Best deals"
                width={180}
                height={130}
                className="h-auto w-[150px] object-contain sm:w-[165px] md:w-[180px]"
              />
            </motion.div> 
          </motion.div>

          {/* =====================================================
              TEXT + MAIL ICON
          ===================================================== */}

          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3 lg:justify-start">
              {/* Mail Icon */}
              <motion.div
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#00AA55] bg-white/70 p-2.5 shadow-sm"
              >
                <Mail className="h-full w-full text-[#00AA55]" />
              </motion.div>

              {/* Heading */}
              <h2 className="text-xl font-bold leading-tight text-[#1A1A1A] sm:text-2xl md:text-3xl">
                Get the{" "}
                <span className="text-[#00AA55]">
                  Best Deals
                </span>{" "}
                First!
              </h2>
            </div>

            {/* Subtitle */}
            <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-gray-700 md:mx-0 md:text-base">
              Subscribe to our newsletter and never miss amazing offers.
            </p>
          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="relative z-10 flex min-h-[60px] w-full max-w-lg items-center justify-center md:w-auto md:flex-1">
          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              /* =================================================
                 SUBSCRIBE FORM
              ================================================= */

              <motion.form
                key="subscribe-form"
                initial={{
                  opacity: 0,
                  x: 25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: -10,
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                }}
                onSubmit={handleSubmit}
                className="flex w-full flex-col items-center gap-3 sm:flex-row"
              >
                {/* Email Input */}
                <motion.div
                  whileFocus={{
                    scale: 1.01,
                  }}
                  className="relative w-full flex-grow"
                >
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    disabled={isLoading}
                    className="h-[54px] w-full rounded-full border border-gray-100 bg-white px-5 pl-12 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#00AA55] focus:ring-2 focus:ring-[#00AA55]/20 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
                  />
                </motion.div>

                {/* Subscribe Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={!isLoading ? { scale: 1.03 } : {}}
                  whileTap={!isLoading ? { scale: 0.97 } : {}}
                  className="flex h-[54px] w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#00AA55] px-8 font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#008F48] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-75 sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      {/* Loading Spinner */}
                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                      />

                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <SendHorizontal className="h-5 w-5 -rotate-45" />

                      <span>Subscribe</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              /* =================================================
                 SUCCESS UI
              ================================================= */

              <motion.div
                key="success-message"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-[#00AA55]/20 bg-white px-5 py-4 shadow-md sm:rounded-full sm:px-6"
              >
                {/* =================================================
                    SUCCESS PARTICLES
                ================================================= */}

                <motion.span
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0.8],
                    x: -45,
                    y: -20,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.1,
                  }}
                  className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-[#00AA55]"
                />

                <motion.span
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0.8],
                    x: 45,
                    y: -15,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2,
                  }}
                  className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-[#1FE0A0]"
                />

                <motion.span
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0.8],
                    x: 30,
                    y: 25,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.3,
                  }}
                  className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#FFC845]"
                />

                {/* =================================================
                    SUCCESS CONTENT
                ================================================= */}

                <div className="relative z-10 flex w-full items-center gap-3">
                  {/* Animated Check Circle */}
                  <motion.div
                    initial={{
                      scale: 0,
                      rotate: -45,
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                      stiffness: 450,
                      damping: 15,
                    }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E9F7F1]"
                  >
                    <CheckCircle2 className="h-7 w-7 text-[#00AA55]" />
                  </motion.div>

                  {/* Text */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: 15,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.25,
                      duration: 0.4,
                    }}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-gray-900 sm:text-base">
                        Subscription Successful!
                      </h4>

                      <motion.div
                        animate={{
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.15, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      >
                        <Sparkles className="h-4 w-4 text-[#00AA55]" />
                      </motion.div>
                    </div>

                    <p className="mt-0.5 truncate text-xs text-gray-500 sm:text-sm">
                      Thank you! We&apos;ll send amazing deals to{" "}
                      <span className="font-semibold text-gray-700">
                        {email}
                      </span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsletterBanner;