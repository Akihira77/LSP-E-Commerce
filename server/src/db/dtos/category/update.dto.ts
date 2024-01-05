import { z } from "zod";

export const UpdateCategoryDTO = z
    .object({
        id: z.number(),
        name: z.string().min(1).max(25)
    })
    .strict();

export type UpdateCategoryDtoType = z.infer<typeof UpdateCategoryDTO>;
