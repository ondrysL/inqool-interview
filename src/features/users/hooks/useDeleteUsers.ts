import { useDeleteUsersMutation } from "../api/users.mutation";

export const useDeleteUsers = () => {
  const mutation = useDeleteUsersMutation();

  return { ...mutation };
};
