import path from 'path';
import { BaseRequest, ModelRequest } from '../types';
import { ENV_VARIABLES } from '../environment';
import { getDocumentContent } from "../utils";

export class GeminiRequest implements BaseRequest {
    constructor(private readonly document: string, private readonly question: string) { }
    parseResponse = (response: any): string => {
        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    }

    getMessages = async (): Promise<any[]> => {
        const messages: any[] = [];
        if (this.document.trim() !== "") {
            messages.push({
                role: 'user',
                parts: [{
                    text: await getDocumentContent(path.join(
                        __dirname,
                        '../prompts/read_project_file.txt'
                    ))
                }]
            });
            messages.push({
                role: 'user',
                parts: [{
                    text: `Here is the document:\n"""${this.document}"""\n\n`
                }]
            });
        }
        messages.push({
            role: 'user',
            parts: [{ text: `${this.question}\n\n` }]
        });
        return messages
    }

    async getRequest(): Promise<ModelRequest> {
        return {
            url: `${ENV_VARIABLES.GEMINI_API_URL}?key=${ENV_VARIABLES.GEMINI_API_KEY}`,
            headers: {
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost', // optional but recommended
                'X-Title': 'my-test-app' // optional but recommended
            },
            body: { contents: await this.getMessages() },
            responseType: ENV_VARIABLES.STREAMING ? "stream" : "json",
        };
    }
}