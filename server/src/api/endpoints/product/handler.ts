import { Context } from "hono";
import {
    CategoryService,
    ProductService
} from "../../../services/index.service.js";
import { StatusCodes } from "../../../utils/constants.js";
import { zValidator } from "@hono/zod-validator";
import {
    AddToCartDTO,
    CreateProductDTO,
    UpdateProductDTO
} from "../../../db/dtos/product/index.dto.js";
import {
    CustomAPIError,
    ZValidationAPIError
} from "../../../errors/index.error.js";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { JwtAuthPayload } from "../../../utils/jwt.js";
import { UpdateQuantityCartItem } from "../../../db/dtos/product/common.dto.js";
import { File } from "buffer";

const productService = new ProductService();
const categoryService = new CategoryService();

export const adminGetAllProductIncludeCategory = async (context: Context) => {
    try {
        const products = await productService.getAll();

        context.status(StatusCodes.Ok200);
        return context.json({ products });
    } catch (error) {
        throw error;
    }
};

export const getAllOrByCategoryId = async (context: Context) => {
    try {
        const query = context.req.query("categoryId");
        if (!query) {
            const products = await productService.getAll();

            context.status(StatusCodes.Ok200);
            return context.json({ products });
        }

        const categoryId = parseInt(query);
        const category = await categoryService.getById(categoryId);

        if (!category) {
            context.status(StatusCodes.NotFound404);
            return context.json({ message: "Category did not exists" });
        }

        const products = await productService.getAllByCategoryId(category.id);

        context.status(StatusCodes.Ok200);
        return context.json({ products });
    } catch (error) {
        throw error;
    }
};

export const create = zValidator(
    "form",
    CreateProductDTO,
    async (validation, context: Context) => {
        try {
            if (!validation.success) {
                throw new ZValidationAPIError(validation.error);
            }

            const body = validation.data;
            const category = await categoryService.getById(body.categoryId);

            if (!category) {
                context.status(StatusCodes.NotFound404);
                return context.json({ message: "Category did not exists" });
            }

            // File
            const image = body.image;
            const buffer = Buffer.from(await image.arrayBuffer());

            const imageBuffer = await sharp(buffer)
                .resize(240, 320)
                .webp()
                .toBuffer();
            const imageType = image.type;
            const fileNameWithExtension = image.name;
            const lastDotIndex = fileNameWithExtension.lastIndexOf(".");

            // Memastikan ada titik dan bukan di awal nama file
            if (lastDotIndex !== -1 && lastDotIndex > 0) {
                body.imageName = fileNameWithExtension.substring(
                    0,
                    lastDotIndex
                );
            } else {
                throw new CustomAPIError(
                    "Image is required",
                    StatusCodes.BadRequest400
                );
            }

            body.imageData = `data:image/${
                imageType.split("/")[1]
            };base64,${imageBuffer.toString("base64")}`;
            const result = await productService.add(body);

            if (!result) {
                context.status(StatusCodes.InternalServerError500);
                return context.json({ message: "Create product failed" });
            }

            context.status(StatusCodes.Created201);
            return context.json({
                message: "Product successfully created"
            });
        } catch (error) {
            throw error;
        }
    }
);

export const getById = async (context: Context) => {
    try {
        const id = context.req.param("id");
        console.log(id);
        const productId = parseInt(id);

        const product = await productService.getById(productId);

        if (!product) {
            throw new CustomAPIError(
                "Product does not found",
                StatusCodes.NotFound404
            );
        }

        context.status(StatusCodes.Ok200);
        return context.json({ product });
    } catch (error) {
        throw error;
    }
};

export const addToCart = zValidator(
    "json",
    AddToCartDTO,
    async (validation, context: Context) => {
        try {
            if (!validation.success) {
                throw new ZValidationAPIError(validation.error);
            }

            const user = context.get("user") as JwtAuthPayload;
            const body = validation.data;

            const productFromDb = await productService.getById(body.productId);
            if (!productFromDb) {
                throw new CustomAPIError(
                    "Product does not found",
                    StatusCodes.NotFound404
                );
            }

            if (productFromDb.stock < body.quantity) {
                throw new CustomAPIError(
                    "Your quantity exceeded our product stock",
                    StatusCodes.BadRequest400
                );
            }

            const cartFromDb =
                await productService.findCartByUserIdAndProductId(
                    user.userId,
                    productFromDb.id
                );

            const updatedCart = await productService.upsertToCart(
                user.userId,
                productFromDb,
                body.quantity,
                cartFromDb
            );

            context.status(StatusCodes.Ok200);
            return context.json({
                success: true,
                product: productFromDb,
                quantity: updatedCart.quantity
            });
        } catch (error) {
            throw error;
        }
    }
);

