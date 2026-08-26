"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
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
    image: "/images/hero/hero-1.png",
    smallTitle: "NEW ARRIVALS",
    titleLine1: "Fresh Picks Just",
    titleLine2: "For You",
    description:
      "Explore the latest trends and bestsellers selected especially for you.",
    buttonText: "Explore Now",
    buttonLink: "/shop",
  },

  {
    id: 2,
    image: "/images/hero/hero-2.png",
    smallTitle: "SPECIAL OFFERS",
    titleLine1: "Exclusive Deals",
    titleLine2: "Just for You!",
    description:
      "Top quality products at unbeatable prices. Discover amazing deals today.",
    buttonText: "Shop Now",
    buttonLink: "/deals",
  },

  {
    id: 3,
    image: "/images/hero/hero-3.png",
    smallTitle: "SUMMER SALE",
    titleLine1: "Upgrade Your",
    titleLine2: "Lifestyle",
    description:
      "Discover the best products, latest collections, and prices you'll love.",
    buttonText: "Shop Now",
    buttonLink: "/shop",
  },
  {
    id: 4,
    image: "/images/hero/hero-4.png",
    smallTitle: "NEW COLLECTION",
    titleLine1: "Style Meets",
    titleLine2: "Comfort",
    description:
      "Explore our latest collection designed to bring comfort and style to your everyday life.",
    buttonText: "Explore",
    buttonLink: "/shop",
  },
];

const HeroSectionPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const slide = slides[current];

  // =========================================================
  // AUTO SLIDER - EVERY 5 SECONDS
  // =========================================================

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);

      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // =========================================================
  // NEXT SLIDE
  // =========================================================

  const nextSlide = () => {
    setDirection(1);

    setCurrent((prev) => (prev + 1) % slides.length);
  };

  // =========================================================
  // PREVIOUS SLIDE
  // =========================================================

  const prevSlide = () => {
    setDirection(-1);

    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // =========================================================
  // GO TO SLIDE
  // =========================================================

  const goToSlide = (index: number) => {
    if (index === current) return;

    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#edf7f2]  ">
      {/* ===================================================== */}
      {/* MAIN CONTAINER */}
      {/* ===================================================== */}

      <div
        className="
          relative
          mx-auto
          container          
          px-5
          
        "
      >
        {/* =================================================== */}
        {/* SLIDER */}
        {/* =================================================== */}

        <div
          className="
            relative
            min-h-[430px]
            sm:min-h-[470px]
            md:min-h-[400px]
            lg:min-h-[450px]
            xl:min-h-[480px]
            2xl:min-h-[510px]
          "
        >
          <AnimatePresence
            initial={false}
            custom={direction}
            mode="wait"
          >
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
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                inset-0
                grid
                grid-cols-1
                items-center
                md:grid-cols-[45%_55%]
                lg:grid-cols-[43%_57%]
                xl:grid-cols-[42%_58%]
              "
            >
              {/* ================================================= */}
              {/* LEFT SIDE - CONTENT */}
              {/* ================================================= */}

              <div
                className="
                  relative
                  z-20
                  order-2
                  flex
                  h-full
                  items-center
                  py-7
                  sm:py-8
                  md:order-1
                  md:py-10
                  lg:py-12
                "
              >
                <div
                  className="
                    w-full
                    max-w-[560px]
                    text-center
                    md:text-left
                  "
                >
                  {/* ================================================= */}
                  {/* SMALL TITLE */}
                  {/* ================================================= */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: 0.15,
                    }}
                    className="
                      mb-2
                      flex
                      items-center
                      justify-center
                      gap-2
                      sm:mb-3
                      md:justify-start
                      lg:mb-4
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-[#159447]
                        sm:h-2
                        sm:w-2
                      "
                    />

                    <span
                      className="
                        text-[9px]
                        font-bold
                        tracking-[0.15em]
                        text-[#177c45]
                        sm:text-[10px]
                        md:text-xs
                        lg:text-sm
                      "
                    >
                      {slide.smallTitle}
                    </span>
                  </motion.div>

                  {/* ================================================= */}
                  {/* MAIN TITLE */}
                  {/* ================================================= */}

                  <motion.h1
                    initial={{
                      opacity: 0,
                      x: direction > 0 ? -30 : 30,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2,
                    }}
                    className="
                      text-[30px]
                      font-extrabold
                      leading-[1.04]
                      tracking-tight
                      text-[#161616]
                      sm:text-[36px]
                      md:text-[38px]
                      lg:text-[46px]
                      xl:text-[52px]
                      2xl:text-[58px]
                    "
                  >
                    {slide.titleLine1}

                    <br />

                    <span className="text-[#159447]">
                      {slide.titleLine2}
                    </span>
                  </motion.h1>

                  {/* ================================================= */}
                  {/* DESCRIPTION */}
                  {/* ================================================= */}

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
                      delay: 0.3,
                    }}
                    className="
                      mx-auto
                      mt-3
                      max-w-[400px]
                      text-[11px]
                      leading-5
                      text-gray-600
                      sm:mt-4
                      sm:text-xs
                      sm:leading-5
                      md:mx-0
                      md:text-sm
                      md:leading-6
                      lg:mt-5
                      lg:text-base
                      lg:leading-7
                    "
                  >
                    {slide.description}
                  </motion.p>

                  {/* ================================================= */}
                  {/* CTA BUTTON */}
                  {/* ================================================= */}

                  <motion.div
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
                      mt-5
                      flex
                      justify-center
                      sm:mt-6
                      md:justify-start
                      lg:mt-7
                    "
                  >
                    <Link
                      href={slide.buttonLink}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-[#159447]
                        px-5
                        py-2.5
                        text-[11px]
                        font-bold
                        text-white
                        shadow-md
                        shadow-green-700/20
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:bg-[#107c3b]
                        hover:shadow-lg
                        sm:px-6
                        sm:py-3
                        sm:text-xs
                        md:px-6
                        md:py-3
                        md:text-sm
                        lg:px-7
                        lg:py-3.5
                      "
                    >
                      <span>{slide.buttonText}</span>

                      <HiArrowRight
                        className="
                          h-4
                          w-4
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </Link>
                  </motion.div>

                  {/* ================================================= */}
                  {/* TRUST TEXT */}
                  {/* ================================================= */}

                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5,
                    }}
                    className="
                      mt-5
                      flex
                      items-center
                      justify-center
                      gap-2
                      text-[9px]
                      text-gray-500
                      sm:text-[10px]
                      md:justify-start
                      md:text-xs
                    "
                  >
                    <span
                      className="
                        flex
                        h-5
                        w-5
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#e1f4e9]
                      "
                    >
                      <span
                        className="
                          h-2
                          w-2
                          rounded-full
                          bg-[#159447]
                        "
                      />
                    </span>

                    <span>
                      Trusted products • Fast delivery • Secure shopping
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* ================================================= */}
              {/* RIGHT SIDE - IMAGE */}
              {/* ================================================= */}

              <div
                className="
                  relative
                  order-1
                  flex
                  h-[220px]
                  w-full
                  items-center
                  justify-center
                  md:order-2
                  md:h-full
                  lg:h-full
                "
              >
                {/* ================================================= */}
                {/* DECORATIVE CIRCLE */}
                {/* ================================================= */}

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                  className="
                    absolute
                    right-[5%]
                    top-1/2
                    h-[80%]
                    w-[70%]
                    -translate-y-1/2
                    rounded-full
                    bg-[#d9eee1]
                    sm:right-[8%]
                    sm:h-[78%]
                    sm:w-[68%]
                    md:right-[7%]
                    md:h-[72%]
                    md:w-[72%]
                    lg:right-[8%]
                    lg:h-[75%]
                    lg:w-[70%]
                    xl:right-[10%]
                    xl:w-[68%]
                  "
                />

                {/* ================================================= */}
                {/* IMAGE */}
                {/* ================================================= */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: direction > 0 ? 70 : -70,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    relative
                    z-10
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                  "
                >
                  <Image
                    src={slide.image}
                    alt={slide.titleLine1}
                    width={900}
                    height={600}
                    priority={current === 0}
                    sizes="
                      (max-width: 640px) 90vw,
                      (max-width: 768px) 70vw,
                      (max-width: 1024px) 55vw,
                      (max-width: 1280px) 55vw,
                      60vw
                    "
                    className="
                      h-auto
                      max-h-[210px]
                      w-[92%]
                      object-contain
                      drop-shadow-[0_18px_25px_rgba(0,0,0,0.12)]
                      sm:max-h-[250px]
                      sm:w-[90%]
                      md:max-h-[300px]
                      md:w-[92%]
                      lg:max-h-[350px]
                      lg:w-[90%]
                      xl:max-h-[390px]
                      xl:w-[88%]
                      2xl:max-h-[420px]
                    "
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* =================================================== */}
          {/* PREVIOUS BUTTON */}
          {/* =================================================== */}

          <button
            type="button"
            aria-label="Previous slide"
            onClick={prevSlide}
            className="
              group
              absolute
              left-1
              top-[24%]
              z-40
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-white/95
              text-gray-700
              shadow-md
              backdrop-blur-sm
              transition-all
              duration-300
              hover:bg-[#159447]
              hover:text-white
              sm:left-2
              sm:h-8
              sm:w-8
              md:left-1
              md:top-1/2
              md:h-9
              md:w-9
              lg:left-2
              lg:h-10
              lg:w-10
            "
          >
            <HiChevronLeft
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:-translate-x-0.5
                sm:h-5
                sm:w-5
              "
            />
          </button>

          {/* =================================================== */}
          {/* NEXT BUTTON */}
          {/* =================================================== */}

          <button
            type="button"
            aria-label="Next slide"
            onClick={nextSlide}
            className="
              group
              absolute
              right-1
              top-[24%]
              z-40
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-white/95
              text-gray-700
              shadow-md
              backdrop-blur-sm
              transition-all
              duration-300
              hover:bg-[#159447]
              hover:text-white
              sm:right-2
              sm:h-8
              sm:w-8
              md:right-1
              md:top-1/2
              md:h-9
              md:w-9
              lg:right-2
              lg:h-10
              lg:w-10
            "
          >
            <HiChevronRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                sm:h-5
                sm:w-5
              "
            />
          </button>

          {/* =================================================== */}
          {/* SLIDER DOTS */}
          {/* =================================================== */}

          <div
            className="
              absolute
              bottom-3
              left-1/2
              z-40
              flex
              -translate-x-1/2
              items-center
              gap-1
              sm:bottom-4
              sm:gap-1.5
              md:bottom-5
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
                <motion.span
                  animate={{
                    width: current === index ? 30 : 7,
                    opacity: current === index ? 1 : 0.4,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="
                    block
                    h-1.5
                    rounded-full
                    bg-[#159447]
                    sm:h-2
                  "
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionPage;