import {
    integer,
    numeric,
    pgTable,
    serial,
    text,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";
import { categories } from "./categories";

export const products = pgTable("Products", {
    id: serial("Id").primaryKey(),
    name: varchar("Name", { length: 255 }).notNull(),
    price: numeric("Price").notNull(),
    stock: integer("Stock").notNull(),
    imageName: varchar("Image_Name", { length: 255 }).notNull(),
    imageData: text("Image_Data").notNull(),
    dateExpired: timestamp("Date_Expired", { withTimezone: false }).notNull(),

    categoryId: integer("Category_Id")
        .notNull()
        .references(() => categories.id, { onDelete: "set null" })
});
