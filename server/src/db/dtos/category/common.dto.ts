import { z } from "zod";

export const CategoryDTO = z
    .object({
        id: z.number(),
        name: z.string().min(1).max(25),
        createdAt: z.date(),
        updatedAt: z.date()
    })
    .strict();

export type CategoryDtoType = z.infer<typeof CategoryDTO>;
