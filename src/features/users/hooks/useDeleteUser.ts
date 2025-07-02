import { useDeleteUserMutation } from "../api/users.mutation";

export const useDeleteUser = () => {
  const mutation = useDeleteUserMutation();

  return { ...mutation };
};
