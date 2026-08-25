"use client";

import { Avatar, Button, Drawer } from "@heroui/react";
import { useState } from "react";

import {
  X,
  ShoppingCart,
  Home,
  Grid2X2,
  ShoppingBag,
  Heart,
  CircleHelp,
  Info,
  UserPlus,
  Menu,
  ChevronRight,
  Flame,
  LogIn,
  Gift,
} from "lucide-react";

import Link from "next/link";

import RightSide from "./HomePageUi/Navbar/RightSide";
import Middle from "./HomePageUi/Navbar/Middle";
import LeftSide from "./HomePageUi/Navbar/LeftSide";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const pathname = usePathname();

  // ================= MENU ITEMS =================

  const menuItems = [
    {
      name: "Home",
      icon: Home,
      href: "/",
    },
    {
      name: "Shop",
      icon: ShoppingBag,
      href: "/shop",
    },
    {
      name: "Categories",
      icon: Grid2X2,
      href: "/categories",
    },
    {
      name: "Deals / Offers",
      icon: Flame,
      href: "/deals",
    },
    {
      name: "About Us",
      icon: Info,
      href: "/about",
    },
    {
      name: "Contact Us",
      icon: Heart,
      href: "/contact",
    },
    {
      name: "Help Center",
      icon: CircleHelp,
      href: "/help",
    },
  ];

  // ================= CLOSE DRAWER =================

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border bg-gray-50">
      {/* ================================================= */}
      {/* DESKTOP NAVBAR */}
      {/* ================================================= */}

      <nav className="container mx-auto hidden items-center justify-between gap-2 px-10 py-4 lg:flex">
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

      <div className="block px-4 py-4 lg:hidden">
        {/* ================================================= */}
        {/* MOBILE TOP HEADER */}
        {/* ================================================= */}

        <div className="flex items-center justify-between">
          {/* ================= LEFT SIDE ================= */}

          <div className="flex items-center gap-2">
            {/* Menu Button */}

            <Button
              isIconOnly
              variant="ghost"
              aria-label="Toggle menu"
              onPress={() =>
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
              className="rounded-full p-1 text-gray-900"
            >
              {isMobileMenuOpen ? (
                <X
                  className="h-7 w-7"
                  strokeWidth={2}
                />
              ) : (
                <Menu
                  className="h-7 w-7"
                  strokeWidth={2}
                />
              )}
            </Button>


          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="flex items-center gap-2">
            {/* ================= WISHLIST ================= */}

            <Link
              href="/wishlist"
              className="group relative flex items-center text-gray-800 transition hover:text-green-600"
            >
              <div className="relative">
                <Heart
                  className="h-7 w-7 stroke-[1.8] transition group-hover:fill-green-50"
                />

                {/* Wishlist Badge */}

                <span className="absolute -right-2 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[11px] font-bold text-white">
                  3
                </span>
              </div>
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

                {/* Cart Badge */}

                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-xs font-semibold text-white">
                  3
                </span>
              </button>
            </Link>

            {/* ================= AVATAR ================= */}

            <Avatar>
              <Avatar.Image
                alt="John Doe"
                src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
              />

              <Avatar.Fallback>
                JD
              </Avatar.Fallback>
            </Avatar>
          </div>
        </div>

        {/* ================================================= */}
        {/* SEARCH */}
        {/* ================================================= */}

        <div className="mt-5">
          <Middle />
        </div>

        {/* ================================================= */}
        {/* MOBILE DRAWER */}
        {/* ================================================= */}

        <Drawer
          isOpen={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
        >
          <Drawer.Backdrop>
            <Drawer.Content
              placement="left"
              className=" max-w-full bg-white"
            >
              <Drawer.Dialog className="h-full">
                {/* ================================================= */}
                {/* DRAWER HEADER */}
                {/* ================================================= */}

                <Drawer.Header className="flex  flex-row justify-between border-b-0 px-1 pb-2 
                ">
                  {/* ================= LOGO ================= */}

                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="flex items-center "
                  >
                    {/* Logo Icon */}

<Image
  src="/images/icons.png"
  alt="Product"
  width={50}
  height={50}
/>




                    {/* Logo Text */}

                    <span className="text-2xl font-bold italic text-green-600">
                     <span className="text-black">Shop</span>Easy
                    </span>
                  </Link>

                  {/* ================= CLOSE BUTTON ================= */}

                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={closeMobileMenu}
                    className="flex h-9 w-9 mt-3 items-center justify-center rounded-full text-gray-900 transition hover:bg-gray-100"
                  >
                    <X
                      className="h-6 w-6"
                      strokeWidth={2}
                    />
                  </button>
                </Drawer.Header>

                {/* ================================================= */}
                {/* DRAWER BODY */}
                {/* ================================================= */}

                <Drawer.Body className="px-4 pb-6 pt-4">
                  {/* ================================================= */}
                  {/* MENU ITEMS */}
                  {/* ================================================= */}

                  <nav className="flex flex-col gap-1">
  {menuItems.map((item) => {
    const Icon = item.icon;

    const isActive =
      item.href === "/"
        ? pathname === "/"
        : pathname.startsWith(item.href);

    return (
      <Link
        key={item.name}
        href={item.href}
        onClick={closeMobileMenu}
        className={`group flex min-h-[48px] w-full items-center justify-between rounded-lg px-4 transition-all ${
          isActive
            ? "bg-green-100 text-green-800 font-semibold"
            : "text-gray-900 hover:bg-gray-50"
        }`}
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          <Icon
            className={`h-[21px] w-[21px] ${
              isActive
                ? "text-green-700"
                : "text-gray-900"
            }`}
            strokeWidth={1.9}
          />

          <span
            className={`text-[15px] ${
              isActive
                ? "font-semibold text-green-900"
                : "font-medium text-gray-900"
            }`}
          >
            {item.name}
          </span>
        </div>

        {/* Right Arrow */}
        {!isActive && (
          <ChevronRight
            className="h-5 w-5 text-gray-500"
            strokeWidth={1.8}
          />
        )}
      </Link>
    );
  })}
</nav>

                  {/* ================================================= */}
                  {/* DIVIDER */}
                  {/* ================================================= */}

                  <div className="my-5 h-px w-full bg-gray-200" />

                  {/* ================================================= */}
                  {/* LOGIN BUTTON */}
                  {/* ================================================= */}

                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="flex h-[46px] w-full items-center justify-center gap-3 rounded-2xl bg-green-600 text-[15px] font-semibold text-white shadow-sm transition hover:bg-green-700"
                  >
                    <LogIn
                      className="h-5 w-5"
                      strokeWidth={2}
                    />

                    <span>Login</span>
                  </Link>

                  {/* ================================================= */}
                  {/* CREATE ACCOUNT */}
                  {/* ================================================= */}

                  <Link
                    href="/signup"
                    onClick={closeMobileMenu}
                    className="mt-2 flex h-[46px] w-full items-center justify-center gap-3 rounded-2xl border border-gray-400 bg-white text-[15px] font-semibold text-gray-900 transition hover:bg-gray-50"
                  >
                    <UserPlus
                      className="h-5 w-5"
                      strokeWidth={2}
                    />

                    <span>Create Account</span>
                  </Link>

                  {/* ================================================= */}
                  {/* PROMOTIONAL CARD */}
                  {/* ================================================= */}

                  <div className="mt-8 flex min-h-[96px] items-center gap-3 rounded-xl bg-orange-50 px-4 py-4">
                    {/* Gift */}

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center">
                      <Gift
                        className="h-12 w-12 text-orange-500"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Text */}

                    <div>
                      <h3 className="text-[15px] font-bold text-red-700">
                        Join ShopEasy
                      </h3>

                      <p className="mt-0.5 text-[12px] leading-5 text-red-800">
                        Create an account to get
                        <br />
                        exclusive offers!
                      </p>
                    </div>
                  </div>
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </header>
  );
};

export default Navbar;