import { useDeleteUserMutation } from "../api/users.mutation";

export const useDeleteUser = () => {
  const { mutateAsync } = useDeleteUserMutation();

  return { mutateAsync };
};
