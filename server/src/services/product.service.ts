import { and, eq, sql } from "drizzle-orm";
import {
    ProductDtoType,
    CreateProductDtoType,
    UpdateProductDtoType,
    AddToCartDtoType,
    CartDtoType
} from "../db/dtos/product/index.dto";
import { carts, categories, products } from "../db/schema/index.schema";
import {
    CartPreviewDtoType,
    CartWithProductDtoType
} from "../db/dtos/product/common.dto";
import { db } from "../db/index.db";

export class ProductService {
    constructor() {}

    async getAll(): Promise<ProductDtoType[]> {
        try {
            const rows: ProductDtoType[] = await db
                .select({
                    id: products.id,
                    name: products.name,
                    price: sql<number>`cast(${products.price} as numeric)`,
                    stock: products.stock,
                    imageName: products.imageName,
                    imageData: products.imageData,
                    dateExpired: sql<string>`to_char(${products.dateExpired}, 'YYYY-MM-DD HH24:MI:SS')`,
                    category: categories
                })
                .from(products)
                .orderBy(products.id)
                .innerJoin(categories, eq(products.categoryId, categories.id));

            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getAllByCategoryId(
        categoryId: number
    ): Promise<Omit<ProductDtoType, "category">[]> {
        try {
            const rows: Omit<ProductDtoType, "category">[] = await db
                .select({
                    id: products.id,
                    name: products.name,
                    price: sql<number>`cast(${products.price} as numeric)`,
                    stock: products.stock,
                    imageName: products.imageName,
                    imageData: products.imageData,
                    dateExpired: sql<string>`to_char(${products.dateExpired}, 'YYYY-MM-DD HH24:MI:SS')`
                })
                .from(products)
                .orderBy(products.id)
                .where(eq(categories.id, categoryId))
                .innerJoin(categories, eq(products.categoryId, categories.id));

            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<ProductDtoType | undefined> {
        try {
            const rows: ProductDtoType[] = await db
                .select({
                    id: products.id,
                    name: products.name,
                    price: sql<number>`cast(${products.price} as numeric)`,
                    stock: products.stock,
                    imageName: products.imageName,
                    imageData: products.imageData,
                    dateExpired: sql<string>`to_char(${products.dateExpired}, 'YYYY-MM-DD HH24:MI:SS')`,
                    category: categories
                })
                .from(products)
                .where(eq(products.id, id))
                .innerJoin(categories, eq(products.categoryId, categories.id))
                .limit(1);

            const product = rows[0];

            return product;
        } catch (error) {
            throw error;
        }
    }

    async add(request: CreateProductDtoType): Promise<boolean> {
        try {
            const {
                name,
                price,
                stock,
                dateExpired,
                categoryId,
                imageName,
                imageData
            } = request;

            const tomorrow = new Date();
            tomorrow.setDate(new Date().getDate() + 1);

            const result = await db.insert(products).values({
                name,
                price: price.toString(),
                stock,
                imageName: imageName!,
                imageData: imageData!,
                dateExpired,
                categoryId
            });

            return result.count > 0;
        } catch (error) {
            throw error;
        }
    }

    async update(
        productId: number,
        request: UpdateProductDtoType
    ): Promise<boolean> {
        try {
            const { name, price, stock, dateExpired, categoryId } = request;
            const tomorrow = new Date();
            tomorrow.setDate(new Date().getDate() + 1);

            const result = await db
                .update(products)
                .set({
                    name,
                    price: price.toString(),
                    stock,
                    dateExpired,
                    categoryId
                })
                .where(eq(products.id, productId));

            return result.count > 0;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const result = await db.delete(products).where(eq(products.id, id));

            return result.count > 0;
        } catch (error) {
            throw error;
        }
    }

    async upsertToCart(
        userId: number,
        product: ProductDtoType,
        quantity: number,
        savedCart: CartDtoType | undefined
    ): Promise<CartDtoType> {
        try {
            let rows: CartDtoType[];
            const result = await db.transaction(async (tx) => {
                if (!savedCart) {
                    rows = await tx
                        .insert(carts)
                        .values({
                            userId,
                            productId: product.id,
                            quantity
                        })
                        .returning({
                            id: carts.id,
                            productId: carts.productId,
                            quantity: carts.quantity
                        });
                } else {
                    rows = await tx
                        .update(carts)
                        .set({
                            quantity: savedCart.quantity + quantity
                        })
                        .where(eq(carts.id, savedCart.id))
                        .returning({
                            id: carts.id,
                            productId: carts.productId,
                            quantity: carts.quantity
                        });
                }

                await tx
                    .update(products)
                    .set({
                        stock: product.stock - quantity
                    })
                    .where(eq(products.id, product.id));

                const savedProductInCart = rows[0]!;
                return savedProductInCart;
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    async findCartByUserIdAndProductId(
        userId: number,
        productId: number
    ): Promise<CartDtoType | undefined> {
        try {
            const filterUser = eq(carts.userId, userId);
            const filterProduct = eq(carts.productId, productId);

            const cartsFromDb: CartDtoType[] = await db
                .select()
                .from(carts)
                .where(and(filterUser, filterProduct))
                .limit(1);

            const cart = cartsFromDb[0];

            return cart;
        } catch (error) {
            throw error;
        }
    }

    async findCartByUserId(userId: number): Promise<CartWithProductDtoType[]> {
        try {
            const rows: CartWithProductDtoType[] = await db
                .select({
                    id: carts.id,
                    product: {
                        id: products.id,
                        name: products.name,
                        price: sql<number>`cast(${products.price} as numeric)`,
                        stock: products.stock,
                        imageName: products.imageName,
                        imageData: products.imageData,
                        dateExpired: sql<string>`to_char(${products.dateExpired}, 'YYYY-MM-DD HH24:MI:SS')`,
                        categoryId: products.categoryId
                    },
                    quantity: carts.quantity
                })
                .from(carts)
                .where(eq(carts.userId, userId))
                .innerJoin(products, eq(carts.productId, products.id));

            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getCartItemsCountAndTotalPrice(
        userId: number
    ): Promise<CartPreviewDtoType> {
        try {
            const rows = await db
                .select({
                    itemsCount: sql<number>`sum(${carts.quantity})`,
                    totalPrice: sql<number>`sum(${carts.quantity} * ${products.price})`
                })
                .from(carts)
                .where(eq(carts.userId, userId))
                .innerJoin(products, eq(carts.productId, products.id));

            const cart = rows[0];
            return cart ?? { itemsCount: 0, totalPrice: 0 };
        } catch (error) {
            throw error;
        }
    }

    async removeItemFromCart(
        userId: number,
        cartItemId: number
    ): Promise<CartWithProductDtoType[]> {
        try {
            const filterCartById = eq(carts.id, cartItemId);
            const filterCartByUser = eq(carts.userId, userId);

            await db.transaction(async (tx) => {
                const rows = await db
                    .delete(carts)
                    .where(and(filterCartById, filterCartByUser))
                    .returning({
                        productId: carts.productId,
                        quantity: carts.quantity
                    });

                if (rows.length > 0) {
                    const { productId, quantity } = rows[0]!;
                    const product = (await this.getById(productId))!;

                    await tx.update(products).set({
                        stock: product.stock + quantity
                    });
                }
            });

            return await this.findCartByUserId(userId);
        } catch (error) {
            throw error;
        }
    }

    async updateQuantityItemInCart(
        userId: number,
        cartItemId: number,
        quantity: number
    ): Promise<CartWithProductDtoType[]> {
        try {
            await db
                .update(carts)
                .set({
                    quantity
                })
                .where(eq(carts.id, cartItemId))
                .returning({ quantity: carts.quantity });

            return await this.findCartByUserId(userId);
        } catch (error) {
            throw error;
        }
    }

    async getItemFromCart(
        cartItemId: number
    ): Promise<CartWithProductDtoType | undefined> {
        try {
            const rows: CartWithProductDtoType[] = await db
                .select({
                    id: carts.id,
                    product: {
                        id: products.id,
                        name: products.name,
                        price: sql<number>`cast(${products.price} as numeric)`,
                        stock: products.stock,
                        imageName: products.imageName,
                        imageData: products.imageData,
                        dateExpired: sql<string>`to_char(${products.dateExpired}, 'YYYY-MM-DD HH24:MI:SS')`,
                        categoryId: products.categoryId
                    },
                    quantity: carts.quantity
                })
                .from(carts)
                .where(eq(carts.id, cartItemId))
                .innerJoin(products, eq(carts.productId, products.id));

            const cartItem = rows[0];

            return cartItem;
        } catch (error) {
            throw error;
        }
    }
}
