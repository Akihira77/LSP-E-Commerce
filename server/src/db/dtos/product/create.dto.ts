import { File } from "buffer";
import { z } from "zod";
import { checkFileType } from "../../../utils/common.js";

const MAX_FILE_SIZE = 2000000;

export const CreateProductDTO = z
    .object({
        name: z.string().min(1).max(255),
        price: z.string().transform((val) => parseInt(val)),
        stock: z.string().transform((val) => parseInt(val)),
        imageName: z.optional(z.string().min(1).max(255)),
        imageData: z.optional(z.string().min(1)),
        image: z.any().superRefine((val: unknown, ctx: z.RefinementCtx) => {
            if (!val) {
                return ctx.addIssue({
                    code: "custom",
                    message: "Image is required"
                });
            }

            if (val instanceof File) {
                if (val.size > MAX_FILE_SIZE) {
                    return ctx.addIssue({
                        code: "custom",
                        message: "Max image size is 2MB"
                    });
                }

                if (!checkFileType(val)) {
                    return ctx.addIssue({
                        code: "custom",
                        message:
                            "Only .webp, .jpeg, .jpg, and .png formats are supported."
                    });
                }
                return;
            }

            return ctx.addIssue({
                code: "custom",
                message: "Image is incorrect"
            });
        }),
        dateExpired: z
            .string()
            .datetime()
            .transform((val) => new Date(val)),
        categoryId: z.string().transform((val) => parseInt(val))
    })
    .strict();

export type CreateProductDtoType = z.infer<typeof CreateProductDTO>;
