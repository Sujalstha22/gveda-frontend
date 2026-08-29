import type { ApiImage } from "@/shared/api";

export interface BlogListItem {
  _id: string;
  title: string;
  slug: string;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  image?: ApiImage;
  createdAt: string;
}

export type Blog = BlogListItem;
