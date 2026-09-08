"use client";

import {
  ArrowRight,
  Lock,
} from "lucide-react";

interface OrderSummaryProps {
  totalItems: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;

  handleCheckout: () => void;
}

const OrderSummary = ({
  totalItems,
  subtotal,
  shipping,
  discount,
  total,
  handleCheckout,
}: OrderSummaryProps) => {
    
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Order Summary
      </h2>

      <div className="space-y-5 text-sm">

        {/* ================= SUBTOTAL ================= */}

        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal ({totalItems} items)
          </span>

          <span className="font-medium text-slate-700">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* ================= SHIPPING ================= */}

        <div className="flex justify-between">
          <span className="text-gray-600">
            Shipping
          </span>

          <span className="font-semibold text-green-700">
            {shipping === 0
              ? "Free"
              : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {/* ================= DISCOUNT ================= */}

        <div className="flex justify-between">
          <span className="text-gray-600">
            Discount{" "}
            <span className="text-green-700">
              (FIRST20)
            </span>
          </span>

          <span className="font-semibold text-green-700">
            -${discount.toFixed(2)}
          </span>
        </div>

        {/* ================= LINE ================= */}

        <div className="border-t border-gray-200" />

        {/* ================= TOTAL ================= */}

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-slate-800">
            Total
          </span>

          <span className="text-2xl font-bold text-green-800">
            ${Math.max(0, total).toFixed(2)}
          </span>
        </div>

        {/* ================= CHECKOUT ================= */}

        <button
          onClick={handleCheckout}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-green-800 py-4 font-semibold text-white transition hover:bg-green-900"
        >
          Proceed to Checkout

          <ArrowRight size={19} />
        </button>

        {/* ================= SECURE ================= */}

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Lock size={15} />

          Secure checkout
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;