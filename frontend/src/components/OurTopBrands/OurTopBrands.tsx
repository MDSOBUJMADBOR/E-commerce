"use client";

import Link from "next/link";
import {
  SiApple,
  SiSamsung,
  SiNike,
  SiAdidas,
  SiSony,
  SiPuma,
  SiLg,
} from "react-icons/si";

interface Brand {
  name: string;
  icon: React.ElementType;
}

const brands: Brand[] = [
  {
    name: "Apple",
    icon: SiApple,
  },
  {
    name: "Samsung",
    icon: SiSamsung,
  },
  {
    name: "Nike",
    icon: SiNike,
  },
  {
    name: "Adidas",
    icon: SiAdidas,
  },
  {
    name: "Sony",
    icon: SiSony,
  },
  {
    name: "Puma",
    icon: SiPuma,
  },
  {
    name: "LG",
    icon: SiLg,
  },
];

const OurTopBrands = () => {
  return (
    <section className="w-full bg-white py-4">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900 sm:text-base">
            Our Top Brands
          </h2>

          <Link
            href="/brands"
            className="text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700 sm:text-sm"
          >
            View All
          </Link>
        </div>

        {/* Brands */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
          {brands.map((brand) => {
            const Icon = brand.icon;

            return (
              <Link
                key={brand.name}
                href={`/brands/${brand.name.toLowerCase()}`}
                className="
                  group
                  flex
                  h-[52px]
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-4
                  transition-all
                  duration-200
                  hover:border-gray-300
                  hover:shadow-md
                "
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon
                    className="
                      h-6
                      w-6
                      text-black
                      transition-transform
                      duration-200
                      group-hover:scale-105
                    "
                  />

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-gray-900
                    "
                  >
                    {brand.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurTopBrands;