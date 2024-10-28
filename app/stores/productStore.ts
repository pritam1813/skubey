import { create } from "zustand";
import { Product } from "@/app/types/product";

interface ProductStore {
  selectedProducts: string[];
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
  setSelectedProducts: (products: string[]) => void;
  toggleProduct: (productId: string) => void;
  clearSelection: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  selectedProducts: [],
  editingProduct: null,
  setEditingProduct: (product) => set({ editingProduct: product }),
  setSelectedProducts: (products) => set({ selectedProducts: products }),
  toggleProduct: (productId) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.includes(productId)
        ? state.selectedProducts.filter((id) => id !== productId)
        : [...state.selectedProducts, productId],
    })),
  clearSelection: () => set({ selectedProducts: [] }),
}));
