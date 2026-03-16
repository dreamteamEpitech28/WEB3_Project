import { useQuery } from "@tanstack/react-query";
import { getWatchById } from "@/lib/mockData";
import type { WatchPassport } from "@/types";

export function useWatchData(id: string) {
  return useQuery<WatchPassport | undefined>({
    queryKey: ["watch", id],
    queryFn: () => Promise.resolve(getWatchById(id)),
  });
}

