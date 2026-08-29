import type { ApiImage } from "@/shared/api";

export interface ProductListItem {
  _id: string;
  title: string;
  slug: string;
  price: number;
  comparePrice: number | null;
  type: string;
  newProduct?: boolean;
  onSale?: boolean;
  images: ApiImage[];
  stock: number;
  brand: string;
  sn?: number;
  variations?: unknown[];
  createdAt?: string;
}

export interface Product extends Omit<ProductListItem, "createdAt" | "sn"> {
  description: string;
  allowBackorder: boolean;
  category: { name: string; slug: string };
  meta_title: string | null;
  meta_description: string | null;
}

export interface ProductCategory {
  name: string;
  slug: string;
  image: ApiImage;
  children: ProductCategory[];
}

export interface ProductListParams {
  search?: string;
  page?: number;
  pageSize?: number;
}
