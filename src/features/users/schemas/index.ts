import { z } from "zod";

export const UserSchema = z.object({
  name: z.string({required_error: "Name is required"}).min(1, { message: "Name is required" }),
  banned: z.boolean({ required_error: "banned is required" }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "gender is required",
  }),
});

export const UpdateUserSchema = UserSchema.partial();

export type User = z.infer<typeof UserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
