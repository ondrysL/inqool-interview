import { api } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersKeys } from "./users.key";
import type { PartialUser } from "@/api/generated";
import { wrapWithToast } from "@/lib/utils";

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: api.usersPost,
    onSuccess: () => {
      {
        queryClient.invalidateQueries({ queryKey: usersKeys.list() });
      }
    },
  });

  const mutateAsyncToast = wrapWithToast(mutation.mutateAsync, {
    pending: "Creating user...",
    success: "User created successfully",
    error: "Failed to create user",
  });

  return { ...mutation, mutateAsyncToast };
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: api.usersIdDelete,
    onSuccess: () => {
      {
        queryClient.invalidateQueries({ queryKey: usersKeys.list() });
      }
    },
  });

  const mutateAsyncToast = wrapWithToast(mutation.mutateAsync, {
    pending: "Deleting user...",
    success: "User deleted successfully",
    error: "Failed to delete user",
  });

  return { ...mutation, mutateAsyncToast };
};

export const useDeleteUsersMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
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

  const mutateAsyncToast = wrapWithToast(mutation.mutateAsync, {
    pending: "Deleting users...",
    success: "Users deleted successfully",
    error: "Failed to delete users",
  });

  return { ...mutation, mutateAsyncToast };
};

export const useUpdateUserMutation = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
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

  const mutateAsyncToast = wrapWithToast(mutation.mutateAsync, {
    pending: "Updating user...",
    success: "User updated successfully",
    error: "Failed to update user",
  });

  return { ...mutation, mutateAsyncToast };
};
