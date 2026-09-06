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
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

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

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();


  const productId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  // =========================
  // FETCH SINGLE PRODUCT
  // =========================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/products/${productId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const result = await res.json();

        const productData = result.data;

        setProduct(productData);

        setSelectedImage(
          productData.image ||
            productData.images?.[0] ||
            "/placeholder.png"
        );

        if (productData.color?.length > 0) {
          setSelectedColor(productData.color[0]);
        }
      } catch (error) {
        console.error("Fetch Product Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setAdding(true);
       // Loading animation
      await new Promise((resolve) => setTimeout(resolve, 800));

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
      };

      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(cartData),
      });

if (!res.ok) {
  toast.warning("Failed to add product to cart!");
  return;
}

toast.success("Product added to cart successfully!");
    } catch (error) {
      console.error("Cart Error:", error);

      alert("Failed to add product to cart");
    } finally {
      setAdding(false);
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

  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : ["/placeholder.png"];

  return (
    <main className="min-h-screen bg-[#fafbf9]">
      {/* ================= BREADCRUMB ================= */}

<div className="mx-auto  container px-4 pt-4 sm:px-6 lg:px-8 lg:pt-6">

  <div className="mb-4 flex items-center gap-3">
    
    <button
      onClick={() => router.back()}
      className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-green-600 hover:bg-green-50 hover:text-green-700"
    >
      <ArrowLeft size={18} />
      Back
    </button>

  </div>

  {/* <div className="flex flex-wrap items-center gap-1 text-[11px] text-gray-500 sm:gap-2 sm:text-xs">

    <span>Home</span>

    <ChevronRight size={14} />

    <span>{product.category || "Electronics"}</span>

    <ChevronRight size={14} />

    <span>{product.subcategory || "Products"}</span>

    <ChevronRight size={14} />

    <span className="font-medium text-green-700">
      {product.type || product.name}
    </span>

  </div> */}

</div>

      {/* ================= PRODUCT SECTION ================= */}

      <section className="mx-auto container px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {/* ================= LEFT IMAGE SECTION ================= */}

          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-start">
            {/* ================= THUMBNAILS ================= */}

            <div className="grid grid-cols-4 gap-2 sm:flex sm:flex-col sm:gap-3">
              {images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
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
              ))}
            </div>

            {/* ================= MAIN IMAGE ================= */}

            <div className="relative flex min-h-[300px] flex-1 items-center justify-center overflow-hidden rounded-xl bg-[#f3f5f4] sm:min-h-[400px] lg:min-h-[500px]">
              {/* Discount */}

              {product.discount && (
                <div className="absolute left-3 top-3 z-10 rounded-md bg-green-700 px-2 py-1 text-[10px] font-semibold text-white sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
                  -{product.discount}%
                </div>
              )}

              <div className="relative h-[280px] w-full sm:h-[380px] lg:h-[480px]">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain p-6 sm:p-10"
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT PRODUCT INFO ================= */}

          <div className="w-full">
            {/* Product Name */}

            <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            {/* ================= RATING ================= */}

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={
                      index < Math.round(product.rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <span className="text-sm text-gray-600">
                {product.rating || 0}
              </span>

              <span className="text-sm text-gray-400">
                ({product.reviews || 0} Reviews)
              </span>

              <span className="hidden text-gray-300 sm:block">
                |
              </span>

              <span className="text-sm text-gray-500">
                {product.sold || 0} sold
              </span>
            </div>

            {/* ================= PRICE ================= */}

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

            {/* ================= DESCRIPTION ================= */}

            <p className="mt-5 text-sm leading-6 text-gray-600 sm:text-base">
              {product.description}
            </p>

            {/* ================= SHIPPING ================= */}

            <div className="mt-6 grid grid-cols-1 gap-4 border-b border-gray-200 pb-5 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
                <Truck
                  size={18}
                  className="shrink-0 text-green-700"
                />

                <span>Free Shipping</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
                <RotateCcw
                  size={18}
                  className="shrink-0 text-green-700"
                />

                <span>Easy Return</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
                <ShieldCheck
                  size={18}
                  className="shrink-0 text-green-700"
                />

                <span>
                  {product.specifications?.warranty ||
                    "1 Year Warranty"}
                </span>
              </div>
            </div>

            {/* ================= COLORS ================= */}

            {product.color && product.color.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-800">
                  Color:{" "}
                  <span className="font-normal">
                    {selectedColor}
                  </span>
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  {product.color.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      aria-label={`Select ${color} color`}
                      className={`h-9 w-9 rounded-full border-2 transition-all duration-300
                        ${
                          selectedColor === color
                            ? "scale-110 border-green-700 ring-2 ring-green-200"
                            : "border-gray-200 hover:scale-105"
                        }`}
                      style={{
                        backgroundColor:
                          color === "Black"
                            ? "#111827"
                            : color === "White"
                            ? "#ffffff"
                            : color === "Gray"
                            ? "#9ca3af"
                            : color === "Blue"
                            ? "#2563eb"
                            : color === "Red"
                            ? "#dc2626"
                            : color === "Gold"
                            ? "#d4af37"
                            : color === "Silver"
                            ? "#c0c0c0"
                            : color,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ================= QUANTITY ================= */}

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
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="flex h-10 w-12 items-center justify-center border-x border-gray-200 text-sm">
                    {quantity}
                  </span>

                  <button
                    onClick={() => {
                      if (
                        !product.stock ||
                        quantity < product.stock
                      ) {
                        setQuantity((prev) => prev + 1);
                      }
                    }}
                    className="flex h-10 w-10 items-center justify-center transition hover:bg-gray-100"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <span
                  className={`text-sm font-medium ${
                    product.stock && product.stock > 0
                      ? "text-green-700"
                      : "text-red-500"
                  }`}
                >
                  {product.stock && product.stock > 0
                    ? `${product.stock} In Stock`
                    : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* ================= BUTTONS ================= */}

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Wishlist */}

              <button className="flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-green-700 px-4 py-3 text-sm font-semibold text-green-700 transition-all duration-300 hover:bg-green-50">
                <Heart size={18} />

                Add to Wishlist
              </button>

              {/* Add Cart */}

              <button
                onClick={handleAddToCart}
                disabled={
                  adding ||
                  (product.stock !== undefined &&
                    product.stock <= 0)
                }
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-green-700 px-4 py-3 text-sm font-semibold text-white transition-all duration-500 hover:bg-green-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ShoppingCart size={18} />

                {adding ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICE CARDS ================= */}

      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Free Shipping */}

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <Truck
              size={22}
              className="shrink-0 text-green-700"
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

          {/* Secure Payment */}

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <ShieldCheck
              size={22}
              className="shrink-0 text-green-700"
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

          {/* Easy Returns */}

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <RotateCcw
              size={22}
              className="shrink-0 text-green-700"
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

          {/* Support */}

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <Check
              size={22}
              className="shrink-0 text-green-700"
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

      {/* ================= DESCRIPTION ================= */}

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 lg:p-7">
          {/* ================= TABS ================= */}

          <div className="flex overflow-x-auto border-b border-gray-200 text-sm">
            <button className="shrink-0 border-b-2 border-green-700 px-2 pb-3 font-medium text-green-700 sm:px-4">
              Description
            </button>

            <button className="shrink-0 px-2 pb-3 text-gray-600 sm:px-4">
              Specifications
            </button>

            <button className="shrink-0 px-2 pb-3 text-gray-600 sm:px-4">
              Reviews ({product.reviews || 0})
            </button>

            <button className="shrink-0 px-2 pb-3 text-gray-600 sm:px-4">
              Shipping & Returns
            </button>
          </div>

          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {/* ================= DESCRIPTION ================= */}

            <div>
              <p className="text-sm leading-7 text-gray-600">
                {product.description}
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

                          <span>{feature}</span>
                        </li>
                      )
                    )}
                  </ul>
                )}
            </div>

            {/* ================= SPECIFICATIONS ================= */}

            <div className="space-y-3">
              {product.brand && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <span className="text-gray-500">
                    Brand
                  </span>

                  <span className="font-medium text-gray-700">
                    {product.brand}
                  </span>
                </div>
              )}

              {product.specifications &&
                Object.entries(product.specifications).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="grid grid-cols-2 gap-4 text-sm"
                    >
                      <span className="capitalize text-gray-500">
                        {key.replace(
                          /([A-Z])/g,
                          " $1"
                        )}
                      </span>

                      <span className="font-medium text-gray-700">
                        {value}
                      </span>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}