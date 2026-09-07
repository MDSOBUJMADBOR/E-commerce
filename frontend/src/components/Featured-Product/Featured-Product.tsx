"use client";

import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  name: string;
  brand?: string;
  category?: string;
  price: number;
  oldPrice?: number;
  image?: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  userName?: string;
  userEmail?: string;
}

const FeaturedProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);

  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // ================= FETCH PRODUCTS =================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await res.json();

        setProducts(result.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ================= ADD TO CART =================

  const handleAddToCart = async (product: Product) => {
    if (!user) {
      toast.warning("Please login first!");
      router.push("/login");
      return;
    }

    try {
      setAddingId(product._id);

      // Loading animation
      await new Promise((resolve) => setTimeout(resolve, 800));

      const cartData = {
        productId: product._id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.image || product.images?.[0] || "",
        rating: product.rating,
        reviews: product.reviews,
        quantity: 1,
        userName: user.name,
        userEmail: user.email,
      };

      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to add product");
      }

      toast.success(`${product.name} added to cart!`);

      console.log("Cart Response:", result);
    } catch (error) {
      console.error("Cart Error:", error);

      toast.error("Failed to add product to cart!");
    } finally {
      setAddingId(null);
    }
  };

  // ================= DETAILS PAGE =================

  const handleProductClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="py-10 text-center">
        Loading products...
      </div>
    );
  }

  return (
    <section className="w-full bg-[#f8faf9] py-6">
      <div className="container mx-auto px-4 md:px-8">

        {/* ================= HEADER ================= */}

        <div className="mb-4 flex items-center justify-between">

          <h2 className="text-lg font-semibold text-gray-900">
            Featured Products
          </h2>

          <button
            onClick={() => router.push("/products")}
            className="cursor-pointer text-sm font-medium text-green-700 transition hover:text-green-900"
          >
            View All
          </button>

        </div>

        {/* ================= PRODUCTS GRID ================= */}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

          {products.map((product) => {

            const productImage =
              product.image ||
              product.images?.[0] ||
              "/placeholder.png";

            return (
              <div
                key={product._id}
                className="group rounded-xl border border-gray-100 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* ================= IMAGE ================= */}

                <div
                  onClick={() => handleProductClick(product._id)}
                  className="relative h-[150px] cursor-pointer overflow-hidden rounded-lg bg-gray-100"
                >

                  <Image
                    src={productImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* ================= WISHLIST ================= */}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      console.log(
                        "Wishlist:",
                        product._id
                      );
                    }}
                    className="absolute right-2 top-2 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:scale-110"
                  >
                    <Heart
                      size={16}
                      className="text-gray-500 transition hover:text-red-500"
                    />
                  </button>

                </div>

                {/* ================= PRODUCT INFO ================= */}

                <div className="px-1 pt-3">

                  {/* Name */}

                  <h3
                    onClick={() =>
                      handleProductClick(product._id)
                    }
                    className="cursor-pointer truncate text-sm font-medium text-gray-800 transition hover:text-green-700"
                  >
                    {product.name}
                  </h3>

                  {/* Price */}

                  <div className="mt-2 flex items-center gap-2">

                    <span className="text-sm font-bold text-gray-900">
                      ${product.price}
                    </span>

                    {product.oldPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ${product.oldPrice}
                      </span>
                    )}

                  </div>

                  {/* Rating */}

                  <div className="mt-2 flex items-center gap-1">

                    <div className="flex">

                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={12}
                          className={
                            index <
                            Math.round(product.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}

                    </div>

                    <span className="text-xs text-gray-500">
                      ({product.reviews || 0})
                    </span>

                  </div>

                  {/* ================= ADD TO CART ================= */}

                  <button
                    onClick={() =>
                      handleAddToCart(product)
                    }
                    disabled={addingId === product._id}
                    className="mt-4 w-full cursor-pointer rounded-md border border-green-600 bg-transparent py-2 text-xs font-semibold text-green-700 transition-all duration-500 ease-in-out hover:bg-green-700 hover:text-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {addingId === product._id
                      ? "Adding..."
                      : "Add to Cart"}
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default FeaturedProduct;