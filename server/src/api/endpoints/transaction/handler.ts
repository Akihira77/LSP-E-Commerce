import { Context } from "hono";
import { JwtAuthPayload } from "../../../utils/jwt.js";
import {
    ProductService,
    TransactionService,
    UserService
} from "../../../services/index.service.js";
import { StatusCodes } from "../../../utils/constants.js";
import { zValidator } from "@hono/zod-validator";
import {
    TransactionDetailsParams,
    UpdateStatusTransactionDTO
} from "../../../db/dtos/transaction/index.dto.js";
import {
    CustomAPIError,
    ZValidationAPIError
} from "../../../errors/index.error.js";

const productService = new ProductService();
const transactionService = new TransactionService();
const userService = new UserService();

export const checkout = async (context: Context) => {
    try {
        const user = context.get("user") as JwtAuthPayload;

        const myCart = await productService.findCartByUserId(user.userId);

        if (myCart.length === 0) {
            throw new CustomAPIError(
                "You don't have any order",
                StatusCodes.BadRequest400
            );
        }

        const result = await transactionService.checkout(user.userId, myCart);

        context.status(StatusCodes.Created201);
        return context.json({ ...result });
    } catch (error) {
        throw error;
    }
};

export const updateTransactionStatus = zValidator(
    "json",
    UpdateStatusTransactionDTO,
    async (validation, context: Context) => {
        try {
            if (!validation.success) {
                throw new ZValidationAPIError(validation.error);
            }

            const user = context.get("user") as JwtAuthPayload;
            const { status, transactionId } = validation.data;

            const transactionDb =
                await transactionService.getTransactionById(transactionId);

            if (!transactionDb) {
                throw new CustomAPIError(
                    "Transaction does not found",
                    StatusCodes.NotFound404
                );
            }

            const updatedTransaction =
                await transactionService.updateTransactionStatus(
                    status,
                    transactionId
                );

            if (!updatedTransaction) {
                throw new CustomAPIError(
                    "Updating transaction status failed",
                    StatusCodes.InternalServerError500
                );
            }

            context.status(StatusCodes.Ok200);
            return context.json({ user, transaction: updatedTransaction });
        } catch (error) {
            throw error;
        }
    }
);

export const getTransactionDetails = zValidator(
    "query",
    TransactionDetailsParams,
    async (validation, context: Context) => {
        try {
            if (!validation.success) {
                throw new ZValidationAPIError(validation.error);
            }

            const { userId, transactionId } = validation.data;

            const transaction =
                await transactionService.getTransactionById(transactionId);

            if (!transaction) {
                throw new CustomAPIError(
                    "Transactions does not found",
                    StatusCodes.NotFound404
                );
            }

            const user = await userService.getById({ id: userId });

            if (!user) {
                throw new CustomAPIError(
                    "User who have this transaction does not found",
                    StatusCodes.NotFound404
                );
            }

            const transactionDetails =
                await transactionService.getTransactionDetails(transactionId);

            context.status(StatusCodes.Ok200);
            return context.json({
                user,
                transaction: {
                    ...transaction,
                    details: transactionDetails
                }
            });
        } catch (error) {
            throw error;
        }
    }
);

export const getAll = async (context: Context) => {
    try {
        const transactions = await transactionService.getAll();

        context.status(StatusCodes.Ok200);
        return context.json({ transactions });
    } catch (error) {
        throw error;
    }
};

export const getMyOrders = async (context: Context) => {
    try {
        const user = context.get("user") as JwtAuthPayload;
        const orders = await transactionService.getAllMyTransactions(
            user.userId
        );

        context.status(StatusCodes.Ok200);
        return context.json({ orders });
    } catch (error) {
        throw error;
    }
};
