import { and, eq, sql } from "drizzle-orm";
import {
    CheckoutResponseDtoType,
    TransactionDetailsDtoType,
    TransactionDtoType
} from "../db/dtos/transaction/index.dto";
import { db } from "../db/index.db";
import {
    addresses,
    carts,
    categories,
    products,
    transactionDetails,
    transactions,
    users
} from "../db/schema/index.schema";
import { CartWithProductDtoType } from "../db/dtos/product/common.dto";

export class TransactionService {
    constructor() {}

    async getAll(): Promise<any[]> {
        try {
            const rows = await db
                .select({
                    id: transactions.id,
                    totalPrice: sql<number>`cast(${transactions.totalPrice} as numeric)`,
                    paymentMethod: transactions.paymentMethod,
                    status: transactions.status,
                    createdAt: transactions.createdAt,
                    user: {
                        id: users.id,
                        username: users.name,
                        email: users.email,
                        phoneNumber: users.phoneNumber,
                        createdAt: users.createdAt,
                        updatedAt: users.updatedAt
                    },
                    address: addresses
                })
                .from(transactions)
                .innerJoin(users, eq(transactions.userId, users.id))
                .innerJoin(addresses, eq(addresses.userId, users.id));

            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getTransactionDetails(
        transactionId: number
    ): Promise<TransactionDetailsDtoType[]> {
        try {
            const rows = await db
                .select({
                    id: transactionDetails.id,
                    product: {
                        id: products.id,
                        name: products.name,
                        price: sql<number>`cast(${products.price} as numeric)`,
                        stock: products.stock,
                        imageName: products.imageName,
                        imageData: products.imageData
                    },
                    category: {
                        id: categories.id,
                        name: categories.name
                    },
                    quantity: transactionDetails.quantity
                })
                .from(transactionDetails)
                .where(eq(transactionDetails.transanctionId, transactionId))
                .innerJoin(
                    products,
                    eq(transactionDetails.productId, products.id)
                )
                .innerJoin(categories, eq(products.categoryId, categories.id));

            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getTransactionById(
        id: number
    ): Promise<CheckoutResponseDtoType | undefined> {
        try {
            const rows: CheckoutResponseDtoType[] = await db
                .select({
                    id: transactions.id,
                    totalPrice: sql<number>`cast(${transactions.totalPrice} as numeric)`,
                    paymentMethod: transactions.paymentMethod,
                    status: transactions.status,
                    createdAt: transactions.createdAt
                })
                .from(transactions)
                .where(eq(transactions.id, id));

            const transaction = rows[0];
            return transaction;
        } catch (error) {
            throw error;
        }
    }

    async checkout(
        userId: number,
        request: CartWithProductDtoType[]
    ): Promise<CheckoutResponseDtoType> {
        try {
            const result = await db.transaction(async (tx) => {
                const totalPrice = this.calculateTotalPrice(request);

                const results = await tx
                    .insert(transactions)
                    .values({
                        userId,
                        totalPrice: totalPrice.toString(),
                        status: "PENDING",
                        createdAt: new Date(),
                        paymentMethod: "TUNAI"
                    })
                    .returning({
                        id: transactions.id,
                        status: transactions.status,
                        totalPrice: sql<number>`cast(${transactions.totalPrice} as numeric)`,
                        paymentMethod: transactions.paymentMethod,
                        createdAt: transactions.createdAt
                    });

                const savedTransaction = results[0]!;

                for (const cartItem of request) {
                    const { product, quantity } = cartItem;
                    await tx.insert(transactionDetails).values({
                        productId: product.id,
                        quantity,
                        transanctionId: savedTransaction.id
                    });

                    const filterUser = eq(carts.userId, userId);
                    const filterProduct = eq(carts.productId, product.id);
                    await tx
                        .delete(carts)
                        .where(and(filterUser, filterProduct));
                }

                return savedTransaction;
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateTransactionStatus(
        status: "CANCELED" | "PENDING" | "SUCCESS",
        transactionId: number
    ): Promise<boolean> {
        try {
            const rows = await db
                .update(transactions)
                .set({
                    status
                })
                .where(eq(transactions.id, transactionId));

            return rows.count > 0;
        } catch (error) {
            throw error;
        }
    }

    async getAllMyTransactions(
        userId: number
    ): Promise<CheckoutResponseDtoType[]> {
        try {
            const rows: CheckoutResponseDtoType[] = await db
                .select({
                    id: transactions.id,
                    totalPrice: sql<number>`cast(${transactions.totalPrice} as numeric)`,
                    paymentMethod: transactions.paymentMethod,
                    status: transactions.status,
                    createdAt: transactions.createdAt
                })
                .from(transactions)
                .where(eq(transactions.userId, userId));

            return rows;
        } catch (error) {
            throw error;
        }
    }

    calculateTotalPrice(transactionDetails: CartWithProductDtoType[]): number {
        const totalPrice = transactionDetails.reduce(
            (accumulator: number, transactionItem: any) => {
                const { product, quantity } = transactionItem;
                const productTotal = product.price * quantity;
                return accumulator + productTotal;
            },
            0
        );

        return totalPrice;
    }
}
