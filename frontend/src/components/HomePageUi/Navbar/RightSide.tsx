"use client";

import Link from "next/link";
import { Heart, ShoppingCart, UserRoundPlus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRef, useState } from "react";







export default function RightSide() {

   const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

 const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  console.log(user,'usernavbar');



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
        {user?.image ? (
          <img
            src={user.image }
            alt={user.name || "User"}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          
          <img
            src={"https://i.ibb.co.com/gZbTBWNS/sobuj.jpg"}
            alt={user.name || "User"}
            className="h-full w-full rounded-full object-cover"
          />

        )}
      </div>
    </div>
  </button>

  {/* Profile Dropdown */}
  {profileOpen && (
    <div
      className="
        absolute right-0 z-50 mt-3 w-60
        overflow-hidden rounded-xl
        border border-[#dfe4e8]
        bg-white
        p-2
        shadow-[0_10px_35px_rgba(23,50,77,0.15)]
        animate-fade-in
      "
    >
      {/* User Information */}
      <div className="mb-2 border-b border-[#e8ecef] px-3 py-3">
        <p className="text-[11px] font-medium text-[#788596]">
          Signed in as
        </p>

        <p className="mt-1 truncate text-sm font-bold text-[#17324d]">
          {user?.name}
        </p>

        <p className="mt-0.5 truncate text-[11px] text-[#68788c]">
          {user?.email}
        </p>
      </div>

      {/* Dashboard Button */}
      <Link
        href="/dashboard/user/overview"
        onClick={() => setProfileOpen(false)}
        className="block mb-2"
      >
        <button
          type="button"
          className="
            w-full rounded-lg
            bg-[#eff9f3]
            py-2.5
            text-xs font-semibold
            text-[#00a957]
            cursor-pointer
            transition-all duration-200
            hover:bg-[#e1f5e9]
            hover:text-[#008f4c]
          "
        >
          Dashboard
        </button>
      </Link>

      {/* Logout Button */}
      <button
        type="button"
        onClick={handleLogout}
        className="
          block w-full
          rounded-lg
          bg-[#fff1f1]
          px-4 py-2.5
          text-center
          text-xs font-semibold
          text-[#dc3545]
          cursor-pointer
          transition-all duration-200
          hover:bg-[#ffe2e2]
        "
      >
        Log Out
      </button>
    </div>
  )}
</div>


</>
  )
}

      



    </div>
  );
}