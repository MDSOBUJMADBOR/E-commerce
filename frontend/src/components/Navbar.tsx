"use client";

import { useState } from "react";
import {
  X,
  ShoppingCart,
  UserCircle,
  Home,
  Grid2X2,
  ShoppingBag,
  Heart,
  Settings,
  CircleHelp,
  Info,
  ChevronRight,
  UserPlus,
  Menu,
} from "lucide-react";

import RightSide from "./HomePageUi/Navbar/RightSide";
import Middle from "./HomePageUi/Navbar/Middle";
import LeftSide from "./HomePageUi/Navbar/LeftSide";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "Home",
      icon: Home,
    },
    {
      name: "Categories",
      icon: Grid2X2,
    },
    {
      name: "Orders",
      icon: ShoppingBag,
    },
    {
      name: "Wishlist",
      icon: Heart,
    },
    {
      name: "Settings",
      icon: Settings,
    },
    {
      name: "Help & Support",
      icon: CircleHelp,
    },
    {
      name: "About Us",
      icon: Info,
    },
  ];

  return (
    <header className="w-full bg-white">
      {/* ================================================= */}
      {/* DESKTOP NAVBAR */}
      {/* ================================================= */}

      <nav className="mx-auto hidden max-w-7xl items-center justify-between gap-6 px-6 py-4 md:flex">
        {/* Left */}
        <LeftSide />

        {/* Middle */}
        <Middle />

        {/* Right */}
        <RightSide />
      </nav>

      {/* ================================================= */}
      {/* MOBILE NAVBAR */}
      {/* ================================================= */}

      <div className="block px-4 py-4 md:hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          {/* Close Button */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full p-1 text-gray-900 transition hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="h-7 w-7" strokeWidth={2} /> : <Menu className="h-7 w-7" strokeWidth={2} />}
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center">
              <span className="text-3xl">🛍️</span>
            </div>

            <span className="text-2xl font-bold text-green-600">
              ShopEasy

            </span>
          </div>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="shrink-0">
          <button
            type="button"
            aria-label="Shopping cart"
            className="relative rounded-full p-2 text-gray-900 hover:text-green-500 transition cursor-pointer"
          >
            <ShoppingCart
              className="h-7 w-7"
              strokeWidth={2}
            />

            {/* Cart Count */}
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-xs font-semibold text-white">
              3
            </span>
          </button>
          </Link>
        </div>

        {/* Search */}
        <div className="mt-5">
          <Middle />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            <div className="mt-6 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
              {/* User Section */}
              <div className="flex items-center gap-4 px-5 py-7">
                {/* User Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-600">
                  <UserCircle
                    className="h-8 w-8 text-white"
                    strokeWidth={1.8}
                  />
                </div>

                {/* User Text */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Hi, Guest
                  </h3>

                  <div className="mt-1 flex items-center gap-1 text-sm">
                    <button
                      type="button"
                      className="font-medium text-green-600"
                    >
                      Sign in
                    </button>

                    <span className="text-gray-400">/</span>

                    <button
                      type="button"
                      className="font-medium text-green-600"
                    >
                      Create account
                    </button>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="px-5">
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.name}
                      type="button"
                      className="flex w-full items-center justify-between border-b border-gray-100 py-5 text-left transition hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <Icon
                          className="h-6 w-6 text-gray-600"
                          strokeWidth={1.8}
                        />

                        <span className="text-sm font-medium text-gray-800">
                          {item.name}
                        </span>
                      </div>

                      <ChevronRight
                        className="h-5 w-5 text-gray-400"
                        strokeWidth={2}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Create Account Button */}
            <Link href="/signup">
            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              <UserPlus className="h-5 w-5" />

              Create Account
            </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;