export const animalsKey = {
  all: ["animals"] as const,
  list: () => [...animalsKey.all, "list"] as const,
  details: (id: string) => [...animalsKey.all, "details", id] as const,
};
