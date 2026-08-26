
'use client';

import LeftSideSignIn from "./LeftSideSignIn";
import RightSideSignIn from "./RightSideSignIn";



export default function SignInPage() {
  return (
    <div className="relative z-10 flex items-center justify-center w-full min-h-[70dvh] p-2 sm:p-4 lg:p-8 bg-gray-50 ">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl lg:h-[100vh] min-h-[500px] shadow-2xl rounded-3xl overflow-hidden bg-white max-lg:h-auto ">
        {/* Left Side (Desktop Hidden / Mobile Top Banner) */}
       <LeftSideSignIn />

        {/* Right Side (Form) */}
         <RightSideSignIn />

      </div>
    </div>
  );
}