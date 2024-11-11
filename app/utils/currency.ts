export const formatCurrency = (
  amount: number,
  currency: string,
  exchangeRate: number
) => {
  const convertedAmount = amount * exchangeRate;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(convertedAmount);
};
