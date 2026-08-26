"use client";

import Link from "next/link";

import {
  ShoppingBagIcon,
  ShieldCheckIcon,
  TruckIcon,
  LifebuoyIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const LeftSideSignIn = () => {
  return (
    <div className="relative flex min-h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#00392d] via-[#004d3c] to-[#00664f] p-6 text-white sm:p-8 lg:w-1/2 lg:p-12">

      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================= */}

      {/* Large Glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border border-emerald-300/10 animate-[slowPulse_5s_ease-in-out_infinite]" />

      {/* Medium Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-[330px] w-[330px] rounded-full border border-emerald-300/10 animate-[slowPulse_4s_ease-in-out_infinite]" />

      {/* Small Glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-[230px] w-[230px] rounded-full border border-emerald-300/10 animate-[slowPulse_3s_ease-in-out_infinite]" />

      {/* Bottom Glow */}
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[350px] w-[350px] rounded-full bg-emerald-400/5 blur-3xl" />

      {/* =========================================================
          BACKGROUND DOTS
      ========================================================= */}

      <div className="pointer-events-none absolute bottom-3 left-3 grid grid-cols-6 gap-2 opacity-50">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className="h-1 w-1 rounded-full bg-[#00c878] animate-[dotPulse_2s_ease-in-out_infinite]"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          />
        ))}
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative z-10 flex h-full flex-col justify-between">

        {/* =======================================================
            LOGO
        ======================================================= */}

        <div className="hidden lg:block">

          <Link
            href="/"
            className="group inline-flex items-center gap-3"
          >

            {/* Logo Box */}
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#00bd68] to-[#008c4c] shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">

              {/* Shine */}
              <span className="absolute -left-10 top-0 h-full w-6 rotate-12 bg-white/20 transition-all duration-700 group-hover:left-14" />

              <ShoppingBagIcon className="relative z-10 h-7 w-7 text-white transition-transform duration-500 group-hover:scale-110" />

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

        {/* =======================================================
            HERO TEXT
        ======================================================= */}

        <div className="mt-2 max-w-[380px] animate-[fadeUp_0.9s_ease-out] lg:mt-8">

          <div className="mb-3 h-1 w-12 rounded-full bg-[#00c878]" />

          <h1 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-[36px]">

            Shop Smarter,
            <br />

            <span className="inline-block text-[#00c878] animate-[textGlow_3s_ease-in-out_infinite]">
              Live Better.
            </span>

          </h1>

          <p className="mt-2 max-w-[360px] text-xs leading-5 text-white/90 sm:text-sm">
            Create your account and enjoy exclusive deals,
            fast delivery, and more.
          </p>

        </div>

        {/* =======================================================
            FEATURES
        ======================================================= */}

        <div className="mt-6 hidden space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm lg:block">

          <FeatureItem
            icon={<TagIcon />}
            title="Best Prices"
            description="Get the best prices on top quality products."
          />

          <FeatureItem
            icon={<ShieldCheckIcon />}
            title="Secure Shopping"
            description="Your data is safe with our top security."
          />

          <FeatureItem
            icon={<TruckIcon />}
            title="Fast Delivery"
            description="Quick delivery at your doorstep."
          />

          <FeatureItem
            icon={<LifebuoyIcon />}
            title="24/7 Support"
            description="We're here to help you anytime."
          />

        </div>

        {/* =======================================================
            ILLUSTRATION
        ======================================================= */}

        <div className="relative mt-4 flex items-end justify-end lg:mt-auto lg:justify-center">

          <div className="relative flex h-[120px] w-[200px] items-end justify-center sm:h-[160px] sm:w-[260px]">

            {/* =================================================
                GROUND SHADOW
            ================================================= */}

            <div className="absolute bottom-[18px] left-1/2 h-3 w-[150px] -translate-x-1/2 rounded-full bg-black/20 blur-md animate-[shadowPulse_3s_ease-in-out_infinite]" />

            {/* =================================================
                PLANT
            ================================================= */}

            <div className="absolute bottom-[35px] right-[20px] z-20 scale-75 sm:right-[30px] sm:scale-100 animate-[float_4s_ease-in-out_infinite]">

              <div className="relative h-[70px] w-[55px]">

                {/* Stem */}
                <div className="absolute bottom-4 left-1/2 h-10 w-1 -translate-x-1/2 rotate-[8deg] rounded-full bg-green-700" />

                {/* Left Leaf */}
                <span className="absolute left-4 top-4 h-4 w-8 -rotate-[35deg] rounded-full bg-[#58a53b] animate-[leafMove_3s_ease-in-out_infinite]" />

                {/* Right Leaf */}
                <span className="absolute left-6 top-1 h-4 w-7 rotate-[25deg] rounded-full bg-[#78b941] animate-[leafMove_3s_ease-in-out_infinite_reverse]" />

                {/* Pot */}
                <div className="absolute bottom-0 left-1/2 h-7 w-10 -translate-x-1/2 rounded-b-md bg-[#b87a3e] shadow-md" />

              </div>

            </div>

            {/* =================================================
                SHOPPING BAG
            ================================================= */}

            <div className="absolute bottom-[30px] left-[20px] z-10 scale-75 sm:left-[40px] sm:scale-100 animate-[bagFloat_3.5s_ease-in-out_infinite]">

              <div className="relative h-[85px] w-[70px] rounded-sm bg-gradient-to-br from-[#d1f2d9] to-[#9bd8ad] shadow-xl">

                {/* Handle */}
                <div className="absolute -top-7 left-1/2 h-9 w-9 -translate-x-1/2 rounded-t-full border-[4px] border-b-0 border-[#163f36]" />

                {/* Bag Highlight */}
                <div className="absolute left-0 top-0 h-full w-3 bg-white/20" />

                {/* Logo */}
                <div className="absolute inset-0 flex items-center justify-center">

                  <span className="text-xl font-black text-white drop-shadow">
                    S
                  </span>

                </div>

              </div>

            </div>

            {/* =================================================
                BOX
            ================================================= */}

            <div className="absolute bottom-[25px] right-[45px] z-10 scale-75 sm:right-[60px] sm:scale-100 animate-[boxFloat_4s_ease-in-out_infinite]">

              <div className="relative h-9 w-14 rotate-[3deg] rounded-sm border border-[#aa7b42] bg-gradient-to-br from-[#e2b96d] to-[#c69248] shadow-md">

                {/* Tape */}
                <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 bg-[#bd8c4a]" />

                {/* Box highlight */}
                <div className="absolute left-0 top-0 h-full w-2 bg-white/10" />

              </div>

            </div>

            {/* =================================================
                SMALL DECORATIVE DOTS
            ================================================= */}

            <span className="absolute bottom-[80px] left-[10px] h-2 w-2 rounded-full bg-[#00c878] animate-ping" />

            <span className="absolute right-[20px] top-[25px] h-2 w-2 rounded-full bg-[#8affc5] animate-pulse" />

          </div>

        </div>

      </div>

      {/* =========================================================
          CUSTOM ANIMATION
      ========================================================= */}

      <style jsx>{`

        /* Hero entrance */
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(25px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Glow circles */
        @keyframes slowPulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }

          50% {
            opacity: 0.8;
            transform: scale(1.04);
          }
        }

        /* Text glow */
        @keyframes textGlow {
          0%,
          100% {
            text-shadow: 0 0 0 rgba(0, 200, 120, 0);
          }

          50% {
            text-shadow: 0 0 18px rgba(0, 200, 120, 0.35);
          }
        }

        /* Dots */
        @keyframes dotPulse {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(0.8);
          }

          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        /* Plant */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-9px);
          }
        }

        /* Bag */
        @keyframes bagFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-7px) rotate(-2deg);
          }
        }

        /* Box */
        @keyframes boxFloat {
          0%,
          100% {
            transform: translateY(0) rotate(3deg);
          }

          50% {
            transform: translateY(-5px) rotate(1deg);
          }
        }

        /* Leaves */
        @keyframes leafMove {
          0%,
          100% {
            transform: rotate(-35deg);
          }

          50% {
            transform: rotate(-28deg);
          }
        }

        /* Ground shadow */
        @keyframes shadowPulse {
          0%,
          100% {
            transform: translateX(-50%) scaleX(1);
            opacity: 0.3;
          }

          50% {
            transform: translateX(-50%) scaleX(0.75);
            opacity: 0.15;
          }
        }

      `}</style>

    </div>
  );
};

export default LeftSideSignIn;


/* =========================================================
   FEATURE ITEM
========================================================= */

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex cursor-default items-center gap-3 rounded-xl p-2 transition-all duration-300 hover:translate-x-2 hover:bg-white/5">

      {/* Icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#08785d] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00c878] group-hover:shadow-[0_0_18px_rgba(0,200,120,0.25)]">

        <div className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-6">
          {icon}
        </div>

      </div>

      {/* Text */}
      <div>

        <h3 className="text-xs font-bold text-white transition-colors duration-300 group-hover:text-[#00c878]">
          {title}
        </h3>

        <p className="text-[11px] text-white/70 transition-colors duration-300 group-hover:text-white/90">
          {description}
        </p>

      </div>

    </div>
  );
}