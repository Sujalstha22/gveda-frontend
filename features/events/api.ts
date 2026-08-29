import { api } from "@/shared/api";
import type { Envelope } from "@/shared/api";
import type { EventItem } from "./interface";

export const eventKeys = {
  all: ["events"] as const,
};

export const getEvents = () => api<Envelope<EventItem[]>>("event/p");
