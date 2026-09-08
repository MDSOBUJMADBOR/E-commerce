"use client";

import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  UserRoundPlus,
  UserRound,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

import Image from "next/image";



interface RightSideProps {
  cartCount: number;
}


export default function RightSide({
  cartCount,
}: RightSideProps) {

  const [profileOpen, setProfileOpen] =
    useState(false);

 

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const user = session?.user;


  const handleLogout = async () => {
    await authClient.signOut();

    setProfileOpen(false);
  };


  return (
    <div className="flex items-center gap-5">

      {/* ================= WISHLIST ================= */}

      <Link
        href="/wishlist"
        className="group relative flex items-center gap-2 text-gray-800 transition hover:text-green-600"
      >
        <div className="relative">

          <Heart className="h-7 w-7 stroke-[1.8]" />

          <span className="absolute -right-2 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[11px] font-bold text-white">
            3
          </span>

        </div>

        <span className="text-base font-semibold">
          Wishlist
        </span>

      </Link>


      {/* ================= CART ================= */}

<Link href="/cart">

  <button
    type="button"
    aria-label="Shopping cart"
    className="relative rounded-full p-2 text-gray-900 transition hover:text-green-500"
  >

    <ShoppingCart
      className="h-7 w-7"
      strokeWidth={2}
    />

    {cartCount > 0 && (

      <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-xs font-semibold text-white">

        {cartCount > 99
          ? "99+"
          : cartCount}

      </span>

    )}

  </button>

</Link>


      {/* ================= USER ================= */}

      {isPending ? (

        <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />

      ) : !user ? (

        <Link
          href="/signup"
          className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 font-bold text-white transition hover:bg-green-700"
        >

          <UserRoundPlus className="h-6 w-6" />

          <span>
            Create Account
          </span>

        </Link>

      ) : (

        <div className="relative">

          {/* Profile Button */}

          <button
            type="button"
            onClick={() =>
              setProfileOpen(!profileOpen)
            }
            className="cursor-pointer rounded-full border-2"
          >

            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEy7pwqmpRqSf5t5v1dCOJsYlXeBGjIg3i3Z2HIzvg&s=10"
              alt={user.name || "User"}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />

          </button>


          {/* Dropdown */}

          {profileOpen && (

            <div className="absolute right-0 z-50 mt-3 w-[245px] overflow-hidden rounded-lg border bg-white shadow-lg">

              <div className="border-b px-4 py-3">

                <p className="font-semibold">
                  {user.name || "User"}
                </p>

                <p className="truncate text-xs text-gray-500">
                  {user.email}
                </p>

              </div>


              <div className="py-2">

                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                >
                  <UserRound size={17} />
                  My Profile
                </Link>


                <Link
                  href="/orders"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                >
                  <Package size={17} />
                  My Orders
                </Link>


                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                >
                  <Heart size={17} />
                  Wishlist
                </Link>


                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                >
                  <Settings size={17} />
                  Settings
                </Link>


                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50"
                >
                  <LogOut size={17} />

                  Logout

                </button>

              </div>

            </div>

          )}

        </div>

      )}

    </div>
  );
}