import { devtools, persist } from "zustand/middleware";
import { CartItem } from "../types";
import { Product } from "../types/product";
import { create } from "zustand";

interface QuickViewState {
  isOpen: boolean;
  product: Product | null;
}

interface CartStoreState {
  cart: CartItem[];
  wishlist: Product[];
  compareList: Product[];
  quickView: QuickViewState;
  setQuickViewProduct: (product: Product | null) => void;
  toggleQuickView: (isOpen: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  addToCompare: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        wishlist: [],
        compareList: [],
        quickView: {
          isOpen: false,
          product: null,
        },
        setQuickViewProduct: (product) =>
          set((state) => ({
            quickView: {
              ...state.quickView,
              product,
              isOpen: !!product,
            },
          })),
        toggleQuickView: (isOpen) =>
          set((state) => ({
            quickView: {
              ...state.quickView,
              isOpen,
              product: isOpen ? state.quickView.product : null,
            },
          })),

        addToCart: (product, quantity = 1) =>
          set((state) => {
            const existingItem = state.cart.find(
              (item) => item.id === product.id
            );

            if (existingItem) {
              return {
                cart: state.cart.map((item) =>
                  item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                ),
              };
            }

            return {
              cart: [...state.cart, { ...product, quantity }],
            };
          }),

        updateQuantity: (productId, quantity) =>
          set((state) => {
            if (quantity <= 0) {
              return {
                cart: state.cart.filter((item) => item.id !== productId),
              };
            }
            return {
              cart: state.cart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
              ),
            };
          }),

        addToWishlist: (product) =>
          set((state) => ({
            wishlist: state.wishlist.some((item) => item.id === product.id)
              ? state.wishlist
              : [...state.wishlist, product],
          })),

        addToCompare: (product) =>
          set((state) => ({
            compareList: state.compareList.some(
              (item) => item.id === product.id
            )
              ? state.compareList
              : [...state.compareList, product],
          })),

        removeFromCart: (productId) =>
          set((state) => ({
            cart: state.cart.filter((item) => item.id !== productId),
          })),

        removeFromWishlist: (productId) =>
          set((state) => ({
            wishlist: state.wishlist.filter((item) => item.id !== productId),
          })),

        removeFromCompare: (productId) =>
          set((state) => ({
            compareList: state.compareList.filter(
              (item) => item.id !== productId
            ),
          })),
        clearCart: () => set({ cart: [] }),
        getTotalPrice: () => {
          const { cart } = get();
          return cart.reduce(
            (total, item) =>
              total + (item.price as unknown as number) * item.quantity,
            0
          );
        },
      }),
      {
        name: "ecommerce-store",
      }
    )
  )
);
