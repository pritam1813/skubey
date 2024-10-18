import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Currency, CurrencyState } from "@/app/types/currency";

const currencies: Currency[] = [
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.29 },
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
] as const;

const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currencies,
      selectedCurrency: currencies[0],
      userId: null,

      setSelectedCurrency: (currency: Currency) =>
        set({ selectedCurrency: currency }),

      setUserId: (id: string | null) => set({ userId: id }),

      convertPrice: (amount: number): number => {
        const { selectedCurrency } = get();
        return amount * selectedCurrency.rate;
      },

      formatPrice: (amount: number): string => {
        const { selectedCurrency } = get();
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: selectedCurrency.code,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount * selectedCurrency.rate);
      },
    }),
    {
      name: "currency-storage",
      partialize: (state) => ({
        selectedCurrency: state.selectedCurrency,
        userId: state.userId,
      }),
    }
  )
);

export default useCurrencyStore;
