"use client";

import Link from "next/link";
import {
  ShoppingBagIcon,
  ShieldCheckIcon,
  TruckIcon,
  LifebuoyIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const LeftSideSignUp = () => {
  return (
    <div className="relative flex min-h-full w-full flex-col justify-between overflow-hidden bg-[#004d3c] p-6 text-white sm:p-8 lg:w-1/2 lg:p-12">

      {/* =====================================================
          ANIMATED BACKGROUND
      ===================================================== */}

      {/* Large Circle */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] animate-[rotateSlow_22s_linear_infinite] rounded-full border border-emerald-400/10" />

      {/* Medium Circle */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-[330px] w-[330px] animate-[rotateSlowReverse_17s_linear_infinite] rounded-full border border-emerald-400/10" />

      {/* Small Circle */}
      <div className="pointer-events-none absolute -right-5 top-20 h-[160px] w-[160px] animate-pulse rounded-full border border-[#00c878]/10" />

      {/* Top Glow */}
      <div className="pointer-events-none absolute right-20 top-10 h-32 w-32 animate-pulse rounded-full bg-[#00c878]/10 blur-3xl" />

      {/* Bottom Glow */}
      <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 animate-pulse rounded-full bg-[#00c878]/10 blur-3xl" />

      {/* =====================================================
          ANIMATED DOTS
      ===================================================== */}

      <div className="pointer-events-none absolute bottom-3 left-3 grid grid-cols-6 gap-2 opacity-50">

        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className="h-1 w-1 rounded-full bg-[#00c878] animate-pulse"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          />
        ))}

      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 flex h-full flex-col justify-between">

        {/* ===================================================
            LOGO
        =================================================== */}

        <div className="hidden lg:block">

          <Link
            href="/"
            className="group inline-flex items-center gap-3"
          >

            {/* Logo Box */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00bd68] to-[#008c4c] shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[#00c878]/30">

              <ShoppingBagIcon className="h-7 w-7 text-white transition-transform duration-500 group-hover:scale-110" />

            </div>

            {/* Logo Text */}
            <span className="text-[30px] font-extrabold italic tracking-tight transition-all duration-300 group-hover:tracking-wide">

              Shop
              <span className="text-[#00c878]">
                Easy
              </span>

            </span>

          </Link>

        </div>

        {/* ===================================================
            HERO SECTION
        =================================================== */}

        <div className="mt-2 max-w-[380px] lg:mt-8">

          <h1 className="animate-[fadeUp_0.8s_ease-out] text-2xl font-bold leading-tight sm:text-3xl lg:text-[36px]">

            Shop Smarter,

            <br />

            <span className="inline-block text-[#00c878] transition-transform duration-500 hover:translate-x-2">
              Live Better.
            </span>

          </h1>

          <p className="mt-2 animate-[fadeUp_1s_ease-out] text-xs text-white/90 sm:text-sm">
            Create your account and enjoy exclusive deals,
            fast delivery, and more.
          </p>

        </div>

        {/* ===================================================
            FEATURES
        =================================================== */}

        <div className="mt-6 hidden space-y-3 lg:block">

          <FeatureItem
            icon={<TagIcon />}
            title="Best Prices"
            description="Get the best prices on top quality products."
            delay="0ms"
          />

          <FeatureItem
            icon={<ShieldCheckIcon />}
            title="Secure Shopping"
            description="Your data is safe with our top security."
            delay="150ms"
          />

          <FeatureItem
            icon={<TruckIcon />}
            title="Fast Delivery"
            description="Quick delivery at your doorstep."
            delay="300ms"
          />

          <FeatureItem
            icon={<LifebuoyIcon />}
            title="24/7 Support"
            description="We're here to help you anytime."
            delay="450ms"
          />

        </div>

        {/* ===================================================
            SHOPPING ILLUSTRATION
        =================================================== */}

        <div className="relative mt-4 flex items-end justify-end lg:mt-auto lg:justify-center">

          <div className="relative flex h-[120px] w-[200px] items-end justify-center sm:h-[160px] sm:w-[260px]">

            {/* =================================================
                PLANT
            ================================================= */}

            <div className="absolute bottom-[35px] right-[20px] z-20 animate-[floatPlant_4s_ease-in-out_infinite] sm:right-[30px]">

              <div className="relative h-[70px] w-[55px]">

                {/* Stem */}
                <div className="absolute bottom-4 left-1/2 h-10 w-1 -translate-x-1/2 rotate-[8deg] rounded-full bg-green-700" />

                {/* Left Leaf */}
                <span className="absolute left-4 top-4 h-4 w-8 -rotate-[35deg] rounded-full bg-[#58a53b] transition-transform duration-500 hover:scale-110" />

                {/* Right Leaf */}
                <span className="absolute left-6 top-1 h-4 w-7 rotate-[25deg] rounded-full bg-[#78b941] transition-transform duration-500 hover:scale-110" />

                {/* Pot */}
                <div className="absolute bottom-0 left-1/2 h-7 w-10 -translate-x-1/2 rounded-b-md bg-[#b87a3e]" />

              </div>

            </div>

            {/* =================================================
                SHOPPING BAG
            ================================================= */}

            <div className="absolute bottom-[30px] left-[20px] z-10 animate-[floatBag_3.5s_ease-in-out_infinite] sm:left-[40px]">

              <div className="relative h-[85px] w-[70px] rounded-sm bg-[#b8e6c5] shadow-md transition-all duration-500 hover:-translate-y-2 hover:rotate-2 hover:shadow-lg">

                {/* Bag Handle */}
                <div className="absolute -top-7 left-1/2 h-9 w-9 -translate-x-1/2 rounded-t-full border-[4px] border-b-0 border-[#163f36]" />

                {/* Bag Logo */}
                <div className="absolute inset-0 flex items-center justify-center">

                  <span className="animate-pulse text-xl font-bold text-white">
                    S
                  </span>

                </div>

              </div>

            </div>

            {/* =================================================
                BOX
            ================================================= */}

            <div className="absolute bottom-[25px] right-[45px] z-10 animate-[floatBox_4s_ease-in-out_infinite] sm:right-[60px]">

              <div className="h-9 w-14 rotate-[3deg] rounded-sm border border-[#aa7b42] bg-[#d6a75c] shadow-md transition-all duration-500 hover:-translate-y-2 hover:rotate-6">

                {/* Tape */}
                <div className="mx-auto h-full w-1 bg-[#bd8c4a]" />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          CSS ANIMATIONS
      ===================================================== */}

      <style jsx>{`
        @keyframes rotateSlow {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotateSlowReverse {
          from {
            transform: rotate(360deg);
          }

          to {
            transform: rotate(0deg);
          }
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatPlant {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes floatBag {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-7px) rotate(-2deg);
          }
        }

        @keyframes floatBox {
          0%,
          100% {
            transform: translateY(0) rotate(3deg);
          }

          50% {
            transform: translateY(-6px) rotate(5deg);
          }
        }
      `}</style>

    </div>
  );
};

export default LeftSideSignUp;


/* =========================================================
   FEATURE ITEM
========================================================= */

function FeatureItem({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}) {
  return (
    <div
      className="group flex animate-[fadeUp_0.7s_ease-out] items-center gap-3 transition-all duration-300 hover:translate-x-2"
      style={{
        animationDelay: delay,
        animationFillMode: "both",
      }}
    >

      {/* Icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#08785d] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00a957] group-hover:shadow-lg group-hover:shadow-[#00c878]/20">

        <div className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-6">
          {icon}
        </div>

      </div>

      {/* Content */}
      <div>

        <h3 className="text-xs font-bold text-white">
          {title}
        </h3>

        <p className="text-[11px] text-white/80">
          {description}
        </p>

      </div>

    </div>
  );
}