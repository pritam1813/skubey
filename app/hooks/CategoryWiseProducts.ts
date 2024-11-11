import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCategoryWiseProducts(category: string | null) {
  const { data, error, isLoading } = useSWR(
    category ? `/api/category/${category}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}
