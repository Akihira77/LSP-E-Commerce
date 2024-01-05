// import {
//     integer,
//     numeric,
//     pgEnum,
//     pgTable,
//     serial,
//     text,
//     timestamp,
//     varchar
// } from "drizzle-orm/pg-core";
// import { v4 as uuidv4 } from "uuid";

// export const userRoles = pgEnum("Roles", ["CUSTOMER", "ADMIN"]);

// export const users = pgTable("Users", {
//     id: serial("Id").primaryKey(),
//     name: varchar("Name", { length: 25 }).notNull(),
//     phoneNumber: varchar("Phone_Number", { length: 16 }).notNull().unique(),
//     email: varchar("Email", { length: 25 }).notNull().unique(),
//     password: varchar("Password", { length: 255 }).notNull(),
//     role: userRoles("Roles").default("CUSTOMER").notNull(),
//     createdAt: timestamp("Created_At", { withTimezone: false }).notNull(),
//     updatedAt: timestamp("Updated_At", { withTimezone: false })
//         .notNull()
//         .defaultNow()
// });

// export const addresses = pgTable("Addresses", {
//     id: serial("Id").primaryKey(),
//     street: varchar("Street", { length: 255 }).notNull(),
//     city: varchar("City", { length: 25 }).notNull(),
//     state: varchar("State", { length: 25 }).notNull(),
//     postalCode: varchar("Postal_Code", { length: 9 }).notNull(),
//     createdAt: timestamp("Created_At", { withTimezone: false }).notNull(),
//     updatedAt: timestamp("Updated_At", { withTimezone: false })
//         .notNull()
//         .defaultNow(),

//     userId: integer("User_Id")
//         .notNull()
//         .references(() => users.id, { onDelete: "cascade" })
// });

// export const categories = pgTable("Categories", {
//     id: serial("Id").primaryKey(),
//     name: varchar("Name", { length: 25 }).notNull(),
//     createdAt: timestamp("Created_At", { withTimezone: false }).notNull(),
//     updatedAt: timestamp("Updated_At", { withTimezone: false })
//         .notNull()
//         .defaultNow()
// });

// export const products = pgTable("Products", {
//     id: serial("Id").primaryKey(),
//     name: varchar("Name", { length: 255 }).notNull(),
//     price: numeric("Price").notNull(),
//     stock: integer("Stock").notNull(),
//     imageName: varchar("Image_Name", { length: 255 }).notNull(),
//     imageData: text("Image_Data").notNull(),
//     dateExpired: timestamp("Date_Expired", { withTimezone: false }).notNull(),

//     categoryId: integer("Category_Id")
//         .notNull()
//         .references(() => categories.id, { onDelete: "set null" })
// });

// export const statusEnum = pgEnum("Status_Transactions", [
//     "PENDING",
//     "SUCCESS",
//     "CANCELED"
// ]);

// export const transactions = pgTable("Transactions", {
//     id: serial("Id").primaryKey(),
//     totalPrice: numeric("Total_Price").notNull(),
//     paymentMethod: varchar("Payment_Method", { length: 15 })
//         .notNull()
//         .default("TUNAI"),
//     status: statusEnum("Status_Transactions").notNull(),
//     createdAt: timestamp("Created_At", { withTimezone: false }).notNull(),

//     userId: integer("User_Id")
//         .notNull()
//         .references(() => users.id, { onDelete: "cascade" })
// });

// export const transactionDetails = pgTable("Transaction_Details", {
//     id: serial("Id").primaryKey(),
//     quantity: integer("Quantity").notNull(),

//     productId: integer("Product_Id")
//         .notNull()
//         .references(() => products.id),

//     transanctionId: integer("Transaction_Id")
//         .notNull()
//         .references(() => transactions.id)
// });

// export const carts = pgTable("Carts", {
//     id: serial("Id").primaryKey(),
//     quantity: integer("Quantity").notNull(),

//     userId: integer("User_Id")
//         .notNull()
//         .references(() => users.id),

//     productId: integer("Product_Id")
//         .notNull()
//         .references(() => products.id)
// });
