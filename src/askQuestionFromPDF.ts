import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { askQuestion } from "./services/openRouterService";
import { getDocumentContent } from "./utils";

const docPath: string = path.join(__dirname, process.argv[2]);
let question: string = process.argv[3] ?? null;

if (!docPath || !question) {
    console.error("Usage: npx ts-node src/askQuestionFromPDF.ts <pdfPath> <question>");
    process.exit(1);
}

/**
 * This function is used to stream the response from OpenRouter API.
 */

const run = async () => {
    if (question.indexOf("prompts/") > -1) {
        question = await getDocumentContent(path.join(
            __dirname, question
        ));
    }

    askQuestion(docPath, question).then(response => {
        const rl = readline.createInterface({
            input: response.data,
            crlfDelay: Infinity,
        });
        fs.writeFileSync(
            path.join(__dirname, '/output/output.md'),
            "",
            { flag: 'w' } // Append mode
        );
        rl.on('line', (line: string) => {
            if (line.startsWith('data: ')) {
                const payload = line.replace(/^data: /, '');
                if (payload === '[DONE]') {
                    rl.close();
                    process.exit();
                }

                try {
                    const data = JSON.parse(payload);
                    const content = data.choices?.[0]?.delta?.content;
                    if (content) {
                        process.stdout.write(content);
                        fs.writeFileSync(
                            path.join(__dirname, '/output/output.md'),
                            content,
                            { flag: 'a' } // Append mode
                        );
                    };
                } catch (err) {
                    console.error('❌ JSON Parse Error:', err);
                }
            }
        });
    });
}
run();