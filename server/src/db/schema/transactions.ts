import {
    integer,
    numeric,
    pgEnum,
    pgTable,
    serial,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const statusEnum = pgEnum("Status_Transactions", [
    "PENDING",
    "SUCCESS",
    "CANCELED"
]);

export const transactions = pgTable("Transactions", {
    id: serial("Id").primaryKey(),
    totalPrice: numeric("Total_Price").notNull(),
    paymentMethod: varchar("Payment_Method", { length: 15 })
        .notNull()
        .default("TUNAI"),
    status: statusEnum("Status_Transactions").notNull(),
    createdAt: timestamp("Created_At", { withTimezone: false }).notNull(),

    userId: integer("User_Id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" })
});
