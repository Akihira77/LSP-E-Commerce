import { serial, timestamp, varchar, pgTable } from "drizzle-orm/pg-core";

export const categories = pgTable("Categories", {
    id: serial("Id").primaryKey(),
    name: varchar("Name", { length: 25 }).notNull(),
    createdAt: timestamp("Created_At", { withTimezone: false }).notNull(),
    updatedAt: timestamp("Updated_At", { withTimezone: false })
        .notNull()
        .defaultNow()
});
