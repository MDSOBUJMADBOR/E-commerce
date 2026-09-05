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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSktOEKNhXMZu30Rf4olOvKgmMI0Qd4HdIgrRbh5FkGEw&s=10",
    href: "/shop?category=sports",
  },
  {
    id: 8,
    name: "Toys",
    image:
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500&q=80",
    href: "/shop?category=toys",
  },
];

const ShopByCategory = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -250,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 250,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-6 ">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
            Shop by Categories
          </h2>

          <Link
            href="/shop"
            className="text-xs font-medium text-emerald-600 transition-colors hover:text-emerald-700 sm:text-sm"
          >
            View All
          </Link>
        </div>

        {/* Category Wrapper */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Scroll categories left"
            className="absolute left-[-14px] top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
          >
            <ChevronLeft className="h-4 w-4 text-gray-700" />
          </button>

          {/* Categories */}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth px-1 py-1"
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group min-w-[105px] flex-1 sm:min-w-[120px]"
              >
                <div className="flex h-[92px] items-center justify-center overflow-hidden rounded-lg bg-[#f5f5f7] transition-all duration-200 group-hover:bg-[#eeeeF1] group-hover:shadow-sm sm:h-[100px]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={120}
                    height={100}
                    className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <p className="mt-2 text-center text-[11px] font-medium text-gray-800 sm:text-xs">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Scroll categories right"
            className="absolute right-[-14px] top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
          >
            <ChevronRight className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;