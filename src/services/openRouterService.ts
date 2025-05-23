
// services/openRouterService.ts
import path from "path";
import { ENV_VARIABLES } from "../environment";
import { getDocumentContent } from "../utils";
import { MakePostCall } from "./apiService";

export const askQuestion = async (docPath: string, question: string): Promise<any> => {
    const stream: boolean = ENV_VARIABLES.STREAMING;
    if (question !== null) {
        let docContent = "";
        if (docPath.trim() !== "") {
            docContent = await getDocumentContent(docPath);
        }
        const url = `${ENV_VARIABLES.OPEN_ROUTER_API_URL}/chat/completions`;
        const headers = {
            Authorization: `Bearer ${ENV_VARIABLES.OPEN_ROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
            'HTTP-Referer': 'http://localhost', // optional but recommended
            'X-Title': 'my-test-app' // optional but recommended
        };

        const body = {
            model: ENV_VARIABLES.OPEN_ROUTER_MODEL,
            stream,
            messages: [] as { role: string; content: string }[]
        };

        if (docPath.trim() !== "") {
            body.messages.push({
                role: 'system',
                content: await getDocumentContent(path.join(
                    __dirname,
                    '../prompts/read_project_file.txt'
                ))
            });

            body.messages.push({
                role: 'user',
                content: `Here is the document:\n"""${docContent}"""\n\n`
            });
        }

        body.messages.push({
            role: 'user',
            content: `${question}\n\n`,
        });

        return MakePostCall({
            url,
            body,
            headers,
            responseType: stream ? "stream" : "json"
        });
    }
    return "No question provided.";
}