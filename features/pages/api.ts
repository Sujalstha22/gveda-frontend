import { api, encodeSlug } from "@/shared/api";
import type { Envelope } from "@/shared/api";
import type { Page, PageListItem } from "./interface";

export const pageKeys = {
  all: ["pages"] as const,
  list: () => [...pageKeys.all, "list"] as const,
  detail: (slug: string) => [...pageKeys.all, "detail", slug] as const,
};

export const getPages = () => api<Envelope<PageListItem[]>>("pages/p");

export const getPage = (slug: string) =>
  api<Envelope<Page>>(`pages/p/${encodeSlug(slug)}`);
