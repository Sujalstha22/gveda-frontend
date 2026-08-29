import type { ApiImage } from "@/shared/api";

/** Shape inferred from an empty live response; refine when data exists. */
export interface EventItem {
  _id: string;
  title: string;
  slug?: string;
  content?: string;
  image?: ApiImage;
  createdAt?: string;
  [key: string]: unknown;
}
