import { z } from "zod";
import { StatusCodes } from "../utils/constants.js";

export class ZValidationAPIError extends Error {
    readonly statusCode: number;
    readonly errors: Record<string, string[]>;
    constructor(errors: z.ZodError<any>) {
        super();
        this.name = "Schema Validation";
        this.statusCode = StatusCodes.BadRequest400;
        this.errors = this.formatErrors(errors, {});
    }

    formatErrors(
        errorValidations: z.ZodError,
        errors: Record<string, string[]>
    ) {
        for (const { path, message } of errorValidations.issues) {
            const key = path.join(".");
            if (key in errors) {
                errors[key]!.push(message);
            } else {
                errors[key] = [message];
            }
        }

        return errors;
    }
}
