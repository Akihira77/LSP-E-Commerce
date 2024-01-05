import { StatusCodes } from "../../utils/constants.js";
import {
    CustomAPIError,
    ZValidationAPIError
} from "../../errors/index.error.js";
import { Context, ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import postgres from "postgres";

export const errorHandler: ErrorHandler = (err: unknown, context: Context) => {
    console.log("Catching error from Error Middleware =", err);

    if (err instanceof CustomAPIError) {
        context.status(err.statusCode);
        return context.json({ errors: err.message });
    } else if (err instanceof HTTPException) {
        return err.getResponse();
    } else if (err instanceof ZValidationAPIError) {
        context.status(err.statusCode);
        return context.json({ errors: err.errors });
    } else if (err instanceof postgres.PostgresError) {
        context.status(409);
        return context.json({
            error: {
                path: err.constraint_name,
                details: err.detail
            }
        });
    }

    context.status(StatusCodes.InternalServerError500);
    return context.json({ err });
};
