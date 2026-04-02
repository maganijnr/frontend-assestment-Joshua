"use client";
import MaxWidthWrapper from "../molecules/max-width-wrapper";
import Link from "next/link";
import { useAppStore } from "@/store/app-store";
import { ShoppingCart } from "iconsax-reactjs";
import { useEffect, useState } from "react";

export default function Header() {
  const cart = useAppStore((state) => state.cart);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="w-full bg-blue-900 h-16 sticky top-0 left-0 z-50">
      <MaxWidthWrapper className="h-full w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-bold text-white">
            Content Explorer
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-white group flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
            <div className="relative">
              <ShoppingCart size={24} variant="Outline" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-blue-900">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </div>
            <span className="font-medium hidden md:block">Cart</span>
          </button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
