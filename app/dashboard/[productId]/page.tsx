"use client";
import MaxWidthWrapper from "@/components/molecules/max-width-wrapper";
import apiClient from "@/lib/api.client";
import { formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Star1, Box, Tag, InfoCircle } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import Button from "@/components/atom/button";
import ProductDetailSkeleton from "@/components/molecules/product-detail-skeleton";
import { useAppStore } from "@/store/app-store";

function ProductDetailPage() {
  const { productId } = useParams();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { cart, addToCart, removeFromCart, updateQuantity } = useAppStore();

  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["fetch-product-by-id", productId],
    queryFn: async () => {
      const response = await apiClient.fetchProductById(productId as string);
      return response;
    },
    enabled: !!productId,
    retry: 1,
  });

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">
          Failed to load product details
        </h2>
        <Link href="/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const images = product.images || [product.thumbnail];
  const currentImage = selectedImage || product.thumbnail;

  return (
    <MaxWidthWrapper className="py-10">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-gray-600 hover:text-blue-900 mb-8 transition-colors group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="font-medium">Back to Shop</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square relative w-full bg-gray-100 rounded-3xl overflow-hidden border border-gray-200">
            <Image
              src={currentImage}
              alt={product.title}
              fill
              className="object-contain p-8"
              priority
            />
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                  currentImage === img
                    ? "border-blue-900 shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.title} ${idx}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-semibold uppercase tracking-wider text-xs">
              <Tag size={16} />
              {product.category}
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              {product.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-bold">
                <Star1 size={18} variant="Bold" />
                {product.rating}
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 italic font-medium">
                {product.brand}
              </span>
            </div>
          </div>

          <div className="pb-6 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-blue-900">
              {formatCurrency(product.price)}
            </h2>
            <p className="text-sm text-green-600 font-medium mt-1">
              {product.stock > 0
                ? `In Stock (${product.stock} units)`
                : "Out of Stock"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 font-semibold">
              <InfoCircle size={20} />
              <span>Description</span>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-xl">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-50 rounded-2xl">
                <Box size={24} className="text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Weight</p>
                <p className="font-semibold">{product.weight} kg</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            {(() => {
              const cartItem = cart.find(
                (item) => item.product.id === product.id,
              );
              if (cartItem) {
                return (
                  <div className="flex-1 flex gap-4">
                    <div className="flex items-center justify-between border-2 border-blue-900 rounded-md px-4 py-2 flex-1">
                      <button
                        onClick={() =>
                          updateQuantity(product.id, cartItem.quantity - 1)
                        }
                        disabled={cartItem.quantity <= 1}
                        className="text-gray-500 hover:text-blue-900 font-bold px-2 disabled:opacity-50 text-xl"
                      >
                        -
                      </button>
                      <span className="font-bold text-xl text-blue-900">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(product.id, cartItem.quantity + 1)
                        }
                        disabled={cartItem.quantity >= product.stock}
                        className="text-gray-500 hover:text-blue-900 font-bold px-2 disabled:opacity-50 text-xl"
                      >
                        +
                      </button>
                    </div>
                    <Button
                      onClick={() => removeFromCart(product.id)}
                      className="bg-red-500 text-red-50 hover:bg-red-600 hover:text-red-50 transition-colors border-none whitespace-nowrap font-bold px-8 shadow-sm"
                    >
                      Remove
                    </Button>
                  </div>
                );
              }

              return (
                <Button
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className="flex-1 py-4 text-lg font-bold shadow-lg shadow-blue-900/20"
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
              );
            })()}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {product.tags?.map((tag: string) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full capitalize"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          Customer Reviews
          <span className="text-sm font-normal text-gray-400">
            ({product.reviews?.length || 0})
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.reviews?.map((review: any, idx: number) => (
            <div
              key={idx}
              className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-gray-900">
                    {review.reviewerName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star1 size={14} variant="Bold" />
                  {review.rating}
                </div>
              </div>
              <p className="text-gray-600 italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default function Page() {
  return <ProductDetailPage />;
}
