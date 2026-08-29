import { api } from "@/shared/api";
import type { Envelope } from "@/shared/api";
import type { HomepageData } from "./interface";

export const homeKeys = {
  all: ["homepage"] as const,
};

export const getHomepage = () =>
  api<Envelope<HomepageData>>("other/home/p/new");
