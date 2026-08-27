import Image from "next/image";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const FooterSection = () => {
  return (
    <footer className="relative   overflow-hidden bg-[#003425] font-sans text-white ">
      {/* Background Subtle Gradient Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#05573e] opacity-40 blur-3xl " />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-[#05573e] opacity-30 blur-3xl" />

      <div className="relative container mx-auto px-5  pt-12 pb-8">

        {/* Main Grid Layout */}
        <div className=" grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1fr_1.2fr] ">

          {/* ==================== */}
          {/* Brand / ShopEasy */}
          {/* ==================== */}
          <div className="col-span-2 flex flex-col md:col-span-1 "> 

            {/* Logo */}
            <div className="mb-3 flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src="/images/footer-con-final.png"
                  alt="ShopEasy Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white italic">
                Shop<span className="text-[#12c875]">Easy</span>
              </h2>
            </div>

            {/* Tagline */}
            <h3 className="mb-2 font-semibold text-gray-200">
              Shop Smarter, Live Better.
            </h3>

            {/* Description */}
            <p className="mb-6 max-w-[260px] leading-relaxed text-gray-300">
              Your one-stop destination for quality products at the best
              prices.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: "Facebook",
                  icon: <FaFacebookF />,
                },
                {
                  label: "YouTube",
                  icon: <FaYoutube />,
                },
                {
                  label: "X",
                  icon: <FaXTwitter />,
                },
                {
                  label: "LinkedIn",
                  icon: <FaLinkedinIn />,
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="group flex h-9 w-9 items-center justify-center rounded-full bg-[#064734] text-[15px] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#12c875] hover:text-[#003425] hover:shadow-[0_6px_18px_rgba(18,200,117,0.25)]"
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ==================== */}
          {/* Shop */}
          {/* ==================== */}
          <div>
            <h3 className="mb-3 font-bold text-white">
              Shop
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="transition-colors hover:text-[#12c875]">
                  All Products
                </a>
              </li>

              <li>
                <a href="#" className="transition-colors hover:text-[#12c875]">
                  Today Deals
                </a>
              </li>

              <li>
                <a href="#" className="transition-colors hover:text-[#12c875]">
                  New Arrivals
                </a>
              </li>

              <li>
                <a href="#" className="transition-colors hover:text-[#12c875]">
                  Best Sellers
                </a>
              </li>

              <li>
                <a href="#" className="transition-colors hover:text-[#12c875]">
                  Categories
                </a>
              </li>
            </ul>
          </div>

          {/* ==================== */}
          {/* Customer Service */}
          {/* ==================== */}
          <div>
            <h3 className="mb-3 font-bold text-white">
              Customer Service
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="transition-colors hover:text-[#12c875]">
                  Track Order
                </a>
              </li>

              <li>
                <a href="#" className="transition-colors hover:text-[#12c875]">
                  Shipping Policy
                </a>
              </li>

              <li>
                <a href="#" className="transition-colors hover:text-[#12c875]">
                  Return & Refund
                </a>
              </li>

              <li>
                <a href="#" className="transition-colors hover:text-[#12c875]">
                  FAQ
                </a>
              </li>

              <li>
                <a href="#" className="transition-colors hover:text-[#12c875]">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* ==================== */}
          {/* Help */}
          {/* ==================== */}
          <div>
            <h3 className="mb-3 font-bold text-white">
              Help
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="transition-colors hover:text-[#12c875]">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="transition-colors hover:text-[#12c875]">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="transition-colors hover:text-[#12c875]">
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a href="#" className="transition-colors hover:text-[#12c875]">
                  Blog
                </a>
              </li>

              <li>
                <a href="#" className="transition-colors hover:text-[#12c875]">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* ==================== */}
          {/* We Accept */}
          {/* ==================== */}
          <div>
            <h3 className="mb-3  font-bold text-white">
              We Accept
            </h3>

            <div className="flex flex-wrap items-center gap-2">

              {/* VISA */}
              <div className="flex h-7 w-12 items-center justify-center rounded bg-white text-[11px] font-black italic text-[#173c8f]">
                VISA
              </div>

              {/* Mastercard */}
              <div className="flex h-7 w-12 items-center justify-center rounded bg-white">
                <div className="flex">
                  <span className="h-4 w-4 rounded-full bg-[#eb001b]" />
                  <span className="-ml-1.5 h-4 w-4 rounded-full bg-[#f79e1b] opacity-90" />
                </div>
              </div>

              {/* AMEX */}
              <div className="flex h-7 w-12 items-center justify-center rounded bg-[#007bc1] text-[10px] font-bold text-white">
                AMEX
              </div>

              {/* bKash */}
              <div className="flex h-7 w-12 items-center justify-center rounded bg-white text-[10px] font-bold text-[#e21d6f]">
                bKash
              </div>

              {/* Nagad */}
              <div className="flex h-7 w-12 items-center justify-center rounded bg-white text-[10px] font-bold text-[#f79e1b]">
                Nagad
              </div>

            </div>
          </div>
        </div>

        {/* ==================== */}
        {/* Bottom Horizontal Divider */}
        {/* ==================== */}
        <div className="mt-10 mb-5 h-[1px] w-full bg-white/10" />

        {/* ==================== */}
        {/* Bottom Bar */}
        {/* ==================== */}
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-gray-300 md:flex-row">

          {/* Copyright */}
          <p>
            © 2026{" "}
            <span className="font-semibold text-[#12c875]">
              ShopEasy
            </span>
            . All rights reserved.
          </p>

          {/* Bottom Links */}
          <div className="flex items-center gap-3 text-xs">
            <a
              href="#"
              className="transition-colors hover:text-[#12c875]"
            >
              Privacy Policy
            </a>

            <span className="text-gray-500">|</span>

            <a
              href="#"
              className="transition-colors hover:text-[#12c875]"
            >
              Terms & Conditions
            </a>

            <span className="text-gray-500">|</span>

            <a
              href="#"
              className="transition-colors hover:text-[#12c875]"
            >
              Cookie Policy
            </a>
            </div>



        </div>


      </div>


    </footer>
  );
};

export default FooterSection;