"use client";

import { Avatar, Button, Drawer } from "@heroui/react";
import {  useEffect, useState } from "react";

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
  LogOut,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import RightSide from "./HomePageUi/Navbar/RightSide";
import Middle from "./HomePageUi/Navbar/Middle";
import LeftSide from "./HomePageUi/Navbar/LeftSide";
import { authClient } from "@/lib/auth-client";

interface CartItem {
  _id: string;
  quantity: number;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
   const userEmail = user?.email;

  // ==========================================
  // MENU ITEMS
  // ==========================================

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

  // ==========================================
  // CLOSE MOBILE MENU
  // ==========================================

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // ==========================================
  // FETCH CART COUNT
  // ==========================================

const fetchCartCount = async (email?: string) => {
  if (!email) {
    return 0;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/email/${email}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cart count");
    }

    const data: CartItem[] = await response.json();

    return data.reduce(
      (total, item) =>
        total + (item.quantity || 0),
      0
    );
  } catch (error) {
    console.error("Cart count error:", error);

    return 0;
  }
};

  // ==========================================
  // CART COUNT EFFECT
  // ==========================================

useEffect(() => {
  let ignore = false;

  const loadCartCount = async () => {
    const count = await fetchCartCount(userEmail);

    if (!ignore) {
      setCartCount(count);
    }
  };

  // Event listener
  const handleCartUpdated = async () => {
    const count = await fetchCartCount(userEmail);

    if (!ignore) {
      setCartCount(count);
    }
  };

  window.addEventListener(
    "cartUpdated",
    handleCartUpdated
  );

  // প্রথমবার cart load
  void loadCartCount();

  return () => {
    ignore = true;

    window.removeEventListener(
      "cartUpdated",
      handleCartUpdated
    );
  };
}, [userEmail]);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    await authClient.signOut();

    setCartCount(0);

    // অন্য component-কে জানানো
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <header className="sticky top-0 z-50 bg-gray-50">
      {/* ================================= */}
      {/* DESKTOP NAVBAR */}
      {/* ================================= */}

      <nav className="container mx-auto hidden items-center justify-between gap-2 px-5 py-4 lg:flex">
        <LeftSide />

        <Middle />

        <RightSide cartCount={cartCount} />
      </nav>

      {/* ================================= */}
      {/* MOBILE NAVBAR */}
      {/* ================================= */}

      <div className="block px-4 py-4 lg:hidden">
        {/* ================================= */}
        {/* MOBILE TOP */}
        {/* ================================= */}

        <div className="flex items-center justify-between">
          {/* MENU BUTTON */}

          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              variant="ghost"
              aria-label="Toggle menu"
              onPress={() =>
                setIsMobileMenuOpen((prev) => !prev)
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

          {/* ================================= */}
          {/* MOBILE RIGHT SIDE */}
          {/* ================================= */}

          <div className="flex items-center gap-2">
            {/* WISHLIST */}

            <Link
              href="/wishlist"
              className="group relative flex items-center text-gray-800 transition hover:text-green-600"
            >
              <div className="relative">
                <Heart className="h-7 w-7 stroke-[1.8] transition group-hover:fill-green-50" />

                <span className="absolute -right-2 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[11px] font-bold text-white">
                  3
                </span>
              </div>
            </Link>

            {/* ================================= */}
            {/* CART */}
            {/* ================================= */}

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
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>
            </Link>

            {/* ================================= */}
            {/* AVATAR */}
            {/* ================================= */}

            <Avatar>
              <Avatar.Image
                alt={user?.name || "User"}
                src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
              />

              <Avatar.Fallback>
                {user?.name?.charAt(0) || "U"}
              </Avatar.Fallback>
            </Avatar>
          </div>
        </div>

        {/* ================================= */}
        {/* SEARCH */}
        {/* ================================= */}

        <div className="mt-5">
          <Middle />
        </div>

        {/* ================================= */}
        {/* MOBILE DRAWER */}
        {/* ================================= */}

        <Drawer
          isOpen={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
        >
          <Drawer.Backdrop>
            <Drawer.Content
              placement="left"
              className="max-w-full bg-white"
            >
              <Drawer.Dialog className="h-full">
                {/* ================================= */}
                {/* DRAWER HEADER */}
                {/* ================================= */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Drawer.Header className="flex flex-row justify-between border-b-0 px-1 pb-2">
                    {/* LOGO */}

                    <Link
                      href="/"
                      onClick={closeMobileMenu}
                      className="flex items-center"
                    >
                      <Image
                        src="/images/icons.png"
                        alt="ShopEasy"
                        width={50}
                        height={50}
                      />

                      <span className="text-2xl font-bold italic text-green-600">
                        <span className="text-black">
                          Shop
                        </span>
                        Easy
                      </span>
                    </Link>

                    {/* CLOSE */}

                    <button
                      type="button"
                      aria-label="Close menu"
                      onClick={closeMobileMenu}
                      className="mt-3 flex h-9 w-9 items-center justify-center rounded-full text-gray-900 transition hover:bg-gray-100"
                    >
                      <X
                        className="h-6 w-6"
                        strokeWidth={2}
                      />
                    </button>
                  </Drawer.Header>
                </motion.div>

                {/* ================================= */}
                {/* DRAWER BODY */}
                {/* ================================= */}

                <Drawer.Body className="px-4 pb-6 pt-4">
                  {/* MENU */}

                  <nav className="flex flex-col gap-1">
                    {menuItems.map((item, index) => {
                      const Icon = item.icon;

                      const isActive =
                        item.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.href);

                      return (
                        <motion.div
                          key={item.name}
                          initial={{
                            opacity: 0,
                            x: -25,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            duration: 0.35,
                            delay:
                              0.2 + index * 0.055,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={closeMobileMenu}
                            className={`group flex min-h-[48px] w-full items-center justify-between rounded-lg px-4 transition-all duration-200 ${
                              isActive
                                ? "bg-green-100 font-semibold text-green-800"
                                : "text-gray-900 hover:bg-gray-50"
                            }`}
                          >
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

                            {!isActive && (
                              <ChevronRight
                                className="h-5 w-5 text-gray-500 transition-transform duration-200 group-hover:translate-x-1"
                                strokeWidth={1.8}
                              />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  {/* DIVIDER */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      scaleX: 0,
                    }}
                    animate={{
                      opacity: 1,
                      scaleX: 1,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.65,
                    }}
                    className="my-5 h-px w-full origin-left bg-gray-200"
                  />

                  {/* ================================= */}
                  {/* LOGIN / LOGOUT */}
                  {/* ================================= */}

                  {isPending ? (
                    <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
                  ) : !user ? (
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
                        duration: 0.35,
                        delay: 0.76,
                      }}
                    >
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
                    </motion.div>
                  ) : (
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
                        duration: 0.35,
                        delay: 0.76,
                      }}
                    >
                      <button
                        type="button"
                        onClick={async () => {
                          closeMobileMenu();
                          await handleLogout();
                        }}
                        className="mt-2 flex h-[46px] w-full items-center justify-center gap-3 rounded-2xl border border-red-400 bg-white text-[15px] font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        <LogOut
                          size={17}
                          strokeWidth={1.8}
                        />

                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
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