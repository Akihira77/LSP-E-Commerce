import { z } from "zod";

export const CreateCategoryDTO = z
    .object({
        name: z.string().min(1).max(25)
    })
    .strict();

export type CreateCategoryDtoType = z.infer<typeof CreateCategoryDTO>;
