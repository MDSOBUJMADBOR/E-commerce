"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface Category {
  id: number;
  name: string;
  image: string;
  href: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    href: "/shop?category=electronics",
  },
  {
    id: 2,
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    href: "/shop?category=fashion",
  },
  {
    id: 3,
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    href: "/shop?category=shoes",
  },
  {
    id: 4,
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    href: "/shop?category=accessories",
  },
  {
    id: 5,
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80",
    href: "/shop?category=beauty",
  },
  {
    id: 6,
    name: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80",
    href: "/shop?category=home-living",
  },
  {
    id: 7,
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=500&q=80",
    href: "/shop?category=sports",
  },
  {
    id: 8,
    name: "Toys",
    image:
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500&q=80",
    href: "/shop?category=toys",
  },
  {
    id: 9,
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    href: "/shop?category=books",
  },
];

const ShopByCategory = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white py-4 sm:py-5 md:py-6">
      <div className="mx-auto container px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        
        {/* Header */}
        <div className="mb-3 flex items-center justify-between sm:mb-4">
          <h2 className="text-sm font-semibold text-gray-900 sm:text-base md:text-lg">
            Shop by Categories
          </h2>

          <Link
            href="/shop"
            className="text-xs font-medium text-emerald-700 transition-colors hover:text-emerald-900 sm:text-sm"
          >
            View All
          </Link>
        </div>

        {/* Slider */}
        <div className="relative">
          
          {/* Left Arrow */}
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Previous categories"
            className="
              absolute
              left-0
              top-1/2
              z-20
              flex
              h-7
              w-7
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-md
              transition-all
              hover:scale-105
              hover:bg-gray-50
              sm:h-8
              sm:w-8
              md:h-9
              md:w-9
            "
          >
            <ChevronLeft className="h-4 w-4 text-gray-700 md:h-5 md:w-5" />
          </button>

          {/* Categories Container */}
          <div
            ref={scrollRef}
            className="
              scrollbar-hide
              flex
             
              gap-2
              overflow-x-auto
              scroll-smooth
              px-2
              py-1
              sm:gap-3
              md:gap-4
            "
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="
                  group
                  flex
                  shrink-0
                  flex-col
                  items-center
                  justify-between
                  rounded-lg
                  bg-[#f3f4f6]
                  px-2
                  py-2
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#eceef1]
                  hover:shadow-md

                  min-w-[82px]

                  sm:min-w-[105px]
                  md:min-w-[120px]
                  lg:min-w-[135px]
                  xl:min-w-[145px]
                "
              >
                {/* Image */}
                <div
                  className="
                    relative
                    flex
                    h-[55px]
                    w-full
                    items-center
                    justify-center

                    sm:h-[65px]
                    md:h-[75px]
                    lg:h-[80px]
                  "
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 82px,
                           (max-width: 768px) 105px,
                           (max-width: 1024px) 120px,
                           145px"
                    className="
                      object-contain
                      p-1
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* Category Name */}
                <p
                  className="
                    mt-1
                    whitespace-nowrap
                    text-center
                    text-[9px]
                    font-medium
                    text-gray-800

                    sm:mt-1.5
                    sm:text-[11px]

                    md:text-xs
                  "
                >
                  {category.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Next categories"
            className="
              absolute
              right-0
              top-1/2
              z-20
              flex
              h-7
              w-7
              translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-md
              transition-all
              hover:scale-105
              hover:bg-gray-50
              sm:h-8
              sm:w-8
              md:h-9
              md:w-9
            "
          >
            <ChevronRight className="h-4 w-4 text-gray-700 md:h-5 md:w-5" />
          </button>

        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;