
"use client";

import React from "react";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFoundPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-2xl text-center">

          {/* 404 */}
          <div className="relative mb-6">
            <h1 className="select-none text-[120px] font-black leading-none tracking-tight text-slate-100 sm:text-[180px]">
              404
            </h1>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-extrabold text-slate-900 sm:text-7xl">
                404
              </span>
            </div>
          </div>

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-sm">
            <Search size={30} strokeWidth={2} />
          </div>

          {/* Content */}
          <h2 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Page Not Found
          </h2>

          <p className="mx-auto mb-8 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
            The page may have been moved, deleted, or the URL might be incorrect.
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">

            <Link
              href="/"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 sm:w-auto"
            >
              <Home size={18} />
              Back to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>

          </div>

          {/* Bottom text */}
          <p className="mt-10 text-xs text-slate-400">
            Error Code: 404 • The requested page does not exist
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;