export const getMyCart = async (context: Context) => {
    try {
        const user = context.get("user") as JwtAuthPayload;
        const myCart = await productService.findCartByUserId(user.userId);

        context.status(StatusCodes.Ok200);
        return context.json({ cart: myCart });
    } catch (error) {
        throw error;
    }
};

export const getCartItemsCountAndTotalPrice = async (context: Context) => {
    try {
        const user = context.get("user") as JwtAuthPayload;
        const result = await productService.getCartItemsCountAndTotalPrice(
            user.userId
        );

        context.status(StatusCodes.Ok200);
        return context.json({ ...result });
    } catch (error) {
        throw error;
    }
};

export const updateItemQuantityInCart = zValidator(
    "json",
    UpdateQuantityCartItem,
    async (validation, context: Context) => {
        try {
            if (!validation.success) {
                throw new ZValidationAPIError(validation.error);
            }

            const user = context.get("user") as JwtAuthPayload;
            let { cartItemId, quantity } = validation.data;

            const cartItem = await productService.getItemFromCart(cartItemId);

            if (!cartItem) {
                context.status(StatusCodes.NotFound404);
                return context.json({
                    message: "Item is not found in your cart"
                });
            }

            quantity = Math.max(0, quantity);
            quantity = Math.min(quantity, cartItem.product.stock);

            if (quantity === 0) {
                const result = await productService.removeItemFromCart(
                    user.userId,
                    cartItemId
                );

                context.status(StatusCodes.Ok200);
                return context.json({ cart: result });
            }

            const result = await productService.updateQuantityItemInCart(
                user.userId,
                cartItemId,
                quantity
            );

            context.status(StatusCodes.Ok200);
            return context.json({ cart: result });
        } catch (error) {
            throw error;
        }
    }
);

export const removeItemFromMyCart = async (context: Context) => {
    try {
        const user = context.get("user") as JwtAuthPayload;
        const cartItemId = parseInt(context.req.param("cartItemId"));

        const cartItem = await productService.getItemFromCart(cartItemId);

        if (!cartItem) {
            context.status(StatusCodes.NotFound404);
            return context.json({
                message: "Item is not found in your cart"
            });
        }

        const results = await productService.removeItemFromCart(
            user.userId,
            cartItem.id
        );

        context.status(StatusCodes.Ok200);
        return context.json({ cart: results });
    } catch (error) {
        throw error;
    }
};

export const update = zValidator(
    "form",
    UpdateProductDTO,
    async (validation, context: Context) => {
        try {
            if (!validation.success) {
                throw new ZValidationAPIError(validation.error);
            }

            const body = validation.data;
            const category = await categoryService.getById(body.categoryId);

            if (!category) {
                context.status(StatusCodes.NotFound404);
                return context.json({ message: "Category did not exists" });
            }

            // File
            const image = body.image;
            const buffer = Buffer.from(await image.arrayBuffer());
            const imageBuffer = await sharp(buffer)
                .resize(240, 320)
                .webp()
                .toBuffer();
            // const encodedFileName = uuidv4();
            const imageType = image.type;
            const fileNameWithExtension = image.name;
            const lastDotIndex = fileNameWithExtension.lastIndexOf(".");

            // Memastikan ada titik dan bukan di awal nama file
            if (lastDotIndex !== -1 && lastDotIndex > 0) {
                body.imageName = fileNameWithExtension.substring(
                    0,
                    lastDotIndex
                );
            } else {
                throw new CustomAPIError(
                    "Image is required",
                    StatusCodes.BadRequest400
                );
            }

            body.imageData = `data:image/${
                imageType.split("/")[1]
            };base64,${imageBuffer.toString("base64")}`;
            const result = await productService.update(body.productId, body);

            if (!result) {
                context.status(StatusCodes.InternalServerError500);
                return context.json({ message: "Update product failed" });
            }

            context.status(StatusCodes.Ok200);
            return context.json({
                message: "Product successfully updated"
            });
        } catch (error) {
            throw error;
        }
    }
);

export const remove = async (context: Context) => {
    try {
        const id = context.req.param("id");
        console.log(id);
        const productId = parseInt(id);

        const product = await productService.getById(productId);

        if (!product) {
            throw new CustomAPIError(
                "Product does not found",
                StatusCodes.NotFound404
            );
        }

        const result = await productService.delete(productId);

        if (!result) {
            context.status(StatusCodes.InternalServerError500);
            return context.json({ message: "Deleting Product Failed" });
        }

        context.status(StatusCodes.Ok200);
        return context.json({ message: "Product successfully deleted" });
    } catch (error) {
        throw error;
    }
};
