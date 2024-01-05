import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";

export const carts = pgTable("Carts", {
    id: serial("Id").primaryKey(),
    quantity: integer("Quantity").notNull(),

    userId: integer("User_Id")
        .notNull()
        .references(() => users.id),

    productId: integer("Product_Id")
        .notNull()
        .references(() => products.id)
});
