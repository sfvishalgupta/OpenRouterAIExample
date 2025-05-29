export interface JiraIssue {
    key: string;
    fields: {
        summary: string,
        description: string
    }
}

export interface OpenRouterResponse {
    choices: OpenRouterChoice[];
}
export interface OpenRouterChoice {
    message: OpenRouterMessage;
}
export interface OpenRouterMessage {
    content: string;
}