import path from "path";
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from '@langchain/core/output_parsers';
import { chatOpenAIModel } from './models/chatOpenAIModel';

import { ENV_VARIABLES } from "./environment";
import { GetStore } from "./store/utils";
import { getDocumentContent } from "./utils";

const index_name = process.argv[2] ?? null;
let question = process.argv[3] ?? null;

if (!index_name || !question) {
    console.error("Usage: npx ts-node src/askQuestionFromVector.ts <index_name> <question>");
    process.exit(1);
}

const run = async () => {
    if (question.indexOf("prompts/") > -1) {
        question = await getDocumentContent(path.join(
            __dirname, question
        ));
    }
    const vectorStore = await GetStore().getStoreFromDocument(index_name);

    // 3. Run similarity search
    const retriever = vectorStore.asRetriever();
    const relevantDocs = await retriever.getRelevantDocuments(question);
    const context: string = relevantDocs.map((doc: any) => doc.pageContent).join("\n");
    const prompt = PromptTemplate.fromTemplate(
        question + "\n\n" +
        "Your answer should be strictly based on the content given in <context></context>. if you don't find answer within the given context simply say answer not found."
    );

    const chain = RunnableSequence.from([
        {
            context: () => {
                console.log('<context>' + context + '</context>')
                return '<context>' + context + '</context>';
            },
            question: () => {
                return question;
            }
        },
        prompt,  // takes { topic } → prompt string
        chatOpenAIModel,   // takes prompt → response
        new StringOutputParser()
    ]);

    if (ENV_VARIABLES.STREAMING) {
        const stream = await chain.stream({});
        for await (const chunk of stream) {
            process.stdout.write(chunk.toString());
        }
    } else {
        const response = await chain.invoke({});
        console.log("🧠 LLM Output:", response);
    }
};

run();