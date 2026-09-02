"use client";

import Link from "next/link";
import { Heart, ShoppingCart, UserRoundPlus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  UserRound,
  Package,
  Settings,
  LogOut,
} from "lucide-react";





export default function RightSide() {

   const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

 const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  console.log(user,'usernavbar');


const pathname = usePathname();


  const handleLogout = async () => {
    await authClient.signOut();
    setProfileOpen(false);
   
  }


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


{
  isPending ? (
    <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />

  ) : !user ? (
    <>
    <Link
        href="/signup"
        className="flex items-center gap-1 text-sm xl:text-base rounded-lg bg-green-600 px-2 xl:px-3  py-2 xl:py-3 font-bold  text-white
              shadow-lg
              shadow-emerald-600/20
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-emerald-700
              hover:shadow-xl
              hover:shadow-emerald-600/25
              active:scale-95
              sm:w-auto"
      >
        <UserRoundPlus className="h-6 w-6 stroke-[1.8]" />
        <span >Create Account</span>
      </Link>
    </> 
  ) : (
<>
<div className="relative" ref={profileRef}>
  {/* Profile Button */}
  <button
    type="button"
    onClick={() => setProfileOpen(!profileOpen)}
    aria-label="Open profile menu"
    className="flex items-center gap-2 rounded-full p-1 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00a957]/20"
  >
    {/* Profile Image */}
    <div className="h-9 w-9 rounded-full bg-[#00a957] p-[2px] transition-transform duration-200 hover:scale-105">
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#eff9f3]">
                  
         <Image
  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEy7pwqmpRqSf5t5v1dCOJsCsYlXeBGjIg3i3Z2HIzvg&s=10"
  alt={user.name || "User"}
  width={36}
  height={36}
  className="h-full w-full rounded-full object-cover"
/>

        
      </div>
    </div>
  </button>

  {/* Profile Dropdown */}
{profileOpen && (
  <div
    className="
      absolute right-0 z-50 mt-3 w-[245px]
      overflow-hidden rounded-lg
      border border-[#e5e7eb]
      bg-white
      shadow-[0_4px_18px_rgba(23,50,77,0.12)]
    "
  >
    {/* User Information */}
    <div className="flex items-center gap-3 border-b border-[#edf0f2] px-4 py-3">


      {/* Name & Email */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#17324d]">
          {user?.name || "sobuj"}
        </p>

        <p className="truncate text-[11px] text-[#68788c]">
          {user?.email || "sobuj@example.com"}
        </p>
      </div>

      {/* Arrow */}
      <span className="text-[#68788c]">›</span>
    </div>

    {/* Menu Items */}
    <div className="py-2">

      {/* My Profile */}
      <Link
        href="/profile"
        onClick={() => setProfileOpen(false)}
        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 ${
          pathname === "/profile"
            ? "bg-[#eff9f3] font-semibold text-[#00a957]"
            : "text-[#374151] hover:bg-[#f7f9fa]"
        }`}
      >
        <UserRound
          size={17}
          strokeWidth={1.8}
          className={
            pathname === "/profile"
              ? "text-[#00a957]"
              : "text-[#596777]"
          }
        />

        <span>My Profile</span>
      </Link>

      {/* My Orders */}
      <Link
        href="/orders"
        onClick={() => setProfileOpen(false)}
        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 ${
          pathname === "/orders"
            ? "bg-[#eff9f3] font-semibold text-[#00a957]"
            : "text-[#374151] hover:bg-[#f7f9fa]"
        }`}
      >
        <Package
          size={17}
          strokeWidth={1.8}
          className={
            pathname === "/orders"
              ? "text-[#00a957]"
              : "text-[#596777]"
          }
        />

        <span>My Orders</span>
      </Link>

      {/* Wishlist */}
      <Link
        href="/wishlist"
        onClick={() => setProfileOpen(false)}
        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 ${
          pathname === "/wishlist"
            ? "bg-[#eff9f3] font-semibold text-[#00a957]"
            : "text-[#374151] hover:bg-[#f7f9fa]"
        }`}
      >
        <Heart
          size={17}
          strokeWidth={1.8}
          className={
            pathname === "/wishlist"
              ? "text-[#00a957]"
              : "text-[#596777]"
          }
        />

        <span>Wishlist</span>
      </Link>

      {/* Settings */}
      <Link
        href="/settings"
        onClick={() => setProfileOpen(false)}
        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 ${
          pathname === "/settings"
            ? "bg-[#eff9f3] font-semibold text-[#00a957]"
            : "text-[#374151] hover:bg-[#f7f9fa]"
        }`}
      >
        <Settings
          size={17}
          strokeWidth={1.8}
          className={
            pathname === "/settings"
              ? "text-[#00a957]"
              : "text-[#596777]"
          }
        />

        <span>Settings</span>
      </Link>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="
          flex w-full items-center gap-3
          px-4 py-2.5
          text-left text-sm
          text-[#ff3b30]
          transition-colors duration-200
          hover:bg-[#fff5f4]
        "
      >
        <LogOut size={17} strokeWidth={1.8} />
        <span>Logout</span>
      </button>

    </div>
  </div>
)}
</div>


</>
  )
}

      



    </div>
  );
}