
"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Category {
  _id: string;
  name: string;
  description?: string;
  image: string;
  status: boolean;
}

interface CategoryResponse {
  success: boolean;
  data: Category[];
}

const ShopByCategory = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/categories"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const result: CategoryResponse = await response.json();

        if (result.success) {
          const activeCategories = result.data.filter(
            (category) => category.status === true
          );

          setCategories(activeCategories);
        } else {
          throw new Error("Failed to load categories");
        }
      } catch (error) {
        console.error("Category fetch error:", error);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ================= SCROLL LEFT =================
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  // ================= SCROLL RIGHT =================
  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  // ================= CREATE SLUG =================
  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <section className="w-full bg-white py-4 sm:py-5 md:py-6">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">

        {/* ================= HEADER ================= */}
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

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="flex gap-2 overflow-hidden sm:gap-3 md:gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="
                  flex
                  min-w-[82px]
                  shrink-0
                  animate-pulse
                  flex-col
                  items-center
                  rounded-lg
                  bg-gray-100
                  px-2
                  py-2
                  sm:min-w-[105px]
                  md:min-w-[120px]
                  lg:min-w-[135px]
                  xl:min-w-[145px]
                "
              >
                <div
                  className="
                    h-[55px]
                    w-full
                    rounded-md
                    bg-gray-200
                    sm:h-[65px]
                    md:h-[75px]
                    lg:h-[80px]
                  "
                />

                <div className="mt-2 h-3 w-14 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {/* ================= ERROR ================= */}
        {!loading && error && (
          <div className="rounded-lg bg-red-50 px-4 py-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!loading && !error && categories.length === 0 && (
          <div className="rounded-lg bg-gray-50 px-4 py-6 text-center">
            <p className="text-sm text-gray-500">
              No categories available.
            </p>
          </div>
        )}

        {/* ================= CATEGORY SLIDER ================= */}
        {!loading && !error && categories.length > 0 && (
          <div className="relative">

            {/* ================= LEFT BUTTON ================= */}
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

            {/* ================= CATEGORY CONTAINER ================= */}
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
                  key={category._id}
                  href={`/shop?category=${createSlug(category.name)}`}
                  className="
                    group
                    flex
                    min-w-[82px]
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

                    sm:min-w-[105px]
                    md:min-w-[120px]
                    lg:min-w-[135px]
                    xl:min-w-[145px]
                  "
                >
                  {/* ================= IMAGE ================= */}
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
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="
                          h-full
                          w-full
                          object-contain
                          p-1
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-200">
                        <span className="text-[10px] text-gray-400">
                          No Image
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ================= CATEGORY NAME ================= */}
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

            {/* ================= RIGHT BUTTON ================= */}
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
        )}
      </div>
    </section>
  );
};

export default ShopByCategory;

