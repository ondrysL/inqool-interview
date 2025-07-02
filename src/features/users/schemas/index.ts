import { z } from "zod";

export const UserBaseSchema = z.object({
  id: z.string(),
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),
  banned: z.boolean({ required_error: "banned is required" }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "gender is required",
  }),
});

export const UserCreateSchema = UserBaseSchema.omit({ id: true });

export const UpdateUserSchema = UserCreateSchema.partial();

export type UserBase = z.infer<typeof UserBaseSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
