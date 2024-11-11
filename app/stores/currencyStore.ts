import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchExchangeRates } from "../utils/fetchExchangeRates";
import { CurrencyState, ExchangeRates } from "../types/currency";
import { getBaseUrl } from "../utils/getBaseUrl";

export const defaultExchangeRates: ExchangeRates = {
  USD: 0.01189,
  EUR: 0.01095,
  INR: 1,
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
          const data = await fetch(`${getBaseUrl()}/api/exchangerate`);
          const rates: ExchangeRates = await data.json();
          console.log("Rates: ", rates);

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

      getFormattedPrice: (price: number) => {
        const currency = get().currency;
        const exchangeRate = get().exchangeRates[currency];
        const convertedPrice = price * exchangeRate;

        // Format the converted price
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency,
        }).format(convertedPrice);
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
