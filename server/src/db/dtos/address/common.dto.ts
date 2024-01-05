import { z } from "zod";

export const AddressDTO = z
    .object({
        id: z.number(),
        street: z.string().min(1).max(255),
        city: z.string().min(1).max(25),
        state: z.string().min(1).max(25),
        postalCode: z.string().min(1).max(9),
        userId: z.optional(z.number())
    })
    .strict();

export type AddressDtoType = z.infer<typeof AddressDTO>;
