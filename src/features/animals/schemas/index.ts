import z from "zod";

export const AnimalBaseSchema = z.object({
  id: z.string(),
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),
  type: z.enum(["dog", "cat", "other"]),
  age: z.coerce.number().min(0),
});

export const AnimalCreateSchema = AnimalBaseSchema.omit({ id: true });

export const AnimalUpdateSchema = AnimalCreateSchema.partial();

export type AnimalBase = z.infer<typeof AnimalBaseSchema>;
export type AnimalCreate = z.infer<typeof AnimalCreateSchema>;
export type AnimalUpdate = z.infer<typeof AnimalUpdateSchema>;
