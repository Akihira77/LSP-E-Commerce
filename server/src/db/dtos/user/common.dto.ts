import { z } from "zod";
import { AddressDTO } from "../address/index.dto.js";

export const UserDTO = z
    .object({
        id: z.number(),
        username: z.string().min(1),
        email: z.string().email().min(1),
        phoneNumber: z.string(),
        role: z.enum(["ADMIN", "CUSTOMER"]),
        address: z.optional(AddressDTO)
    })
    .strict();

export type UserDtoType = z.infer<typeof UserDTO>;

export const FindUserByNameOrEmailParams = z
    .object({
        name: z.optional(z.string().min(1)),
        email: z.optional(z.string().email().min(1))
    })
    .strict();

export type FindUserByNameOrEmailParamsType = z.infer<
    typeof FindUserByNameOrEmailParams
>;

export const FindUserByIdParams = z
    .object({
        id: z.number()
    })
    .strict();

export type FindUserByIdParamsType = z.infer<typeof FindUserByIdParams>;
