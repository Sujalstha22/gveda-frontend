import { useQuery } from "@tanstack/react-query";
import { eventKeys, getEvents } from "./api";

export function useEvents() {
  return useQuery({ queryKey: eventKeys.all, queryFn: getEvents });
}
