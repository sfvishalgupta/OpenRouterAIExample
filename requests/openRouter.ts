import path from 'path';
import { BaseRequest, ModelRequest } from '../types';
import { ENV_VARIABLES } from '../environment';
import { getDocumentContent } from "../utils";

export class OpenRouterRequest implements BaseRequest {
    constructor(private readonly document: string, private readonly question: string) { }
    parseResponse = (response: any): string => {
        return response.data.choices[0].message.content ?? '';
    }

    async getMessages(): Promise<any[]> {
        const messages: any[] = [];
        if (this.document.trim() !== "") {
            messages.push({
                role: 'system',
                content: await getDocumentContent(path.join(
                    __dirname,
                    '../prompts/read_project_file.txt'
                ))
            });
            messages.push({
                role: 'user',
                content: `Here is the document:\n"""${this.document}"""\n\n`
            });
        }

        messages.push({
            role: 'user',
            content: `${this.question}\n\n`,
        });

        return messages;
    }

    async getRequest(): Promise<ModelRequest> {
        return {
            url: `${ENV_VARIABLES.OPEN_ROUTER_API_URL}/chat/completions`,
            headers: {
                Authorization: `Bearer ${ENV_VARIABLES.OPEN_ROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream',
                'HTTP-Referer': 'http://localhost', // optional but recommended
                'X-Title': 'my-test-app' // optional but recommended
            },
            body: {
                model: ENV_VARIABLES.OPEN_ROUTER_MODEL,
                stream: ENV_VARIABLES.STREAMING,
                messages: await this.getMessages(),
            },
            responseType: ENV_VARIABLES.STREAMING ? "stream" : "json",
        };
    }
}