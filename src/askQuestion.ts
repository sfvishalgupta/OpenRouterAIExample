import path from "path";
import { getDocumentContent } from "./utils";
import { askQuestion } from "./services/AIService";
const question: string = process.argv[2] ?? null;

/**
 * This function is used to stream the response from OpenRouter API.
 */

const run = async (question: string) => {
    if (question.indexOf("prompts/") > -1) {
        question = await getDocumentContent(path.join(__dirname, './', question));
    }
    askQuestion("", question).then(response => {
        console.log(response);
    });
}

run(question);