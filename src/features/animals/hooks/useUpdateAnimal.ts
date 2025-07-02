import { useUpdateAnimalMutation } from "../api/animals.mutation";

export const useUpdateAnimal = (id: string) => {
  const mutation = useUpdateAnimalMutation(id);

  return { ...mutation };
};
