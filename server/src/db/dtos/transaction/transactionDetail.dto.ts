import { z } from "zod";
import { ProductDTO } from "../product/index.dto.js";
import { TransactionDTO } from "./common.dto.js";
import { CategoryDTO } from "../category/index.dto.js";

export const TransactionDetailsDTO = z
    .object({
        id: z.number(),
        product: ProductDTO.omit({ category: true, dateExpired: true }),
        category: CategoryDTO.omit({ createdAt: true, updatedAt: true }),
        quantity: z.number()
    })
    .strict();

export type TransactionDetailsDtoType = z.infer<typeof TransactionDetailsDTO>;
