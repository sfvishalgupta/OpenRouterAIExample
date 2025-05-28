import { Calculator } from '@langchain/community/tools/calculator';
import { createOpenAIFunctionsAgent, AgentExecutor } from 'langchain/agents';
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { chatOpenAIModel } from './models/index';
import { JiraSearchTool, WordCountTool, debugTool } from './tools/index';

async function run() {
    const tools = [JiraSearchTool, WordCountTool, debugTool];

    const prompt = ChatPromptTemplate.fromMessages([
        ["system", "You are a helpful AI assistant."],
        ["human", "{input}"],
        ["human", "Just result the final output with no explanation."],
        new MessagesPlaceholder("agent_scratchpad")
    ]);

    const agent = await createOpenAIFunctionsAgent({
        llm: chatOpenAIModel,
        tools,
        prompt
    });

    const executor = new AgentExecutor({
        agent,
        tools,
        verbose: true, // Enable verbose logging
    });

    const questionCalculator: string = "What is 512 divided by 8, plus 33?";
    const questionJira: string = "Use the jira-issue-search to : list down all the issues in the project 'BMSAAS' which is on 'QA'";
    const questionWordCount: string = "How many words are in the sentence: The quick brown fox jumps over the lazy dog?";
    const questionDebug: string = "use debug-tool for this input: Hello World!";
    
    const result = await executor.invoke({
        input:  "do you know debug-tool? " +
            "Please use the debug-tool to process this input: 'Hello World!' using a sync function call"
    });

    console.log('✅ Final Answer:', result.output);
}

run();
// JiraSearchTool.func("project = BMSAAS AND status = 'QA' ORDER BY created DESC")
//     .then(result => {
//         console.log('Jira Search Result:', result);
//     }
// );