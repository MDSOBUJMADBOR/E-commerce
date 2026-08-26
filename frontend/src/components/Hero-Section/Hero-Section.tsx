"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiChevronLeft,
  HiChevronRight,
  HiArrowRight,
} from "react-icons/hi2";

interface Slide {
  id: number;
  image: string;
  smallTitle: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/hero/hero-1.jpg",
    smallTitle: "NEW ARRIVALS",
    titleLine1: "Fresh Picks Just",
    titleLine2: "For You",
    description: "Explore the latest trends and bestsellers.",
    buttonText: "Explore Now",
    buttonLink: "/shop",
  },
  {
    id: 2,
    image: "/images/hero/hero-2.jpg",
    smallTitle: "SPECIAL OFFERS",
    titleLine1: "Amazing Deals",
    titleLine2: "Just For You",
    description: "Discover exclusive offers and save more today.",
    buttonText: "Shop Deals",
    buttonLink: "/deals",
  },
  {
    id: 3,
    image: "/images/hero/hero-3.jpg",
    smallTitle: "SHOP SMARTER",
    titleLine1: "Everything You",
    titleLine2: "Love Is Here",
    description: "Find quality products at prices you'll love.",
    buttonText: "Shop Now",
    buttonLink: "/shop",
  },
];

const HeroSectionPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  // ================= AUTO SLIDER =================

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);

      setCurrent((prev) => {
        return (prev + 1) % slides.length;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // ================= NEXT =================

  const nextSlide = () => {
    setDirection(1);

    setCurrent((prev) => {
      return (prev + 1) % slides.length;
    });
  };

  // ================= PREVIOUS =================

  const prevSlide = () => {
    setDirection(-1);

    setCurrent((prev) => {
      return (prev - 1 + slides.length) % slides.length;
    });
  };

  // ================= DOT =================

  const goToSlide = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden bg-[#eaf5ef]">
      {/* ================================================= */}
      {/* MAIN SLIDER */}
      {/* ================================================= */}

      <div className="relative h-[230px] w-full sm:h-[300px] md:h-[380px] lg:h-[460px] xl:h-[500px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{
              x: direction > 0 ? "100%" : "-100%",
            }}
            animate={{
              x: "0%",
            }}
            exit={{
              x: direction > 0 ? "-100%" : "100%",
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            {/* ================================================= */}
            {/* BACKGROUND IMAGE */}
            {/* ================================================= */}

            <Image
              src={slide.image}
              alt={slide.titleLine1}
              fill
              priority={current === 0}
              sizes="100vw"
              className="object-cover"
            />

            {/* ================================================= */}
            {/* LIGHT OVERLAY */}
            {/* ================================================= */}

            <div className="absolute inset-0 bg-white/5" />

            {/* ================================================= */}
            {/* CONTENT */}
            {/* ================================================= */}

            <div className="relative z-10 container mx-auto flex h-full w-full  items-center px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16">
              <motion.div
                initial={{
                  opacity: 0,
                  x: -40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-[520px]"
              >
                {/* Small Title */}

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.25,
                  }}
                  className="
                    mb-2
                    text-[10px]
                    font-bold
                    tracking-wide
                    text-green-700
                    sm:text-xs
                    md:text-sm
                  "
                >
                  {slide.smallTitle}
                </motion.p>

                {/* Main Title */}

                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                  }}
                  className="
                    text-2xl
                    font-extrabold
                    leading-[1.05]
                    tracking-tight
                    text-gray-900
                    sm:text-3xl
                    md:text-4xl
                    lg:text-5xl
                    xl:text-6xl
                  "
                >
                  {slide.titleLine1}
                  <br />

                  <span className="text-green-600">
                    {slide.titleLine2}
                  </span>
                </motion.h1>

                {/* Description */}

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4,
                  }}
                  className="
                    mt-2
                    max-w-md
                    text-[10px]
                    leading-4
                    text-gray-700
                    sm:mt-3
                    sm:text-xs
                    sm:leading-5
                    md:text-sm
                    md:leading-6
                    lg:text-base
                  "
                >
                  {slide.description}
                </motion.p>

                {/* Button */}

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
                    duration: 0.5,
                    delay: 0.5,
                  }}
                  className="mt-3 sm:mt-5 md:mt-6"
                >
                  <Link
                    href={slide.buttonLink}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      bg-green-600
                      px-4
                      py-2
                      text-[10px]
                      font-semibold
                      text-white
                      shadow-md
                      transition-all
                      duration-300
                      hover:bg-green-700
                      hover:shadow-lg
                      sm:gap-2
                      sm:px-5
                      sm:py-2.5
                      sm:text-xs
                      md:px-6
                      md:py-3
                      md:text-sm
                    "
                  >
                    <span>{slide.buttonText}</span>

                    <HiArrowRight
                      className="
                        h-3.5
                        w-3.5
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                        sm:h-4
                        sm:w-4
                      "
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ================================================= */}
        {/* PREVIOUS BUTTON */}
        {/* ================================================= */}

        <button
          type="button"
          aria-label="Previous slide"
          onClick={prevSlide}
          className="
            group
            absolute
            left-2
            top-1/2
            z-30
            flex
            h-8
            w-8
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-gray-800
            shadow-md
            backdrop-blur-sm
            transition-all
            duration-300
            hover:bg-green-600
            hover:text-white
            sm:left-4
            sm:h-10
            sm:w-10
            md:h-11
            md:w-11
            lg:left-6
          "
        >
          <HiChevronLeft
            className="
              h-4
              w-4
              sm:h-5
              sm:w-5
              md:h-6
              md:w-6
              transition-transform
              duration-300
              group-hover:-translate-x-0.5
            "
          />
        </button>

        {/* ================================================= */}
        {/* NEXT BUTTON */}
        {/* ================================================= */}

        <button
          type="button"
          aria-label="Next slide"
          onClick={nextSlide}
          className="
            group
            absolute
            right-2
            top-1/2
            z-30
            flex
            h-8
            w-8
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-gray-800
            shadow-md
            backdrop-blur-sm
            transition-all
            duration-300
            hover:bg-green-600
            hover:text-white
            sm:right-4
            sm:h-10
            sm:w-10
            md:h-11
            md:w-11
            lg:right-6
          "
        >
          <HiChevronRight
            className="
              h-4
              w-4
              sm:h-5
              sm:w-5
              md:h-6
              md:w-6
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          />
        </button>

        {/* ================================================= */}
        {/* DOTS */}
        {/* ================================================= */}

        <div
          className="
            absolute
            bottom-3
            left-1/2
            z-30
            flex
            -translate-x-1/2
            items-center
            gap-1.5
            sm:bottom-5
            sm:gap-2
          "
        >
          {slides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
              className="
                flex
                items-center
                justify-center
                p-1
              "
            >
              <span
                className={`
                  block
                  h-1.5
                  rounded-full
                  transition-all
                  duration-500
                  sm:h-2
                  ${
                    current === index
                      ? "w-7 bg-green-600 sm:w-9"
                      : "w-1.5 bg-white/80 sm:w-2"
                  }
                `}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSectionPage;