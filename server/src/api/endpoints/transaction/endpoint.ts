import { Hono } from "hono";
import * as transactionHandler from "./handler.js";
import {
    authentication,
    authorization
} from "../../middlewares/auth.middleware.js";

const transactionEndpoint = new Hono();

transactionEndpoint.put(
    "/admin/update-transaction-status",
    authorization,
    transactionHandler.updateTransactionStatus
);

transactionEndpoint.get("/admin", authorization, transactionHandler.getAll);

transactionEndpoint.post(
    "/checkout",
    authentication,
    transactionHandler.checkout
);

transactionEndpoint.get(
    "/my-orders",
    authentication,
    transactionHandler.getMyOrders
);

transactionEndpoint.get(
    "/details",
    authentication,
    transactionHandler.getTransactionDetails
);

export default transactionEndpoint;
