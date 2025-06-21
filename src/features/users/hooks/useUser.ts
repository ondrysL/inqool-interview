import { useSuspenseQuery } from "@tanstack/react-query";
import { userDetailQueryOption } from "../api/users.query";

export const useUser = (id: string) => {
  return useSuspenseQuery(userDetailQueryOption(id));
}
