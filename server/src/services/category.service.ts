import { eq } from "drizzle-orm";
import { db } from "../db/index.db";
import { categories } from "../db/schema/index.schema";
import {
    CategoryDtoType,
    CreateCategoryDtoType,
    UpdateCategoryDtoType
} from "../db/dtos/category/index.dto";

export class CategoryService {
    constructor() {}

    async getAll(): Promise<CategoryDtoType[]> {
        try {
            const rows: CategoryDtoType[] = await db.select().from(categories);

            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<CategoryDtoType | undefined> {
        try {
            const rows: CategoryDtoType[] = await db
                .select()
                .from(categories)
                .where(eq(categories.id, id))
                .limit(1);

            const category = rows[0];

            return category;
        } catch (error) {
            throw error;
        }
    }

    async add(request: CreateCategoryDtoType): Promise<boolean> {
        try {
            const { name } = request;
            const result = await db.insert(categories).values({
                name,
                createdAt: new Date()
            });

            return result.count > 0;
        } catch (error) {
            throw error;
        }
    }

    async update(request: UpdateCategoryDtoType): Promise<boolean> {
        try {
            const { id, name } = request;
            const result = await db
                .update(categories)
                .set({
                    name
                })
                .where(eq(categories.id, id));

            return result.count > 0;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const result = await db
                .delete(categories)
                .where(eq(categories.id, id));

            return result.count > 0;
        } catch (error) {
            throw error;
        }
    }
}
