import { z } from "zod";
import { UserDTO } from "../user/common.dto.js";

export const UpdateStatusTransactionDTO = z.object({
    transactionId: z.number(),
    status: z.enum(["CANCELED", "PENDING", "SUCCESS"])
});

export type UpdateStatusTransactionDtoType = z.infer<
    typeof UpdateStatusTransactionDTO
>;

export const TransactionDTO = z
    .object({
        id: z.number(),
        totalPrice: z.string().transform((val) => parseInt(val)),
        paymentMethod: z.string().min(1).max(10),
        status: z.enum(["CANCELED", "PENDING", "SUCCESS"]),
        createdAt: z.date(),
        user: UserDTO.omit({ address: true })
    })
    .strict();

export type TransactionDtoType = z.infer<typeof TransactionDTO>;

export const CheckoutResponseDTO = z
    .object({
        id: z.number(),
        totalPrice: z.string().transform((val) => parseInt(val)),
        paymentMethod: z.string().min(1).max(10),
        status: z.enum(["CANCELED", "PENDING", "SUCCESS"]),
        createdAt: z.date()
    })
    .strict();

export type CheckoutResponseDtoType = z.infer<typeof CheckoutResponseDTO>;

export const TransactionDetailsParams = z
    .object({
        userId: z.string().transform((val) => parseInt(val)),
        transactionId: z.string().transform((val) => parseInt(val))
    })
    .strict();

export type TransactionDetailsParamsType = z.infer<
    typeof TransactionDetailsParams
>;
