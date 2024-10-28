// productStore.ts
import { create } from "zustand";
import { Product } from "@/app/types";

export type SortField = "name" | "price" | "stock";
type SortOrder = "asc" | "desc";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  sortField: SortField;
  sortOrder: SortOrder;
  filterText: string;

  // Actions
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotalPages: (total: number) => void;
  setSortField: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
  setFilterText: (text: string) => void;

  // Thunks
  fetchProducts: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  totalPages: 1,
  sortField: "name",
  sortOrder: "asc",
  filterText: "",

  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size }),
  setTotalPages: (total) => set({ totalPages: total }),
  setSortField: (field) => set({ sortField: field }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setFilterText: (text) => set({ filterText: text }),

  fetchProducts: async () => {
    const { currentPage, pageSize, sortField, sortOrder, filterText } = get();
    try {
      set({ loading: true, error: null });
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
        sortField,
        sortOrder,
        filter: filterText,
      });

      const response = await fetch(`/api/products?${queryParams}`);
      const data = await response.json();

      set({
        products: data.products,
        totalPages: Math.ceil(data.total / pageSize),
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
    }
  },

  deleteProduct: async (id) => {
    try {
      //   const response = await fetch(`/api/products/${id}`, {
      //     method: "DELETE",
      //   });
      //   if (response.ok) {
      //     const { products } = get();
      //     set({ products: products.filter((p) => p.id !== id) });
      //     get().fetchProducts();
      //   }
      console.log(id);
    } catch (error) {
      set({ error: "Failed to delete product" });
    }
  },

  updateProduct: async (id, data) => {
    try {
      //   const response = await fetch(`/api/products/${id}`, {
      //     method: "PUT",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(data),
      //   });
      //   if (response.ok) {
      //     get().fetchProducts();
      //   }
      console.log(data);
    } catch (error) {
      set({ error: "Failed to update product" });
    }
  },
}));
