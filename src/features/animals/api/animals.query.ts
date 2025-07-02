import { queryOptions } from "@tanstack/react-query";
import { animalsKey } from "./animals.key";
import { api } from "@/api/client";

export const animalsListQueryOption = () =>
  queryOptions({
    queryKey: animalsKey.list(),
    queryFn: async () => {
      return api.animalsGet().then((res) => res.data);
    },
  });

export const animalDetailQueryOption = (id: string) =>
  queryOptions({
    queryKey: animalsKey.details(id),
    queryFn: async () => {
      return api.animalsIdGet(id);
    },
  });
