import { useUpdateUserMutation  } from "../api/users.mutation";

export const useUpdateUser = (id: string) => {
  const { mutateAsync } = useUpdateUserMutation(id);

  return { mutateAsync };
};
