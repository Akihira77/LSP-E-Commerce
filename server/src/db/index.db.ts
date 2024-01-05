import { POSTGRES_URI } from "../config/index.config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// import * as schema from "./schema";

const connectionString = POSTGRES_URI!;

const client = postgres(connectionString, { max: 100 });
export const db = drizzle(client);
