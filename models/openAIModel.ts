import { ChatOpenAI } from "@langchain/openai";
import { ENV_VARIABLES } from "../environment";


export const ChatOpenAIModel = new ChatOpenAI({
    openAIApiKey: ENV_VARIABLES.OPEN_ROUTER_API_KEY,
    modelName: ENV_VARIABLES.OPEN_ROUTER_MODEL,
    configuration: {
        baseURL: ENV_VARIABLES.OPEN_ROUTER_API_URL
    }
});

export const ChatOpenAIModelWithStreaming = new ChatOpenAI({
    openAIApiKey: ENV_VARIABLES.OPEN_ROUTER_API_KEY,
    modelName: ENV_VARIABLES.OPEN_ROUTER_MODEL,
    configuration: {
        baseURL: ENV_VARIABLES.OPEN_ROUTER_API_URL
    },
    streaming: true
});
