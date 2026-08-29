import { useQuery } from "@tanstack/react-query";
import { galleryKeys, getGalleries, getGallery } from "./api";

export function useGalleries() {
  return useQuery({ queryKey: galleryKeys.list(), queryFn: getGalleries });
}

export function useGallery(id: number) {
  return useQuery({
    queryKey: galleryKeys.detail(id),
    queryFn: () => getGallery(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}
