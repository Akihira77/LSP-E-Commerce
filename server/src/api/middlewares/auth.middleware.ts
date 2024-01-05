import { CustomAPIError } from "../../errors/index.error.js";
import { StatusCodes } from "../../utils/constants.js";
import { JwtAuthPayload, jwtVerify } from "../../utils/jwt.js";
import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";

export const authentication = async (context: Context, next: Next) => {
    try {
        // COOKIE APPROACH
        const token = getCookie(context, "token");
        if (!token || token === "") {
            throw new CustomAPIError(
                "Unauthenticated",
                StatusCodes.Forbidden403
            );
        }

        const payload = jwtVerify(token);
        // console.log(payload);
        context.set("user", payload);
        await next();
    } catch (error) {
        throw error;
    }
};

export const authorization = async (context: Context, next: Next) => {
    try {
        await authentication(context, next);

        const user = context.get("user");

        console.log(user);

        if (!user || user.role !== "ADMIN") {
            throw new CustomAPIError("Can't Access", StatusCodes.Forbidden403);
        }

        // await next();
    } catch (error) {
        throw error;
    }
};
