import {
    pgEnum,
    pgTable,
    serial,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";

export const userRoles = pgEnum("Roles", ["CUSTOMER", "ADMIN"]);

export const users = pgTable("Users", {
    id: serial("Id").primaryKey(),
    name: varchar("Name", { length: 25 }).notNull(),
    phoneNumber: varchar("Phone_Number", { length: 16 }).notNull().unique(),
    email: varchar("Email", { length: 25 }).notNull().unique(),
    password: varchar("Password", { length: 255 }).notNull(),
    role: userRoles("Roles").default("CUSTOMER").notNull(),
    createdAt: timestamp("Created_At", { withTimezone: false }).notNull(),
    updatedAt: timestamp("Updated_At", { withTimezone: false })
        .notNull()
        .defaultNow()
});
