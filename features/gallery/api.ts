import { api } from "@/shared/api";
import type { Envelope } from "@/shared/api";
import type { Gallery, GalleryListItem } from "./interface";

export const galleryKeys = {
  all: ["galleries"] as const,
  list: () => [...galleryKeys.all, "list"] as const,
  detail: (id: number) => [...galleryKeys.all, "detail", id] as const,
};

export const getGalleries = () =>
  api<Envelope<GalleryListItem[]>>("other/gallery/p");

export const getGallery = (id: number) =>
  api<Envelope<Gallery>>(`other/gallery/p/${id}`);
