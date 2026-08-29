import { api, encodeSlug } from "@/shared/api";
import type { Envelope } from "@/shared/api";
import type { Blog, BlogListItem } from "./interface";

export const blogKeys = {
  all: ["blogs"] as const,
  list: () => [...blogKeys.all, "list"] as const,
  detail: (slug: string) => [...blogKeys.all, "detail", slug] as const,
};

export const getBlogs = () => api<Envelope<BlogListItem[]>>("blogs/p");

export const getBlog = (slug: string) =>
  api<Envelope<Blog>>(`blogs/p/${encodeSlug(slug)}`);
