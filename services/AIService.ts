import { ENV_VARIABLES } from "../environment";
import { MakePostCall } from "./apiService";
import { MODEL_TYPE } from "../constants";
import { BaseRequest } from "../types";
import { OpenRouterRequest, GeminiRequest } from "../requests"

export const askQuestion = async (docContent: string, question: string): Promise<any> => {
    let modelRequest: BaseRequest;
    if (ENV_VARIABLES.AI_PROVIDER.toUpperCase() === MODEL_TYPE.OPEN_ROUTER_AI) {
        modelRequest = new OpenRouterRequest(docContent, question);
    } else {
        modelRequest = new GeminiRequest(docContent, question);
    }

    const request = await modelRequest.getRequest();
    console.log(request.url);
    const response = await MakePostCall(request);
    return modelRequest.parseResponse(response) as any; // Adjust the type as needed
}