import { queryOptions } from "@tanstack/react-query";
import { usersKeys } from "@/features/users/api/users.key.ts";
import { api } from "@/api/client";

export const usersListQueryOption = () =>
  queryOptions({
    queryKey: usersKeys.list(),
    queryFn: async () => {
      return api.usersGet().then((res) => res.data);
    },
  });

export const userDetailQueryOption = (id: string) =>
  queryOptions({
    queryKey: usersKeys.details(id),
    queryFn: async () => {
      return api.usersIdGet(id);
    },
  });
