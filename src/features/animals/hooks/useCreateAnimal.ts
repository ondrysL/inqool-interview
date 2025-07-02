import { useCreateAnimalMutation } from "../api/animals.mutation";

export const useCreateAnimal = () => {
  const mutation = useCreateAnimalMutation();

  return { ...mutation };
};
