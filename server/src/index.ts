import { PORT } from "./config/index.config.js";
import startHonoApp from "./hono-app.js";
import { serve } from "@hono/node-server";

const honoApp = await startHonoApp();

serve(
    {
        fetch: honoApp.fetch,
        port: Number(PORT)
    },
    () => {
        console.log(`Listening on http://localhost:${PORT}`);
    }
);
