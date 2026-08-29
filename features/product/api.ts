import { api, encodeSlug, staticUrl } from "@/shared/api";
import type { Envelope, PagedEnvelope } from "@/shared/api";
import type {
  Product,
  ProductCategory,
  ProductListItem,
  ProductListParams,
} from "./interface";

export const productKeys = {
  all: ["products"] as const,
  list: (params: ProductListParams) =>
    [...productKeys.all, "list", params] as const,
  detail: (slug: string) => [...productKeys.all, "detail", slug] as const,
  byCategory: (slug: string) =>
    [...productKeys.all, "category", slug] as const,
  categories: ["product-categories"] as const,
};

export const getProducts = (params: ProductListParams = {}) =>
  api<PagedEnvelope<ProductListItem>>("product/p", {
    query: params as Record<string, string | number | undefined>,
  });

export const getProduct = (slug: string) =>
  api<Envelope<Product>>(`product/p/${encodeSlug(slug)}`);

export const getProductsByCategory = (categorySlug: string) =>
  api<Envelope<ProductListItem[]>>(
    `product/p/category/${encodeSlug(categorySlug)}`,
  );

export const getProductCategories = () =>
  api<Envelope<ProductCategory[]>>("product/category/p");

/** Map an API product to the shape the presentational ProductCard expects. */
export function toCardProduct(p: ProductListItem | Product) {
  return {
    id: p._id,
    slug: p.slug,
    name: p.title,
    image: staticUrl(p.images?.[0]?.name) || "/images/product/product1.jpeg",
    description:
      "description" in p && p.description
        ? p.description.split("\n")[0]
        : undefined,
    category: "category" in p && p.category ? p.category.name : undefined,
  };
}
