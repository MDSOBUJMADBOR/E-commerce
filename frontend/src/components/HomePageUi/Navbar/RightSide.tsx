"use client";

import Link from "next/link";
import { Heart, ShoppingCart, UserRoundPlus } from "lucide-react";

export default function RightSide() {
  return (
    <div className="flex items-center gap-3">
      {/* Wishlist */}
      <Link
        href="/wishlist"
        className="group relative flex items-center gap-2 text-gray-800 transition hover:text-green-600"
      >
        <div className="relative">
          <Heart
            className="h-7 w-7 stroke-[1.8] transition group-hover:fill-green-50"
          />

          {/* Badge */}
          <span className="absolute -right-2 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[11px] font-bold text-white">
            3
          </span>
        </div>

        <span className="text-base font-semibold">Wishlist</span>
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        className="group relative flex items-center gap-2 text-gray-800 transition hover:text-green-600"
      >
        <div className="relative">
          <ShoppingCart
            className="h-7 w-7 stroke-[1.8] transition group-hover:fill-green-50"
          />

          {/* Badge */}
          <span className="absolute -right-2 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[11px] font-bold text-white">
            2
          </span>
        </div>

        <span className="text-base font-semibold">Cart</span>
      </Link>

      {/* Create Account */}
      <Link
        href="/signup"
        className="flex items-center gap-1 text-sm xl:text-base rounded-lg bg-green-600 px-2 xl:px-3  py-2 xl:py-3   text-white shadow-sm transition-all duration-200 hover:bg-green-700 hover:shadow-md active:scale-95"
      >
        <UserRoundPlus className="h-6 w-6 stroke-[1.8]" />

        <span>Create Account</span>
      </Link>
    </div>
  );
}