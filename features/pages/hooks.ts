import { useQuery } from "@tanstack/react-query";
import { getPage, getPages, pageKeys } from "./api";

export function usePages() {
  return useQuery({ queryKey: pageKeys.list(), queryFn: getPages });
}

export function usePage(slug: string) {
  return useQuery({
    queryKey: pageKeys.detail(slug),
    queryFn: () => getPage(slug),
    enabled: !!slug,
  });
}
