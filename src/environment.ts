import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, '/.env') });

export const ENV_VARIABLES = {
    OPEN_ROUTER_MODEL: process.env.OPEN_ROUTER_MODEL ?? null,
    OPEN_ROUTER_API_KEY: process.env.OPEN_ROUTER_API_KEY ?? null,
    OPEN_ROUTER_API_URL: process.env.OPEN_ROUTER_API_URL ?? null,
}