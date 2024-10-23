import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchExchangeRates } from "../utils/fetchExchangeRates";
import { CurrencyState, ExchangeRates } from "../types/currency";

const defaultExchangeRates: ExchangeRates = {
  USD: 1,
  EUR: 0.9236,
  INR: 84.1029,
};

const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: "INR",
      exchangeRates: defaultExchangeRates,
      isLoading: false,
      error: null,

      setCurrency: async (newCurrency) => {
        set({ isLoading: true, error: null });

        try {
          const rates = await fetchExchangeRates();
          set({
            currency: newCurrency,
            exchangeRates: rates || defaultExchangeRates,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: "Failed to update exchange rates",
            isLoading: false,
          });
        }
      },

      updateExchangeRates: async () => {
        set({ isLoading: true, error: null });

        try {
          const rates = await fetchExchangeRates();
          if (rates) {
            set({
              exchangeRates: rates,
              isLoading: false,
            });
          } else {
            throw new Error("Failed to fetch exchange rates");
          }
        } catch (error) {
          set({
            error: "Failed to update exchange rates",
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "currency-storage",
      partialize: (state) => ({
        currency: state.currency,
        exchangeRates: state.exchangeRates,
      }),
    }
  )
);

export default useCurrencyStore;
