import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { products } from "./products";
import { transactions } from "./transactions";

export const transactionDetails = pgTable("Transaction_Details", {
    id: serial("Id").primaryKey(),
    quantity: integer("Quantity").notNull(),

    productId: integer("Product_Id")
        .notNull()
        .references(() => products.id),

    transanctionId: integer("Transaction_Id")
        .notNull()
        .references(() => transactions.id)
});
