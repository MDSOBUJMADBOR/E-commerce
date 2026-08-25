
'use client';

import LeftSideSignUp from "./LeftSideSignUp";
import RightSideSignUp from "./RightSideSignUp";

export default function SignUpPage() {
  return (
    <div className="relative z-10 flex items-center justify-center w-full min-h-[70dvh] p-2 sm:p-4 lg:p-8 bg-gray-50 border">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl lg:h-[70vh] min-h-[500px] shadow-2xl rounded-3xl overflow-hidden bg-white max-lg:h-auto ">
        {/* Left Side (Desktop Hidden / Mobile Top Banner) */}
        <LeftSideSignUp />

        {/* Right Side (Form) */}
        <RightSideSignUp />
      </div>
    </div>
  );
}