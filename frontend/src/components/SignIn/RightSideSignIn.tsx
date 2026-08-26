"use client";

import { useState } from "react";
import Link from "next/link";

import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  UserPlusIcon,
  ArrowRightIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const RightSideSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // ============================================
  // SIGN IN HANDLER
  // ============================================

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Save email for success screen
    setUserEmail(email);

    // Console data
    console.log("========== SIGN IN DATA ==========");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
    console.log("==================================");

    // Show success UI
    setIsSuccess(true);
  };

  // ============================================
  // SOCIAL SIGN-IN HANDLERS
  // ============================================

  const googleSignIn = () => {
    alert("Google Sign In clicked");
  };

  const facebookSignIn = () => {
    alert("Facebook Sign In clicked");
  };

  const appleSignIn = () => {
    alert("Apple Sign In clicked");
  };

  // ============================================
  // FORGOT PASSWORD
  // ============================================

  const forgotPassword = () => {
    alert("Forgot Password clicked");
  };

  // ============================================
  // BACK TO SIGN IN
  // ============================================

  const backToSignIn = () => {
    setIsSuccess(false);
  };

  return (
    <div className="relative flex min-h-full w-full items-center justify-center overflow-hidden px-4 py-6 sm:px-6 sm:py-8 lg:w-1/2 lg:px-8">

      {/* ============================================
          BACKGROUND DECORATION
      ============================================ */}

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full border border-[#00a957]/10" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-52 w-52 rounded-full border border-[#00a957]/10" />

      <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full border border-[#00a957]/10" />

      {/* ============================================
          MAIN CONTENT
      ============================================ */}

      <div className="relative z-10 w-full bg-white">

        {/* ============================================
            SUCCESS UI
        ============================================ */}

        {isSuccess ? (
          <SuccessScreen
            email={userEmail}
            onBack={backToSignIn}
          />
        ) : (

          /* ============================================
              SIGN IN FORM
          ============================================ */

          <>

            {/* ============================================
                LOCK ICON
            ============================================ */}

            <div className="mb-4 flex justify-center sm:mb-3">

              <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#eff9f3]">

                <div className="flex h-12 w-12 items-center justify-center">
                  <LockIcon />
                </div>

              </div>

            </div>

            {/* ============================================
                HEADING
            ============================================ */}

            <div className="mb-7 text-center">

              <h2 className="text-[27px] font-bold leading-tight text-[#17324d] sm:text-[29px]">
                Welcome Back!
              </h2>

              <p className="mt-2 text-[13px] leading-5 text-[#68788c] sm:text-sm">
                Glad to see you again. Please{" "}
                <Link
                  href="/signin"
                  className="font-medium text-[#00a957] transition hover:text-[#008d49]"
                >
                  sign in
                </Link>{" "}
                to continue.
              </p>

            </div>

            {/* ============================================
                FORM
            ============================================ */}

            <form
              onSubmit={handleSubmit}
              className="space-y-3"
            >

              {/* ============================================
                  EMAIL
              ============================================ */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-[7px] block text-[13px] font-semibold text-[#19334d]"
                >
                  Email Address
                </label>

                <div className="relative">

                  <EnvelopeIcon
                    className="absolute left-3.5 top-1/2 h-[19px] w-[19px] -translate-y-1/2 text-[#657286]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="h-[46px] w-full rounded-[8px] border border-[#dfe4e8] bg-white pl-11 pr-4 text-[13px] text-[#26384d] outline-none transition placeholder:text-[#8b96a5] focus:border-[#00a957] focus:ring-2 focus:ring-[#00a957]/10"
                  />

                </div>

              </div>

              {/* ============================================
                  PASSWORD
              ============================================ */}

              <div>

                <label
                  htmlFor="password"
                  className="mb-[7px] block text-[13px] font-semibold text-[#19334d]"
                >
                  Password
                </label>

                <div className="relative">

                  <LockClosedIcon
                    className="absolute left-3.5 top-1/2 h-[19px] w-[19px] -translate-y-1/2 text-[#657286]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    className="h-[46px] w-full rounded-[8px] border border-[#dfe4e8] bg-white pl-11 pr-12 text-[13px] text-[#26384d] outline-none transition placeholder:text-[#8b96a5] focus:border-[#00a957] focus:ring-2 focus:ring-[#00a957]/10"
                  />

                  {/* Show / Hide Password */}

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#667386] transition hover:text-[#00a957]"
                  >

                    {showPassword ? (
                      <EyeSlashIcon className="h-[19px] w-[19px]" />
                    ) : (
                      <EyeIcon className="h-[19px] w-[19px]" />
                    )}

                  </button>

                </div>

              </div>

              {/* ============================================
                  REMEMBER + FORGOT PASSWORD
              ============================================ */}

              <div className="flex items-center justify-between pt-[1px]">

                <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#26384d]">

                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                    className="h-[17px] w-[17px] cursor-pointer accent-[#00a957]"
                  />

                  <span>
                    Remember me
                  </span>

                </label>

                <Link
                  href="/signin"
                  onClick={forgotPassword}
                  className="text-[13px] font-semibold text-[#00a957] transition hover:text-[#008d49]"
                >
                  Forgot Password?
                </Link>

              </div>

              {/* ============================================
                  SIGN IN BUTTON
              ============================================ */}

              <button
                type="submit"
                className="mt-1 flex h-[43px] w-full items-center justify-center gap-2 rounded-[7px] bg-[#00a957] text-[14px] font-semibold text-white shadow-sm transition duration-200 hover:bg-[#00984e] hover:shadow-md active:scale-[0.99]"
              >

                <UserPlusIcon className="h-[19px] w-[19px]" />

                <span>
                  Sign In
                </span>

              </button>

            </form>

            {/* ============================================
                DIVIDER
            ============================================ */}

            <div className="my-[24px] flex items-center gap-4">

              <div className="h-px flex-1 bg-[#e0e5e8]" />

              <span className="whitespace-nowrap text-[12px] text-[#788596]">
                or continue with
              </span>

              <div className="h-px flex-1 bg-[#e0e5e8]" />

            </div>

            {/* ============================================
                SOCIAL BUTTONS
            ============================================ */}

            <div className="grid grid-cols-3 gap-2.5">

              <SocialButton
                provider="Google"
                icon={<GoogleIcon />}
                onClick={googleSignIn}
              />

              <SocialButton
                provider="Facebook"
                icon={<FacebookIcon />}
                onClick={facebookSignIn}
              />

              <SocialButton
                provider="Apple"
                icon={<AppleIcon />}
                onClick={appleSignIn}
              />

            </div>

            {/* ============================================
                CREATE ACCOUNT
            ============================================ */}

            <p className="mt-[25px] text-center text-[13px] text-[#68788c] sm:text-sm">

              Don&apos;t have an account?{" "}

              <Link
                href="/signup"
                className="font-semibold text-[#00a957] transition hover:text-[#008d49]"
              >
                Create Account
              </Link>

            </p>

          </>
        )}

      </div>
    </div>
  );
};

export default RightSideSignIn;


/* =========================================================
   SUCCESS SCREEN
========================================================= */

function SuccessScreen({
  email,
  onBack,
}: {
  email: string;
  onBack: () => void;
}) {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center px-4 text-center">

      {/* ============================================
          SUCCESS ICON
      ============================================ */}

      <div className="relative mb-6 flex h-[105px] w-[105px] items-center justify-center">

        {/* Outer Pulse */}
        <div className="absolute inset-0 animate-ping rounded-full bg-[#00a957]/10" />

        {/* Circle */}
        <div className="relative flex h-[92px] w-[92px] animate-[successScale_0.5s_ease-out] items-center justify-center rounded-full bg-[#eff9f3]">

          <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#00a957] shadow-lg shadow-[#00a957]/20">

            {/* Animated Check */}

            <svg
              viewBox="0 0 52 52"
              className="h-9 w-9"
              fill="none"
            >

              <path
                d="M14 27L22 35L39 17"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-[checkDraw_0.5s_0.35s_ease-out_forwards]"
                strokeDasharray="40"
                strokeDashoffset="40"
              />

            </svg>

          </div>

        </div>

      </div>

      {/* ============================================
          SUCCESS TITLE
      ============================================ */}

      <div className="animate-[fadeUp_0.5s_0.15s_ease-out_both]">

        <h2 className="text-[28px] font-bold text-[#17324d] sm:text-[30px]">
          Welcome Back!
        </h2>

        <p className="mt-2 text-[14px] text-[#68788c]">
          You have successfully signed in.
        </p>

      </div>

      {/* ============================================
          USER EMAIL
      ============================================ */}

      <div className="mt-5 animate-[fadeUp_0.5s_0.25s_ease-out_both]">

        <div className="rounded-full bg-[#f3faf6] px-4 py-2">

          <p className="text-[13px] font-medium text-[#008f4c]">
            {email}
          </p>

        </div>

      </div>

      {/* ============================================
          SUCCESS MESSAGE
      ============================================ */}

      <p className="mt-5 max-w-[360px] animate-[fadeUp_0.5s_0.35s_ease-out_both] text-[13px] leading-5 text-[#788596]">
        Your account is ready. Start exploring ShopEasy
        and enjoy a smarter shopping experience.
      </p>

      {/* ============================================
          CONTINUE SHOPPING
      ============================================ */}

      <Link
        href="/"
        className="mt-7 flex h-[44px] w-full max-w-[280px] animate-[fadeUp_0.5s_0.45s_ease-out_both] items-center justify-center gap-2 rounded-[8px] bg-[#00a957] text-[14px] font-semibold text-white shadow-sm transition duration-200 hover:bg-[#00984e] hover:shadow-md active:scale-[0.98]"
      >

        <span>
          Continue Shopping
        </span>

        <ArrowRightIcon className="h-[18px] w-[18px]" />

      </Link>

      {/* ============================================
          BACK TO SIGN IN
      ============================================ */}

      <button
        type="button"
        onClick={onBack}
        className="mt-4 flex items-center gap-1.5 text-[13px] font-medium text-[#68788c] transition hover:text-[#00a957]"
      >

        <ArrowPathIcon className="h-[15px] w-[15px]" />

        <span>
          Back to Sign In
        </span>

      </button>

      {/* ============================================
          ANIMATION STYLES
      ============================================ */}

      <style jsx>{`
        @keyframes successScale {
          0% {
            transform: scale(0);
            opacity: 0;
          }

          70% {
            transform: scale(1.08);
            opacity: 1;
          }

          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes checkDraw {
          from {
            stroke-dashoffset: 40;
          }

          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  );
}


/* =========================================================
   LOCK ICON
========================================================= */

function LockIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-12 w-12"
      fill="none"
      aria-hidden="true"
    >

      <rect
        x="11"
        y="20"
        width="26"
        height="20"
        rx="2"
        stroke="#008f4c"
        strokeWidth="3"
      />

      <path
        d="M17 20V14C17 10.13 20.13 7 24 7C27.87 7 31 10.13 31 14V20"
        stroke="#008f4c"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <circle
        cx="24"
        cy="28"
        r="2.5"
        fill="#008f4c"
      />

      <path
        d="M24 30.5V35"
        stroke="#008f4c"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

    </svg>
  );
}


/* =========================================================
   SOCIAL BUTTON
========================================================= */

function SocialButton({
  provider,
  icon,
  onClick,
}: {
  provider: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[45px] items-center justify-center gap-2 rounded-[8px] border border-[#dfe4e8] bg-white px-2 text-[13px] font-semibold text-[#26384d] transition duration-200 hover:border-[#cbd2d9] hover:bg-[#fafafa] hover:shadow-sm active:scale-[0.98] sm:gap-2.5"
    >

      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        {icon}
      </span>

      <span>
        {provider}
      </span>

    </button>
  );
}


/* =========================================================
   GOOGLE ICON
========================================================= */

function GoogleIcon() {
  return (
    <svg
      className="h-[18px] w-[18px]"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >

      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />

      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />

      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />

      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />

    </svg>
  );
}


/* =========================================================
   FACEBOOK ICON
========================================================= */

function FacebookIcon() {
  return (
    <svg
      className="h-[18px] w-[18px]"
      fill="#1877F2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >

      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.414c0-3.026 1.792-4.7 4.533-4.7 1.312 0 2.686.236 2.686.236v2.98h-1.516c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />

    </svg>
  );
}


/* =========================================================
   APPLE ICON
========================================================= */

function AppleIcon() {
  return (
    <svg
      className="h-[18px] w-[18px]"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >

      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08ZM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3c.29 2.58-2.34 4.5-3.74 4.25Z" />

    </svg>
  );
}