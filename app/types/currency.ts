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

export interface CurrencyState {
  currencies: Currency[];
  selectedCurrency: Currency;
  userId: string | null;
  setSelectedCurrency: (currency: Currency) => void;
  setUserId: (id: string | null) => void;
  convertPrice: (amount: number) => number;
  formatPrice: (amount: number) => string;
}
