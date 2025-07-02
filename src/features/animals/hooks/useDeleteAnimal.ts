import { useDeleteAnimalMutation } from "../api/animals.mutation";

export const useDeleteAnimal = () => {
  const mutation = useDeleteAnimalMutation();

  return { ...mutation };
};
