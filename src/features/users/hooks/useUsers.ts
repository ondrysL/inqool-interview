import { useSuspenseQuery } from "@tanstack/react-query";
import { usersListQueryOption } from "../api/users.query";

export const useUsers = () => {
  return useSuspenseQuery(usersListQueryOption());
};
