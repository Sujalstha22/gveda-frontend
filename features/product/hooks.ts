import { useQuery } from "@tanstack/react-query";
import {
  getProduct,
  getProductCategories,
  getProducts,
  getProductsByCategory,
  productKeys,
} from "./api";
import type { ProductListParams } from "./interface";

export function useProducts(
  params: ProductListParams = {},
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => getProducts(params),
    enabled: options?.enabled,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => getProduct(slug),
    enabled: !!slug,
  });
}

export function useProductsByCategory(categorySlug: string) {
  return useQuery({
    queryKey: productKeys.byCategory(categorySlug),
    queryFn: () => getProductsByCategory(categorySlug),
    enabled: !!categorySlug,
  });
}

export function useProductCategories() {
  return useQuery({
    queryKey: productKeys.categories,
    queryFn: getProductCategories,
  });
}
