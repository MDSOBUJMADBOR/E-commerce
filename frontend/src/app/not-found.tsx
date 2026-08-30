"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Home,
} from "lucide-react";

const NotFoundPage = () => {
  return (
    <main className="relative container mx-auto flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#effaf6] via-white to-[#e7f7f0] px-5 py-12 sm:px-8 lg:px-10">

      {/* =====================================================
          BACKGROUND DECORATIONS
      ====================================================== */}

      {/* Left Large Circle */}
      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/2
          h-80
          w-80
          -translate-y-1/2
          rounded-full
          border
          border-emerald-100
        "
      />

      {/* Left Small Circle */}
      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-1/2
          h-52
          w-52
          -translate-y-1/2
          rounded-full
          border
          border-emerald-100/70
        "
      />

      {/* Right Large Circle */}
      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-10
          h-96
          w-96
          rounded-full
          border
          border-emerald-100
        "
      />

      {/* Right Small Circle */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          top-32
          h-64
          w-64
          rounded-full
          border
          border-emerald-100/70
        "
      />

      {/* =====================================================
          DECORATIVE DOTS
      ====================================================== */}

      {/* Top Left Dots */}
      <div className="pointer-events-none absolute left-[7%] top-[10%] hidden grid-cols-4 gap-3 opacity-60 sm:grid">
        {Array.from({ length: 20 }).map((_, index) => (
          <span
            key={index}
            className="h-1.5 w-1.5 rounded-full bg-emerald-300"
          />
        ))}
      </div>

      {/* Bottom Right Dots */}
      <div className="pointer-events-none absolute bottom-[12%] right-[8%] hidden grid-cols-4 gap-3 opacity-60 sm:grid">
        {Array.from({ length: 20 }).map((_, index) => (
          <span
            key={index}
            className="h-1.5 w-1.5 rounded-full bg-emerald-300"
          />
        ))}
      </div>

      {/* =====================================================
          FLOATING DOTS
      ====================================================== */}

      <motion.div
        animate={{
          y: [0, -12, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-[13%]
          top-[23%]
          hidden
          h-4
          w-4
          rounded-full
          bg-emerald-300
          sm:block
        "
      />

      <motion.div
        animate={{
          y: [0, 10, 0],
          scale: [1, 0.85, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          right-[15%]
          top-[25%]
          hidden
          h-3
          w-3
          rounded-full
          bg-emerald-400
          sm:block
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">

        {/* ===================================================
            BIG 404
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="mb-8"
        >
          <h1
            className="
              select-none
              text-[130px]
              font-black
              leading-none
              tracking-[-0.09em]
              text-green-500
              sm:text-[180px]
              md:text-[230px]
              lg:text-[260px]
            "
          >
            404
          </h1>
        </motion.div>

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.25,
          }}
        >
          {/* Heading */}
          <h2
            className="
              mb-4
              text-3xl
              font-extrabold
              tracking-tight
              text-slate-900
              sm:text-4xl
              md:text-5xl
            "
          >
            <span className="text-green-500">
              Oops!
            </span>{" "}
            Page Not Found
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              max-w-xl
              text-sm
              leading-6
              text-slate-500
              sm:text-base
              sm:leading-7
            "
          >
            Sorry, we couldn&apos;t find the page you&apos;re
            looking for.
            <br className="hidden sm:block" />
            The page may have been moved, deleted, or the URL
            might be incorrect.
          </p>
        </motion.div>

        {/* ===================================================
            BUTTONS
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.45,
          }}
          className="
            mt-8
            flex
            flex-col
            items-center
            justify-center
            gap-3
            sm:flex-row
          "
        >

          {/* Back To Home */}
          <Link
            href="/"
            className="
              group
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-green-500
              px-8
              py-3.5
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-emerald-600/20
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-emerald-700
              hover:shadow-xl
              hover:shadow-emerald-600/25
              active:scale-95
              sm:w-auto
            "
          >
            <Home
              size={18}
              strokeWidth={2}
            />

            <span>
              Back to Home
            </span>

            <ArrowRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>

          {/* Go Back */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="
              group
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-8
              py-3.5
              text-sm
              font-bold
              text-slate-700
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-emerald-200
              hover:bg-emerald-50
              hover:shadow-md
              active:scale-95
              sm:w-auto
            "
          >
            <ArrowLeft
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />

            <span>
              Go Back
            </span>
          </button>

        </motion.div>

        {/* ===================================================
            ERROR CODE
        ==================================================== */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.7,
          }}
          className="mt-8 text-xs text-slate-400"
        >
          Error Code: 404
          <span className="mx-2">
            •
          </span>
          The requested page does not exist
        </motion.p>

      </div>
    </main>
  );
};

export default NotFoundPage;