import { useUpdateUserMutation  } from "../api/users.mutation";

export const useUpdateUser = (id: string) => {
  const mutation = useUpdateUserMutation(id);

  return { ...mutation };
};
