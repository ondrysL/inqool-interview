import { api } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { animalsKey } from "./animals.key";
import { wrapWithToast } from "@/lib/utils";
import type { PartialAnimal, PartialAnimalTypeEnum } from "@/api/generated";

export const useCreateAnimalMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: api.animalsPost,
    onSuccess: () => {
      {
        queryClient.invalidateQueries({ queryKey: animalsKey.list() });
      }
    },
  });

  const mutateAsyncToast = wrapWithToast(mutation.mutateAsync, {
    pending: "Creating animal...",
    success: "Animal created successfully",
    error: "Failed to create animal",
  });

  return { ...mutation, mutateAsyncToast };
};

export const useDeleteAnimalMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: api.animalsIdDelete,
    onSuccess: () => {
      {
        queryClient.invalidateQueries({ queryKey: animalsKey.list() });
      }
    },
  });

  const mutateAsyncToast = wrapWithToast(mutation.mutateAsync, {
    pending: "Deleting animal...",
    success: "Animal deleted successfully",
    error: "Failed to delete animal",
  });

  return { ...mutation, mutateAsyncToast };
};

export const useDeleteAnimalsMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(ids.map((id) => api.animalsIdDelete(id)));
    },
    onSuccess: () => {
      {
        queryClient.invalidateQueries({ queryKey: animalsKey.list() });
      }
    },
  });

  const mutateAsyncToast = wrapWithToast(mutation.mutateAsync, {
    pending: "Deleting animals...",
    success: "Animals deleted successfully",
    error: "Failed to delete animals",
  });

  return { ...mutation, mutateAsyncToast };
};

export const useUpdateAnimalMutation = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (animal: PartialAnimal) => {
      return api.animalsIdPatch(id, animal);
    },
    onSuccess: () => {
      {
        queryClient.invalidateQueries({ queryKey: animalsKey.list() });
      }
    },
  });

  const mutateAsyncToast = wrapWithToast(mutation.mutateAsync, {
    pending: "Updating animal...",
    success: "Animal updated successfully",
    error: "Failed to update animal",
  });

  return { ...mutation, mutateAsyncToast };
};
