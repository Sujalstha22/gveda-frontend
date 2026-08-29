import { useQuery } from "@tanstack/react-query";
import { blogKeys, getBlog, getBlogs } from "./api";

export function useBlogs() {
  return useQuery({ queryKey: blogKeys.list(), queryFn: getBlogs });
}

export function useBlog(slug: string) {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: () => getBlog(slug),
    enabled: !!slug,
  });
}
