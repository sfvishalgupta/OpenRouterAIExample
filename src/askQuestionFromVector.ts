
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatOpenAI } from "@langchain/openai";

import { ENV_VARIABLES } from "./environment";
import { GetStore } from "./store/utils";

const index_name = process.argv[2];
const question = process.argv[3];

if (!index_name || !question) {
    console.error("Usage: npx ts-node src/askQuestionFromVector.ts <index_name> <question>");
    process.exit(1);
}

const run = async () => {
    const vectorStore = await GetStore().getStoreFromDocument(index_name);

    // 3. Run similarity search
    const retriever = vectorStore.asRetriever();
    const relevantDocs = await retriever.getRelevantDocuments(question);
    const context: string = relevantDocs.map((doc: any) => doc.pageContent).join("\n");

    const parser = new StringOutputParser();
    const model = new ChatOpenAI({
        openAIApiKey: ENV_VARIABLES.OPEN_ROUTER_API_KEY,
        modelName: ENV_VARIABLES.OPEN_ROUTER_MODEL,
        configuration: {
            baseURL: ENV_VARIABLES.OPEN_ROUTER_API_URL
        }
    });

    const prompt = PromptTemplate.fromTemplate(
        question + "\n\n{context}"
    );
    const chain = RunnableSequence.from([
        {
            context: () => {
                return '<context>' + context + '</context>';
            },
            question: () => question,
        },
        prompt,  // takes { topic } → prompt string
        model,   // takes prompt → response
        parser
    ]);

    if (ENV_VARIABLES.STREAMING) {
        const stream = await chain.stream({
            context: "Your answer should be strictly based on the content given in <context></context>. if you dont find answer within the given context simply say answer not found. "
        });

        for await (const chunk of stream) {
            process.stdout.write(chunk.toString());
        }
    } else {
        const response = await chain.invoke({
            context: "Your answer should be strictly based on the content given in <context></context>. if you dont find answer within the given context simply say answer not found. "
        });
        console.log("🧠 LLM Output:", response);
    }

};

run();