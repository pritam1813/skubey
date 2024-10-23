import { ExchangeRates } from "../types/currency";

const base_url = process.env.NEXT_PUBLIC_EXCHANGE_RATE_BASE_URL;
const api_key = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;

export const fetchExchangeRates = async (): Promise<ExchangeRates | null> => {
  try {
    const response = await fetch(`${base_url}/${api_key}/latest/USD`, {
      next: { revalidate: 24 * 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.conversion_rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
};
