import { z } from "zod";
import { CategoryDTO } from "../category/index.dto.js";

export const ProductDTO = z
    .object({
        id: z.number(),
        name: z.string().min(1).max(255),
        price: z.string().transform((val) => {
            return parseInt(val);
        }),
        stock: z.number().min(0),
        imageName: z.string().min(1).max(255),
        imageData: z.string().min(1),
        dateExpired: z.string().datetime(),
        category: CategoryDTO
    })
    .strict();

export type ProductDtoType = z.infer<typeof ProductDTO>;

export const FindProductByCategoryIdParams = z
    .object({
        categoryId: z.number()
    })
    .strict();

export type FindProductByCategoryIdParamsType = z.infer<
    typeof FindProductByCategoryIdParams
>;

export const FindProductByNameParams = z
    .object({
        name: z.string()
    })
    .strict();

export type FindProductByNameParamsType = z.infer<
    typeof FindProductByNameParams
>;

export const CartDTO = z
    .object({
        id: z.number(),
        productId: z.number(),
        quantity: z.number().min(1)
    })
    .strict();

export type CartDtoType = z.infer<typeof CartDTO>;

export const AddToCartDTO = z
    .object({
        productId: z.number(),
        quantity: z.number().min(1)
    })
    .strict();

export type AddToCartDtoType = z.infer<typeof AddToCartDTO>;

export const CartWithProductDTO = z.object({
    id: z.number(),
    product: z.object({
        id: z.number(),
        name: z.string().min(1).max(255),
        price: z.number(),
        stock: z.number().min(0),
        imageName: z.string().min(1).max(255),
        imageData: z.string().min(1),
        dateExpired: z.string().datetime(),
        categoryId: z.number()
    }),
    quantity: z.number().min(1)
});

export type CartWithProductDtoType = z.infer<typeof CartWithProductDTO>;

export const CartPreviewDTO = z
    .object({
        itemsCount: z.number(),
        totalPrice: z.number()
    })
    .strict();

export type CartPreviewDtoType = z.infer<typeof CartPreviewDTO>;

export const UpdateQuantityCartItem = z
    .object({
        cartItemId: z.number(),
        quantity: z.number().min(1)
    })
    .strict();

export type UpdateQuantityCartItemType = z.infer<typeof UpdateQuantityCartItem>;
