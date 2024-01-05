import { Hono } from "hono";
import * as categoryHandler from "./handler.js";
import {
    authentication,
    authorization
} from "../../middlewares/auth.middleware.js";

const categoryEndpoint = new Hono();

categoryEndpoint.post("/admin", authorization, categoryHandler.create);

categoryEndpoint.get("", categoryHandler.getAll);
categoryEndpoint.get("/:id", categoryHandler.getById);

// .put("/:id", categoryHandler.);

export default categoryEndpoint;
