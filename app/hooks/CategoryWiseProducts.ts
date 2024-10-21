import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCategoryWiseProducts(category: string) {
  const { data, error, isLoading } = useSWR(
    category ? `/api/category/${category}` : null,
    fetcher,
    {
      revalidateOnFocus: false, // Prevents unnecessary refetches
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}
