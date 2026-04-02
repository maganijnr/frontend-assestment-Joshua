"use client";
import { useState } from "react";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Star1 } from "iconsax-reactjs";
import Image from "next/image";
import Button from "../atom/button";
import Link from "next/link";

export default function Card({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-full bg-gray-50 rounded-md p-2 flex flex-col gap-3 relative">
      <div className=" top-2 absolute z-10 bg-blue-900 right-2 px-2 py-1 rounded-l-lg">
        <h2 className="flex items-center gap-1 text-white">
          <Star1 size={20} color="#E49B0F" variant="Bold" />
          {product?.rating}
        </h2>
      </div>
      <div className="w-full h-[150px] bg-gray-200 rounded-lg relative overflow-hidden flex items-center justify-center">
        {!product?.thumbnail || imgError ? (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-200 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-medium">No Image</span>
          </div>
        ) : (
          <Image
            src={product?.thumbnail}
            alt={product?.title}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="w-full space-y-2">
        <h3 className="text-sm font-semibold">{product?.title}</h3>

        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl">
            {formatCurrency(product?.price)}
          </h2>
          <p className="text-sm text-gray-600 capitalize">
            {product?.category}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {product?.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-900 text-white px-2 py-1 rounded-md capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Link href={`/dashboard/${product?.id.toString()}`} className="w-full">
        <Button className="w-full">View Details</Button>
      </Link>
    </div>
  );
}
