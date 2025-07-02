import { useDeleteAnimalsMutation } from "../api/animals.mutation";

export const useDeleteAnimals = () => {
  const mutation = useDeleteAnimalsMutation();

  return { ...mutation };
};
