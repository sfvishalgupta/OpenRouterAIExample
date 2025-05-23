import readline from 'readline';
import { askQuestion } from "./services/openRouterService";

const question: string = process.argv[2] ?? null;

/**
 * This function is used to stream the response from OpenRouter API.
 */

askQuestion("", question).then(response => {
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