import { useSuspenseQuery } from "@tanstack/react-query";
import { animalDetailQueryOption } from "../api/animals.query";

export const useAnimal = (id: string) => {
  return useSuspenseQuery(animalDetailQueryOption(id));
};
