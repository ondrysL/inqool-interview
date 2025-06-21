import { useCreateUserMutation } from "../api/users.mutation";

export const useCreateUser = () => {
  const mutation = useCreateUserMutation();

  return { ...mutation };
};
