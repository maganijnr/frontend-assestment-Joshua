import apiClient from "@/lib/api.client";
import { useQuery } from "@tanstack/react-query";

export default function useProductsApi({
  limit = 20,
  skip = 0,
  search,
  category,
  productId,
}: {
  limit?: number;
  skip?: number;
  search?: string;
  category?: string;
  productId?: string;
}) {
  const { isLoading, data, isRefetching } = useQuery({
    queryKey: ["fetch-all-products", skip, search, category],
    queryFn: async () => {
      const response = await apiClient.fetchAllProducts({
        limit: limit,
        skip: skip,
        search: search,
        category: category,
      });
      return response;
    },
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: productId ? false : true,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["fetch-product-categories"],
    queryFn: async () => {
      const response = await apiClient.fetchProductCategories();
      return response;
    },
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: productId ? false : true,
  });

  const {
    isLoading: productLoading,
    data: product,
    error: productError,
  } = useQuery({
    queryKey: ["fetch-product-by-id", productId],
    queryFn: async () => {
      const response = await apiClient.fetchProductById(productId as string);
      return response;
    },
    enabled: !!productId,
    retry: 1,
  });

  return {
    isLoading,
    data,
    isRefetching,
    categories,
    categoriesLoading,
    productLoading,
    product,
    productError,
  };
}
