import {
    integer,
    pgTable,
    serial,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const addresses = pgTable("Addresses", {
    id: serial("Id").primaryKey(),
    street: varchar("Street", { length: 255 }).notNull(),
    city: varchar("City", { length: 25 }).notNull(),
    state: varchar("State", { length: 25 }).notNull(),
    postalCode: varchar("Postal_Code", { length: 9 }).notNull(),
    createdAt: timestamp("Created_At", { withTimezone: false }).notNull(),
    updatedAt: timestamp("Updated_At", { withTimezone: false })
        .notNull()
        .defaultNow(),

    userId: integer("User_Id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" })
});
