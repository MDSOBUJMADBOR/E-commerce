"use client";

import { useEffect, useMemo, useState } from "react";

import {
  CheckCircle2,
  ChevronRight,
  X,
} from "lucide-react";

import CartTable from "@/components/Cart/CartTablet";
import OrderSummary from "@/components/Cart/OrderSummary";
import PaymentMethods from "@/components/Cart/PaymentMethods";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";



// ==============================
// API URL
// ==============================

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ==============================
// TYPES
// ==============================

interface Product {
  _id?: string;
  name?: string;
  price?: number;
  image?: string;
  images?: string[];
  color?: string | string[];
}

interface CartItem {
  _id: string;

  productId?: string;

  name?: string;
  price?: number;
  image?: string;

  color?: string | string[];

  quantity: number;

  userEmail?: string;

  product?: Product;
}

// ==============================
// COMPONENT
// ==============================

const Page = () => {
  const { data: session } = authClient.useSession();

  const USER_EMAIL = session?.user?.email;

  // ==============================
  // STATES
  // ==============================

  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showAlert, setShowAlert] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  // ==============================
  // FETCH CART
  // ==============================

  const fetchCart = async (email?: string) => {
    if (!email) {
      return [];
    }

    try {
      const response = await fetch(
        `${API_URL}/cart/email/${email}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await response.json();

      console.log("Cart Data:", data);

      if (Array.isArray(data)) {
        return data;
      }

      if (Array.isArray(data.cart)) {
        return data.cart;
      }

      if (Array.isArray(data.items)) {
        return data.items;
      }

      if (Array.isArray(data.data)) {
        return data.data;
      }

      return [];
    } catch (error) {
      console.error(
        "Cart fetch error:",
        error
      );

      return [];
    }
  };

  // ==============================
  // FETCH ON USER LOGIN
  // ==============================

  useEffect(() => {
    let ignore = false;

    const loadCart = async () => {
      setLoading(true);

      const items = await fetchCart(USER_EMAIL);

      if (!ignore) {
        setCartItems(items);
        setLoading(false);
      }
    };

    // async function defer করে call
    void Promise.resolve().then(loadCart);

    // ==============================
    // CART UPDATED EVENT
    // ==============================

    const handleCartUpdated = async () => {
      const items = await fetchCart(USER_EMAIL);

      if (!ignore) {
        setCartItems(items);
      }
    };

    window.addEventListener(
      "cartUpdated",
      handleCartUpdated
    );

    return () => {
      ignore = true;

      window.removeEventListener(
        "cartUpdated",
        handleCartUpdated
      );
    };
  }, [USER_EMAIL]);

  // ==============================
  // PRODUCT HELPERS
  // ==============================

  const getProductName = (
    item: CartItem
  ) => {
    return (
      item.product?.name ||
      item.name ||
      "Product"
    );
  };

  const getProductPrice = (
    item: CartItem
  ) => {
    return (
      item.product?.price ||
      item.price ||
      0
    );
  };

  const getProductImage = (
    item: CartItem
  ) => {
    return (
      item.product?.image ||
      item.product?.images?.[0] ||
      item.image ||
      "/placeholder.png"
    );
  };

  const getProductColor = (
    item: CartItem
  ) => {
    const color =
      item.product?.color ||
      item.color ||
      "Black";

    // যদি array হয়
    if (Array.isArray(color)) {
      return color[0] || "Black";
    }

    return color;
  };

  // ==============================
  // SUBTOTAL
  // ==============================

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => {
        const price =
          getProductPrice(item);

        return (
          total +
          price * item.quantity
        );
      },
      0
    );
  }, [cartItems]);

  // ==============================
  // TOTAL ITEMS
  // ==============================

  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [cartItems]);

  // ==============================
  // SHIPPING
  // ==============================

  const shipping = 0;

  // ==============================
  // DISCOUNT
  // ==============================

  const discount =
    subtotal > 0 ? 20 : 0;

  // ==============================
  // TOTAL
  // ==============================

  const total =
    subtotal + shipping - discount;

  // ==============================
  // UPDATE QUANTITY
  // ==============================

  const updateQuantity = async (
    item: CartItem,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    const oldQuantity =
      item.quantity;

    try {
      setUpdatingId(item._id);

      // ==============================
      // OPTIMISTIC UI UPDATE
      // ==============================

      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem._id === item._id
            ? {
                ...cartItem,
                quantity: newQuantity,
              }
            : cartItem
        )
      );

      // ==============================
      // BACKEND UPDATE
      // ==============================

      const response = await fetch(
        `${API_URL}/cart/${item._id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            quantity: newQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Quantity update failed"
        );
      }

      const data =
        await response.json();

      console.log(
        "Quantity Updated:",
        data
      );

      // ==============================
      // NAVBAR UPDATE
      // ==============================

      window.dispatchEvent(
        new CustomEvent("cartUpdated")
      );

    } catch (error) {
      console.error(
        "Quantity Update Error:",
        error
      );

      // আগের quantity ফিরিয়ে দেবে

      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem._id === item._id
            ? {
                ...cartItem,
                quantity: oldQuantity,
              }
            : cartItem
        )
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ==============================
  // DELETE CART
  // ==============================

  const deleteCartItem = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to remove this product?"
      );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/cart/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete cart item"
        );
      }

      // ==============================
      // REMOVE FROM UI
      // ==============================

      setCartItems((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

      // ==============================
      // NAVBAR CART COUNT UPDATE
      // ==============================

      window.dispatchEvent(
        new CustomEvent("cartUpdated")
      );

      console.log(
        "Cart item deleted successfully!"
      );

    } catch (error) {
      console.error(
        "Delete Error:",
        error
      );

      alert(
        "Failed to delete cart item!"
      );
    }
  };

  // ==============================
  // UPDATE CART BUTTON
  // ==============================

  const handleUpdateCart = async () => {
    const items =
      await fetchCart(USER_EMAIL);

    setCartItems(items);

    // Navbar update

    window.dispatchEvent(
      new CustomEvent("cartUpdated")
    );
  };

  // ==============================
  // CHECKOUT
  // ==============================

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert("Proceeding to checkout...");
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8f8]">
        <div className="text-lg font-semibold text-green-700">
          Loading Cart...
        </div>
      </div>
    );
  }

  // ==============================
  // PAGE
  // ==============================

  return (
    <main className="min-h-screen bg-[#f7f8f8] px-4 py-8 md:px-8 lg:px-10">

      <div className="mx-auto max-w-[1500px]">

        {/* ================= HEADER ================= */}

        <div className="mb-5">

          <h1 className="text-3xl font-bold text-slate-800">
            Your Cart
          </h1>

          <div className="mt-2 flex items-center gap-2 text-sm">

            <Link href={"/"}>
            <span className="font-medium ">
              Home
            </span>
            </Link>

            <ChevronRight
              size={16}
              className="text-gray-400"
            />

            <span className=" text-green-700">
              Cart
            </span>

          </div>

        </div>

        {/* ================= ALERT ================= */}

        {showAlert &&
          cartItems.length > 0 && (

            <div className="mb-4 flex items-center justify-between rounded-xl border border-green-300 bg-green-50 px-4 py-3 shadow-sm">

              <div className="flex items-center gap-3">

                <CheckCircle2
                  size={19}
                  className="text-green-700"
                />

                <p className="text-sm text-slate-700">
                  Your products have been added to
                  your cart.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowAlert(false)
                }
                className="text-gray-500 transition hover:text-red-500"
              >
                <X size={20} />
              </button>

            </div>
          )}

        {/* ================= MAIN GRID ================= */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_430px]">

          {/* CART TABLE */}

          <CartTable
            cartItems={cartItems}
            updatingId={updatingId}
            getProductName={getProductName}
            getProductPrice={getProductPrice}
            getProductImage={getProductImage}
            getProductColor={getProductColor}
            updateQuantity={updateQuantity}
            deleteCartItem={deleteCartItem}
            handleUpdateCart={handleUpdateCart}
          />

          {/* RIGHT SIDE */}

          <aside className="space-y-5">

            <OrderSummary
              totalItems={totalItems}
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
              handleCheckout={handleCheckout}
            />

            <PaymentMethods />

          </aside>

        </div>

      </div>

    </main>
  );
};

export default Page;