"use client";

import Image from "next/image";
import { Minus, Plus, RefreshCw, Trash2 } from "lucide-react";
import Link from "next/link";

// ==========================================
// TYPES
// ==========================================

export interface CartProduct {
  _id?: string;
  name?: string;
  price?: number;
  image?: string;
  images?: string[];

  // গুরুত্বপূর্ণ
  color?: string | string[];
}

export interface CartItem {
  _id: string;

  product?: CartProduct;

  name?: string;
  price?: number;
  image?: string;

  // গুরুত্বপূর্ণ
  color?: string | string[];

  quantity: number;
}

// ==========================================
// PROPS
// ==========================================

interface CartTableProps {
  cartItems: CartItem[];

  updatingId: string | null;

  getProductName: (item: CartItem) => string;

  getProductPrice: (item: CartItem) => number;

  getProductImage: (item: CartItem) => string;

  getProductColor: (item: CartItem) => string;

  updateQuantity: (
    item: CartItem,
    newQuantity: number
  ) => Promise<void>;

  deleteCartItem: (id: string) => Promise<void>;

  handleUpdateCart: () => void;
}

// ==========================================
// COMPONENT
// ==========================================

const CartTable = ({
  cartItems,
  updatingId,
  getProductName,
  getProductPrice,
  getProductImage,
  getProductColor,
  updateQuantity,
  deleteCartItem,
  handleUpdateCart,
}: CartTableProps) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* ================= TABLE HEADER ================= */}

      <div className="hidden grid-cols-[2.3fr_0.8fr_1fr_0.8fr_60px] items-center border-b border-gray-200 px-5 py-5 text-sm font-semibold text-slate-700 md:grid">
        <div>Product</div>

        <div>Price</div>

        <div>Quantity</div>

        <div>Total</div>

        <div />
      </div>

      {/* ================= CART ITEMS ================= */}

      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => {
            const price = getProductPrice(item);

            const itemTotal =
              price * item.quantity;

            const image =
              getProductImage(item);

            const color =
              getProductColor(item);

            return (
              <div
                key={item._id}
                className="grid grid-cols-1 gap-5 border-b border-gray-200 px-5 py-4 md:grid-cols-[2.3fr_0.8fr_1fr_0.8fr_60px] md:items-center md:gap-0"
              >

                {/* ================= PRODUCT ================= */}

                <div className="flex items-center gap-4">

                  {/* IMAGE */}

                  <div className="relative flex h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">

                    {image ? (
                      <Image
                        src={image}
                        alt={getProductName(item)}
                        fill
                        sizes="82px"
                        className="object-contain p-2"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">
                        No Image
                      </span>
                    )}

                  </div>

                  {/* PRODUCT INFO */}

                  <div>
                    <h3 className="font-semibold text-slate-700">
                      {getProductName(item)}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Color: {color}
                    </p>
                  </div>

                </div>

                {/* ================= PRICE ================= */}

                <div className="flex items-center justify-between md:block">

                  <span className="text-sm text-gray-500 md:hidden">
                    Price
                  </span>

                  <span className="font-medium text-slate-700">
                    ${price.toFixed(2)}
                  </span>

                </div>

                {/* ================= QUANTITY ================= */}

                <div className="flex items-center justify-between md:block">

                  <span className="text-sm text-gray-500 md:hidden">
                    Quantity
                  </span>

                  <div className="flex w-fit overflow-hidden rounded-lg border border-gray-300">

                    {/* MINUS */}

                    <button
                      type="button"
                      disabled={
                        item.quantity <= 1 ||
                        updatingId === item._id
                      }
                      onClick={() =>
                        updateQuantity(
                          item,
                          item.quantity - 1
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center border-r border-gray-200 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus size={16} />
                    </button>

                    {/* QUANTITY */}

                    <div className="flex h-10 w-12 items-center justify-center text-sm font-medium text-slate-700">
                      {item.quantity}
                    </div>

                    {/* PLUS */}

                    <button
                      type="button"
                      disabled={
                        updatingId === item._id
                      }
                      onClick={() =>
                        updateQuantity(
                          item,
                          item.quantity + 1
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center border-l border-gray-200 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus size={16} />
                    </button>

                  </div>

                </div>

                {/* ================= TOTAL ================= */}

                <div className="flex items-center justify-between md:block">

                  <span className="text-sm text-gray-500 md:hidden">
                    Total
                  </span>

                  <span className="font-semibold text-slate-700">
                    ${itemTotal.toFixed(2)}
                  </span>

                </div>

                {/* ================= DELETE ================= */}

                <div className="flex justify-end md:justify-center">

                  <button
                    type="button"
                    onClick={() =>
                      deleteCartItem(item._id)
                    }
                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                    title="Delete Product"
                  >
                    <Trash2 size={19} />
                  </button>

                </div>

              </div>
            );
          })}

          {/* ================= BOTTOM BUTTONS ================= */}

          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">

            <Link href="/">
              <button
                type="button"
                className="cursor-pointer rounded-lg border border-green-600 px-6 py-3 text-sm font-medium text-green-700 transition hover:bg-green-50"
              >
                ← Continue Shopping
              </button>
            </Link>

            <button
              type="button"
              onClick={handleUpdateCart}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-green-600 px-6 py-3 text-sm font-medium text-green-700 transition hover:bg-green-50"
            >
              <RefreshCw size={17} />

              Update Cart
            </button>

          </div>
        </>
      ) : (

        /* ================= EMPTY CART ================= */

        <div className="flex min-h-[400px] flex-col items-center justify-center">

          <h2 className="text-2xl font-bold text-gray-700">
            Your Cart is Empty
          </h2>

          <p className="mt-2 text-gray-500">
            Add some products to your cart.
          </p>

          <Link
            href="/"
            className="mt-5 rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            Continue Shopping
          </Link>

        </div>
      )}

    </section>
  );
};

export default CartTable;