import { z } from "zod";
import { AddressDTO } from "../address/index.dto.js";

export const UpdateUserDTO = z
    .object({
        name: z.string().min(1).max(25),
        phoneNumber: z.string().min(1).max(16),
        email: z.string().min(1).email().max(25),
        password: z.string().min(1).max(16),
        address: z.optional(AddressDTO.omit({ id: true }))
    })
    .strict();

export type UpdateUserDtoType = z.infer<typeof UpdateUserDTO>;

export const UpdateRoleUserDTO = z
    .object({
        id: z.number(),
        role: z.enum(["ADMIN", "CUSTOMER"])
    })
    .strict();

export type UpdateRoleUserDtoType = z.infer<typeof UpdateRoleUserDTO>;
