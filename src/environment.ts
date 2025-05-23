import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, '/.env') });

export const ENV_VARIABLES = {
    LOG_LEVEL: process.env.LOG_LEVEL ?? "info",
    OPEN_ROUTER_MODEL: process.env.OPEN_ROUTER_MODEL ?? "",
    OPEN_ROUTER_API_KEY: process.env.OPEN_ROUTER_API_KEY ?? "",
    OPEN_ROUTER_API_URL: process.env.OPEN_ROUTER_API_URL ?? "",
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
    STREAMING: process.env.STREAMING === "true",
    
    VECTOR_STORE_TYPE: process.env.VECTOR_STORE_TYPE ?? "memory",
    VECTOR_STORE_URL: process.env.VECTOR_STORE_URL ?? "http://localhost:6333",
}

