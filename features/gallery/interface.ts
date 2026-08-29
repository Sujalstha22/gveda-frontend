import type { ApiImage } from "@/shared/api";

export interface GalleryListItem {
  _id: string;
  /** numeric id used for the detail endpoint */
  id: number;
  title: string;
  image: ApiImage;
}

export interface Gallery {
  title: string;
  images: ApiImage[];
}
