import path from 'path';
import readline from 'readline';
import { askQuestion } from "./services/openRouterService";

const docPath: string = path.join(__dirname, process.argv[2]);
const question: string = process.argv[3] ?? null;

if (!docPath || !question) {
  console.error("Usage: npx ts-node src/askQuestionFromPDF.ts <pdfPath> <question>");
  process.exit(1);
}

/**
 * This function is used to stream the response from OpenRouter API.
 */

askQuestion(docPath, question).then(response => {
    const rl = readline.createInterface({
        input: response.data,
        crlfDelay: Infinity,
    });
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
                if (content) process.stdout.write(content);
            } catch (err) {
                console.error('❌ JSON Parse Error:', err);
            }
        }
    });
})