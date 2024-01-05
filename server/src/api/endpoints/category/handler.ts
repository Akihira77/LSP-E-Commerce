import { Context } from "hono";
import { CategoryService } from "../../../services/index.service.js";
import { StatusCodes } from "../../../utils/constants.js";
import { zValidator } from "@hono/zod-validator";
import { CreateCategoryDTO } from "../../../db/dtos/category/index.dto.js";
import { ZValidationAPIError } from "../../../errors/index.error.js";

const categoryService = new CategoryService();

export const getAll = async (context: Context) => {
    try {
        const categories = await categoryService.getAll();

        context.status(StatusCodes.Ok200);
        return context.json({ categories });
    } catch (error) {
        throw error;
    }
};

export const getById = async (context: Context) => {
    try {
        const query = context.req.param("id");
        const categoryId = parseInt(query);
        const category = await categoryService.getById(categoryId);

        if (!category) {
            context.status(StatusCodes.NotFound404);
            return context.json({ message: "Category did not exists" });
        }
    } catch (error) {
        throw error;
    }
};

export const create = zValidator(
    "json",
    CreateCategoryDTO,
    async (validation, context: Context) => {
        try {
            if (!validation.success) {
                throw new ZValidationAPIError(validation.error);
            }

            const body = validation.data;
            const result = await categoryService.add(body);

            if (!result) {
                context.status(StatusCodes.BadRequest400);
                return context.json({ message: "Create category failed" });
            }

            context.status(StatusCodes.Created201);
            return context.json({ message: "Category successfully created" });
        } catch (error) {
            throw error;
        }
    }
);
