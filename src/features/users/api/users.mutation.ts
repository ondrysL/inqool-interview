import { api } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersKeys } from "./users.key";
import type { PartialUser } from "@/api/generated";

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.usersPost,
    onSuccess: () => {
      {
        queryClient.invalidateQueries({ queryKey: usersKeys.list() });
      }
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.usersIdDelete,
    onSuccess: () => {
      {
        queryClient.invalidateQueries({ queryKey: usersKeys.list() });
      }
    },
  });
};

export const useDeleteUsersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(ids.map((id) => api.usersIdDelete(id)));
    },
    onSuccess: () => {
      {
        queryClient.invalidateQueries({
          queryKey: usersKeys.list(),
          refetchType: "active",
        });
      }
    },
  });
};

export const useUpdateUserMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (patchData: PartialUser) => {
      return api.usersIdPatch(id, patchData);
    },
    onSuccess: () => {
      {
        queryClient.invalidateQueries({
          queryKey: usersKeys.list(),
          refetchType: "active",
        });
      }
    },
  });
};
