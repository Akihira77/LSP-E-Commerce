import { Hono } from "hono";
import * as userHandler from "./handler.js";
import { authentication } from "../../middlewares/index.middleware.js";
import { authorization } from "../../middlewares/auth.middleware.js";

const userEndpoint = new Hono();

userEndpoint.get("/admin", authorization, userHandler.getAll);
userEndpoint.delete("/admin/:id", authorization, userHandler.removeUserByAdmin);

userEndpoint.get("", userHandler.getAll);

userEndpoint.post("/auth/register", userHandler.register);
userEndpoint.post("/auth/login", userHandler.login);
userEndpoint.get("/auth/status", authentication, userHandler.userStatus);

userEndpoint.delete("/:id", authorization, userHandler.remove);

export default userEndpoint;
