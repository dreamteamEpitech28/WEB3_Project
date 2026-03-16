import watch000001 from "@/data/watch-000001.json";
import type { WatchPassport } from "@/types";

export const MOCK_WATCHES: Record<string, WatchPassport> = {
  "1": watch000001 as WatchPassport,
  "000001": watch000001 as WatchPassport,
};

export function getWatchById(id: string): WatchPassport | undefined {
  return MOCK_WATCHES[id];
}

