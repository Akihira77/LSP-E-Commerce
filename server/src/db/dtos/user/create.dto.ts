import { z } from "zod";
import { AddressDTO } from "../address/index.dto.js";

export const CreateUserDTO = z
    .object({
        name: z.string().min(1).max(25),
        phoneNumber: z.string().min(1).max(16),
        email: z.string().email().min(1).max(25),
        password: z.string().min(1).max(16),
        address: AddressDTO.omit({ id: true })
    })
    .strict();

export type CreateUserDtoType = z.infer<typeof CreateUserDTO>;
