export const usersKeys = {
  all: ["users"] as const,
  list: () => [...usersKeys.all, "list"] as const,
  details: (id: string) => [...usersKeys.all, "details", id] as const,
};
