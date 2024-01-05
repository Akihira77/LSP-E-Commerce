import { z } from "zod";

export const UserLoginDTO = z
    .object({
        email: z.string().email().min(1).max(25),
        password: z.string().min(1).max(16)
    })
    .strict();

export type UserLoginDtoType = z.infer<typeof UserLoginDTO>;
