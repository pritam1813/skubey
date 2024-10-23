export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

export interface UserPreference {
  userId: string;
  preferredCurrency: string;
}

// Define more specific types
export type ExchangeRates = Record<string, number>;

export interface CurrencyState {
  currency: string;
  exchangeRates: ExchangeRates;
  isLoading: boolean;
  error: string | null;
  setCurrency: (currency: string) => Promise<void>;
  updateExchangeRates: () => Promise<void>;
}
