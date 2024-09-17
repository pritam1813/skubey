// import { create } from "zustand";
// import { ProductsCardProps } from "@/components/Products/ProductsCard";

// type State = {
//   cart: ProductsCardProps[];
// };

// type Action = {
//   addToCart: (product: ProductsCardProps) => void;
//   removeFromCart: (productId: ProductsCardProps["id"]) => void;
// };

// export const useCartStore = create<State & Action>()((set) => ({
//   cart: [],
//   addToCart: (product) =>
//     set((state) => ({
//       cart: [...state.cart, product],
//     })),
//   removeFromCart: (productId) =>
//     set((state) => ({
//       cart: state.cart.filter((product) => product.id !== productId),
//     })),
// }));

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Product {
  id: string;
  name: string;
  price: number;
  image: {
    url: string;
    alt: string;
  };
  link: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
