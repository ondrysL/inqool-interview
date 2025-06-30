import { useDeleteUsersMutation } from "../api/users.mutation";

export const useDeleteUsers = () => {
  const { mutateAsync } = useDeleteUsersMutation();

  return { mutateAsync };
};
