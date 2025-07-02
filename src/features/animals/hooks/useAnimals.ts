import { useSuspenseQuery } from "@tanstack/react-query";
import { animalsListQueryOption } from "../api/animals.query";

export const useAnimals = () => {
  return useSuspenseQuery(animalsListQueryOption());
};
