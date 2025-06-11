import { ChatOpenAI } from "@langchain/openai";
import { ENV_VARIABLES } from "../environment";


export const ChatOpenAIModel = (modelName: string) => {
    return new ChatOpenAI({
        openAIApiKey: ENV_VARIABLES.OPEN_ROUTER_API_KEY,
        modelName,
        configuration: {
            baseURL: ENV_VARIABLES.OPEN_ROUTER_API_URL
        }
    });
}

export const ChatOpenAIModelWithStreaming = (modelName: string) => {
    return new ChatOpenAI({
        openAIApiKey: ENV_VARIABLES.OPEN_ROUTER_API_KEY,
        modelName,
        configuration: {
            baseURL: ENV_VARIABLES.OPEN_ROUTER_API_URL
        },
        streaming: true
    });
}
