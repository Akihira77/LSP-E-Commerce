import { Context, Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { compress } from "hono/compress";
import { errorHandler } from "./api/middlewares/index.middleware.js";
import {
    categoryEndpoint,
    productEndpoint,
    transactionEndpoint,
    userEndpoint
} from "./api/endpoints/index.endpoints.js";

export default async function startHonoApp() {
    const app = new Hono({ strict: true });

    app.use(
        "*",
        cors({
            credentials: true,
            allowMethods: ["GET", "POST", "PUT", "DELETE"],
            origin: ["http://localhost:5173"]
        })
    );

    app.use("*", logger());
    app.use("*", compress());

    app.route("/api/users", userEndpoint);
    app.route("/api/products", productEndpoint);
    app.route("/api/categories", categoryEndpoint);
    app.route("/api/transactions", transactionEndpoint);

    app.onError(errorHandler);
    app.notFound((context: Context) => {
        console.log("Someone reach this route");
        return context.text("Whoops!", { status: 404 });
    });
    return app;
}
