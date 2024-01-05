import { Hono } from "hono";
import * as productHandler from "./handler.js";
import {
    authentication,
    authorization
} from "../../middlewares/auth.middleware.js";

const productEndpoint = new Hono();

productEndpoint.get(
    "/admin",
    authorization,
    productHandler.adminGetAllProductIncludeCategory
);
productEndpoint.post("/admin", authorization, productHandler.create);
productEndpoint.put("/admin", authorization, productHandler.update);
productEndpoint.delete("/admin/:id", authorization, productHandler.remove);
productEndpoint.post("/add-to-cart", authentication, productHandler.addToCart);
productEndpoint.get("/cart/my-cart", authentication, productHandler.getMyCart);

productEndpoint.get("", productHandler.getAllOrByCategoryId);
productEndpoint.put("/cart", productHandler.updateItemQuantityInCart);
productEndpoint.get("/:id", productHandler.getById);

productEndpoint.get(
    "/cart/preview",
    authentication,
    productHandler.getCartItemsCountAndTotalPrice
);

productEndpoint.delete(
    "/cart/:cartItemId",
    authentication,
    productHandler.removeItemFromMyCart
);

export default productEndpoint;
