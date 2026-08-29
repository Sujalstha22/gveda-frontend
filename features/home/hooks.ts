import { useQuery } from "@tanstack/react-query";
import { getHomepage, homeKeys } from "./api";

export function useHomepage() {
  return useQuery({ queryKey: homeKeys.all, queryFn: getHomepage });
}
