"use client";

import Image from "next/image";
import {
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  ArrowLeft,
} from "lucide-react";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { redirect, useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

// =========================
// API URL
// =========================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

// =========================
// TYPES
// =========================

interface Specifications {
  [key: string]: string;
}

interface Product {
  _id: string;

  name: string;
  brand?: string;
  category?: string;
  subcategory?: string;
  type?: string;

  price: number;
  oldPrice?: number;
  discount?: number;
  currency?: string;

  image?: string;
  images?: string[];

  description?: string;
  features?: string[];

  rating?: number;
  reviews?: number;
  sold?: number;
  stock?: number;

  color?: string[];

  specifications?: Specifications;

  shipping?: {
    freeShipping?: boolean;
    delivery?: string;
    easyReturns?: string;
  };
}

type ActiveTab =
  | "description"
  | "specifications"
  | "reviews"
  | "shipping";

// =========================
// COMPONENT
// =========================

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  // =========================
  // PRODUCT ID
  // =========================

  const productId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  // =========================
  // STATES
  // =========================

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [selectedColor, setSelectedColor] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const [adding, setAdding] =
    useState(false);

  // Wishlist

  const [wishlistLoading, setWishlistLoading] =
    useState(false);

  const [wishlistUpdated, setWishlistUpdated] =
    useState(0);

  // Tabs

  const [activeTab, setActiveTab] =
    useState<ActiveTab>("description");

  // =========================
  // FETCH PRODUCT
  // =========================

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${API_URL}/products/${productId}`
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch product"
          );
        }

        const result = await res.json();

        const productData: Product = result.data;

        setProduct(productData);

        setSelectedImage(
          productData.image ||
            productData.images?.[0] ||
            "/placeholder.png"
        );

        if (
          productData.color &&
          productData.color.length > 0
        ) {
          setSelectedColor(
            productData.color[0]
          );
        }
      } catch (error) {
        console.error(
          "Fetch Product Error:",
          error
        );

        toast.error(
          "Failed to load product!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // =========================
  // WISHLIST STATUS
  // NO useEffect + setState
  // =========================

  const wishlistKey =
    product && user?.email
      ? `wishlist_${user.email}_${product._id}`
      : "";

  const isWishlisted =
    typeof window !== "undefined" &&
    wishlistKey
      ? localStorage.getItem(wishlistKey) === "true"
      : false;

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = async () => {
    if (!user?.email) {
      toast.warning(
        "Please login first to add product to cart!"
      );
redirect("/signin");
      return;
    }

    if (!product) return;

    if (
      product.stock !== undefined &&
      product.stock <= 0
    ) {
      toast.error(
        "This product is out of stock!"
      );

      return;
    }

    try {
      setAdding(true);

      const cartData = {
        productId: product._id,

        name: product.name,
        brand: product.brand,
        category: product.category,
        subcategory: product.subcategory,
        type: product.type,

        price: product.price,
        oldPrice: product.oldPrice,
        discount: product.discount,
        currency: product.currency,

        image: selectedImage,

        rating: product.rating,
        reviews: product.reviews,

        stock: product.stock,

        color: selectedColor,

        quantity,

        userName: user.name,
        userEmail: user.email,
      };

      const res = await fetch(
        `${API_URL}/cart`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(cartData),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(
          result.message ||
            "Failed to add product to cart!"
        );

        return;
      }

      toast.success(
        result.message ||
          "Product added to cart successfully!"
      );
    } catch (error) {
      console.error(
        "Cart Error:",
        error
      );

      toast.error(
        "Failed to add product to cart!"
      );
    } finally {
      setAdding(false);
    }
  };

  // =========================
  // ADD TO WISHLIST
  // =========================

  const handleAddToWishlist = async () => {
    if (!user?.email) {
      toast.warning(
        "Please login first to add product to wishlist!"
      );
redirect("/signin");
      return;
    }

    if (!product) return;

    if (isWishlisted) {
      toast.info(
        "This product is already in your wishlist!"
      );

      return;
    }

    try {
      setWishlistLoading(true);

      const wishlistData = {
        productId: product._id,

        name: product.name,
        brand: product.brand,
        category: product.category,
        subcategory: product.subcategory,
        type: product.type,

        price: product.price,
        oldPrice: product.oldPrice,
        discount: product.discount,
        currency: product.currency,

        image: selectedImage,
        images: product.images,

        description: product.description,

        features: product.features,

        rating: product.rating,
        reviews: product.reviews,
        sold: product.sold,

        stock: product.stock,

        color: selectedColor,

        specifications:
          product.specifications,

        shipping: product.shipping,

        userName: user.name,
        userEmail: user.email,
      };

      const res = await fetch(
        `${API_URL}/wishlist`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            wishlistData
          ),
        }
      );

      const result = await res.json();

      // =========================
      // DUPLICATE
      // =========================

      if (res.status === 409) {
        localStorage.setItem(
          wishlistKey,
          "true"
        );

        setWishlistUpdated(
          (prev) => prev + 1
        );

        toast.info(
          result.message ||
            "This product is already in your wishlist!"
        );

        return;
      }

      // =========================
      // ERROR
      // =========================

      if (!res.ok) {
        toast.error(
          result.message ||
            "Failed to add product to wishlist!"
        );

        return;
      }

      // =========================
      // SUCCESS
      // =========================

      localStorage.setItem(
        wishlistKey,
        "true"
      );

      // Force re-render

      setWishlistUpdated(
        (prev) => prev + 1
      );

      toast.success(
        result.message ||
          "Product added to wishlist successfully!"
      );
    } catch (error) {
      console.error(
        "Wishlist Error:",
        error
      );

      toast.error(
        "Failed to add product to wishlist!"
      );
    } finally {
      setWishlistLoading(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-base text-gray-500 sm:text-lg">
          Loading product...
        </p>
      </div>
    );
  }

  // =========================
  // PRODUCT NOT FOUND
  // =========================

  if (!product) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-lg font-semibold sm:text-xl">
          Product not found
        </p>
      </div>
    );
  }

  // =========================
  // PRODUCT IMAGES
  // =========================

  const images =
    product.images &&
    product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : ["/placeholder.png"];

  // =========================
  // COLOR FUNCTION
  // =========================

  const getColorCode = (
    color: string
  ) => {
    const colors: Record<string, string> = {
      Black: "#111827",
      White: "#ffffff",
      Gray: "#9ca3af",
      Blue: "#2563eb",
      Red: "#dc2626",
      Gold: "#d4af37",
      Silver: "#c0c0c0",
      Green: "#16a34a",
      Yellow: "#eab308",
      Purple: "#9333ea",
      Pink: "#ec4899",
    };

    return colors[color] || color;
  };

  return (
    <main className="min-h-screen bg-[#fafbf9]">
      {/* BACK BUTTON */}

      <div className="container mx-auto px-4 pt-4 sm:px-6 lg:px-8 lg:pt-6">
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-green-600 hover:bg-green-50 hover:text-green-700"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>
      </div>

      {/* PRODUCT SECTION */}

      <section className="container mx-auto px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">

          {/* LEFT IMAGE */}

          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-start">

            {/* THUMBNAILS */}

            <div className="grid grid-cols-4 gap-2 sm:flex sm:flex-col sm:gap-3">
              {images.slice(0, 4).map(
                (image, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setSelectedImage(image)
                    }
                    className={`relative h-16 w-full overflow-hidden rounded-lg border bg-white p-1 transition sm:h-[72px] sm:w-[72px] md:h-[78px] md:w-[78px]
                    ${
                      selectedImage === image
                        ? "border-green-600 ring-2 ring-green-200"
                        : "border-gray-200 hover:border-green-400"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 25vw, 80px"
                      className="object-contain p-2"
                    />
                  </button>
                )
              )}
            </div>

            {/* MAIN IMAGE */}

            <div className="relative flex min-h-[300px] flex-1 items-center justify-center overflow-hidden rounded-xl bg-[#f3f5f4] sm:min-h-[400px] lg:min-h-[500px]">

              {product.discount && (
                <div className="absolute left-3 top-3 z-10 rounded-md bg-green-700 px-2 py-1 text-[10px] font-semibold text-white sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
                  -{product.discount}%
                </div>
              )}

              <div className="relative h-[280px] w-full sm:h-[380px] lg:h-[480px]">
                <Image
                  src={selectedImage || images[0]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain p-6 sm:p-10"
                />
              </div>
            </div>
          </div>

          {/* PRODUCT INFO */}

          <div className="w-full">
            <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            {/* RATING */}

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="flex">
                {[...Array(5)].map(
                  (_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index <
                        Math.round(
                          product.rating || 0
                        )
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  )
                )}
              </div>

              <span className="text-sm text-gray-600">
                {product.rating || 0}
              </span>

              <span className="text-sm text-gray-400">
                ({product.reviews || 0} Reviews)
              </span>

              <span className="text-sm text-gray-500">
                {product.sold || 0} sold
              </span>
            </div>

            {/* PRICE */}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-bold text-green-700 sm:text-4xl">
                ${product.price}
              </span>

              {product.oldPrice && (
                <span className="text-base text-gray-400 line-through sm:text-lg">
                  ${product.oldPrice}
                </span>
              )}

              {product.discount && (
                <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* DESCRIPTION */}

            <p className="mt-5 text-sm leading-6 text-gray-600 sm:text-base">
              {product.description}
            </p>

            {/* COLORS */}

            {product.color &&
              product.color.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-800">
                    Color:{" "}
                    <span className="font-normal">
                      {selectedColor}
                    </span>
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3">
                    {product.color.map(
                      (color) => (
                        <button
                          key={color}
                          onClick={() =>
                            setSelectedColor(color)
                          }
                          title={color}
                          className={`h-9 w-9 rounded-full border-2 transition-all duration-300
                          ${
                            selectedColor === color
                              ? "scale-110 border-green-700 ring-2 ring-green-200"
                              : "border-gray-200 hover:scale-105"
                          }`}
                          style={{
                            backgroundColor:
                              getColorCode(color),
                          }}
                        />
                      )
                    )}
                  </div>
                </div>
              )}

            {/* QUANTITY */}

            <div className="mt-7">
              <p className="mb-3 text-sm font-medium text-gray-800">
                Quantity
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center overflow-hidden rounded-md border border-gray-200 bg-white">

                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        prev > 1 ? prev - 1 : 1
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center transition hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="flex h-10 w-12 items-center justify-center border-x border-gray-200 text-sm">
                    {quantity}
                  </span>

                  <button
                    onClick={() => {
                      if (
                        product.stock === undefined ||
                        quantity < product.stock
                      ) {
                        setQuantity(
                          (prev) => prev + 1
                        );
                      }
                    }}
                    className="flex h-10 w-10 items-center justify-center transition hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <span
                  className={`text-sm font-medium ${
                    product.stock === undefined ||
                    product.stock > 0
                      ? "text-green-700"
                      : "text-red-500"
                  }`}
                >
                  {product.stock === undefined
                    ? "Available"
                    : product.stock > 0
                    ? `${product.stock} In Stock`
                    : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* BUTTONS */}

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">

              {/* WISHLIST */}

              <button
                onClick={handleAddToWishlist}
                disabled={
                  wishlistLoading ||
                  isWishlisted
                }
                className={`flex min-h-[48px] items-center justify-center gap-2 rounded-md border px-4 py-3 text-sm font-semibold transition-all duration-300
                ${
                  isWishlisted
                    ? "cursor-not-allowed border-green-700 bg-green-50 text-green-700"
                    : "cursor-pointer border-green-700 text-green-700 hover:bg-green-50"
                }
                ${
                  wishlistLoading
                    ? "cursor-wait opacity-60"
                    : ""
                }`}
              >
                <Heart
                  size={18}
                  className={
                    isWishlisted
                      ? "fill-green-700 text-green-700"
                      : ""
                  }
                />

                {wishlistLoading
                  ? "Adding..."
                  : isWishlisted
                  ? "Added to Wishlist"
                  : "Add to Wishlist"}
              </button>

              {/* ADD CART */}

              <button
                onClick={handleAddToCart}
                disabled={
                  adding ||
                  (product.stock !== undefined &&
                    product.stock <= 0)
                }
                className="flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-md bg-green-700 px-4 py-3 text-sm font-semibold text-white transition-all duration-500 hover:bg-green-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ShoppingCart size={18} />

                {adding
                  ? "Adding..."
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE CARDS */}

      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <Truck
              size={22}
              className="text-green-700"
            />

            <div>
              <h3 className="text-sm font-semibold">
                Free Shipping
              </h3>

              <p className="text-xs text-gray-500">
                On orders over $50
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <ShieldCheck
              size={22}
              className="text-green-700"
            />

            <div>
              <h3 className="text-sm font-semibold">
                Secure Payment
              </h3>

              <p className="text-xs text-gray-500">
                100% secure payment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <RotateCcw
              size={22}
              className="text-green-700"
            />

            <div>
              <h3 className="text-sm font-semibold">
                Easy Returns
              </h3>

              <p className="text-xs text-gray-500">
                30 days return policy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <Check
              size={22}
              className="text-green-700"
            />

            <div>
              <h3 className="text-sm font-semibold">
                24/7 Support
              </h3>

              <p className="text-xs text-gray-500">
                Dedicated support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">

          {/* TAB BUTTONS */}

          <div className="flex overflow-x-auto border-b border-gray-200 text-sm">
            {(
              [
                "description",
                "specifications",
                "reviews",
                "shipping",
              ] as ActiveTab[]
            ).map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(tab)
                }
                className={`shrink-0 px-4 pb-3 capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-green-700 font-medium text-green-700"
                    : "text-gray-600"
                }`}
              >
                {tab === "shipping"
                  ? "Shipping & Returns"
                  : tab}
              </button>
            ))}
          </div>

          {/* DESCRIPTION */}

          {activeTab === "description" && (
            <div className="mt-6">
              <h2 className="mb-4 text-lg font-semibold">
                Product Description
              </h2>

              <p className="text-sm leading-7 text-gray-600">
                {product.description ||
                  "No description available."}
              </p>

              {product.features &&
                product.features.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {product.features.map(
                      (feature, index) => (
                        <li
                          key={index}
                          className="flex gap-2 text-sm text-gray-600"
                        >
                          <span className="text-green-700">
                            •
                          </span>

                          {feature}
                        </li>
                      )
                    )}
                  </ul>
                )}
            </div>
          )}

          {/* SPECIFICATIONS */}

          {activeTab ===
            "specifications" && (
            <div className="mt-6">
              <h2 className="mb-5 text-lg font-semibold">
                Specifications
              </h2>

              {product.specifications &&
              Object.keys(
                product.specifications
              ).length > 0 ? (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  {Object.entries(
                    product.specifications
                  ).map(([key, value]) => (
                    <div
                      key={key}
                      className="grid grid-cols-2 border-b border-gray-200 text-sm last:border-b-0"
                    >
                      <div className="bg-gray-50 px-4 py-3 font-medium capitalize text-gray-600">
                        {key.replace(
                          /([A-Z])/g,
                          " $1"
                        )}
                      </div>

                      <div className="px-4 py-3 text-gray-700">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No specifications available.
                </p>
              )}
            </div>
          )}

          {/* REVIEWS */}

          {activeTab === "reviews" && (
            <div className="mt-6">
              <div className="rounded-xl bg-gray-50 p-6 text-center">
                <p className="text-4xl font-bold">
                  {product.rating || 0}
                </p>

                <div className="mt-3 flex justify-center">
                  {[...Array(5)].map(
                    (_, index) => (
                      <Star
                        key={index}
                        size={20}
                        className={
                          index <
                          Math.round(
                            product.rating || 0
                          )
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    )
                  )}
                </div>

                <p className="mt-3 text-sm text-gray-500">
                  Based on{" "}
                  {product.reviews || 0} reviews
                </p>
              </div>
            </div>
          )}

          {/* SHIPPING */}

          {activeTab === "shipping" && (
            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <div className="rounded-xl border border-gray-200 p-5">
                <h2 className="mb-4 text-lg font-semibold">
                  Shipping Information
                </h2>

                <p className="text-sm text-gray-600">
                  <strong>
                    Free Shipping:
                  </strong>{" "}
                  {product.shipping?.freeShipping
                    ? "Available for this product"
                    : "Available on eligible orders"}
                </p>

                <p className="mt-3 text-sm text-gray-600">
                  <strong>
                    Delivery:
                  </strong>{" "}
                  {product.shipping?.delivery ||
                    "3-7 business days"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-5">
                <h2 className="mb-4 text-lg font-semibold">
                  Returns & Warranty
                </h2>

                <p className="text-sm text-gray-600">
                  <strong>
                    Easy Returns:
                  </strong>{" "}
                  {product.shipping?.easyReturns ||
                    "30 days return policy"}
                </p>

                <p className="mt-3 text-sm text-gray-600">
                  <strong>
                    Warranty:
                  </strong>{" "}
                  {product.specifications?.warranty ||
                    "1 Year Warranty"}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}