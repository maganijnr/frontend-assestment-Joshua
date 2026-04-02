import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "@/lib/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface AppStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.product.id === product.id);
        if (existingItem) {
          if (existingItem.quantity < product.stock) {
            set({
              cart: currentCart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            });
          }
        } else {
          set({ cart: [...currentCart, { product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter((item) => item.product.id !== productId),
        });
      },
      updateQuantity: (productId, quantity) => {
        set({
          cart: get().cart.map((item) => {
            if (item.product.id === productId) {
              const newQty = Math.max(1, Math.min(quantity, item.product.stock));
              return { ...item, quantity: newQty };
            }
            return item;
          }),
        });
      },
    }),
    {
      name: "proc360-app-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
