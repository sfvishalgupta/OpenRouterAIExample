import dotenv from "dotenv";
dotenv.config({ path: './src/.env' });

export const ENV_VARIABLES = {
    LOG_LEVEL: process.env.LOG_LEVEL ?? "info",
    OPEN_ROUTER_MODEL: process.env.OPEN_ROUTER_MODEL ?? "",
    OPEN_ROUTER_API_KEY: process.env.OPEN_ROUTER_API_KEY ?? "",
    OPEN_ROUTER_API_URL: process.env.OPEN_ROUTER_API_URL ?? "",
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
    STREAMING: process.env.STREAMING === "true",
    
    VECTOR_STORE_TYPE: process.env.VECTOR_STORE_TYPE ?? "memory",
    VECTOR_STORE_URL: process.env.VECTOR_STORE_URL ?? "http://localhost:6333",

    JIRA_URL: process.env.JIRA_URL ?? "",
    JIRA_EMAIL: process.env.JIRA_EMAIL ?? "",
    JIRA_API_TOKEN: process.env.JIRA_API_TOKEN ?? "",
    JIRA_PROJECT_KEY: process.env.JIRA_PROJECT_KEY ?? "",
    JIRA_MAX_RESULT: process.env.JIRA_MAX_RESULT ? parseInt(process.env.JIRA_MAX_RESULT) : 10,
    JIRA_FETCH_FIELDS: process.env.JIRA_FETCH_FIELDS ? process.env.JIRA_FETCH_FIELDS.split(',') : ["summary", "status", "assignee", "reporter"],
}

