import { useQuery } from "@tanstack/react-query";
import { getWatchById } from "@/lib/mockData";
import type { WatchPassport } from "@/types";

export function useWatchData(id: string | null | undefined) {
  return useQuery<WatchPassport | undefined>({
    queryKey: ["watch", id ?? "pending"],
    queryFn: () => Promise.resolve(id ? getWatchById(id) : undefined),
    enabled: Boolean(id),
  });
}

