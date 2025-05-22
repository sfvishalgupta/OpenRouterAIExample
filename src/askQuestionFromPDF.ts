import path from 'path';
import readline from 'readline';
import { askQuestion } from "./services/openRouterService";

const docPath: string = path.join(__dirname, process.argv[2]);
const question: string = process.argv[3] ?? null;
/*
askQuestion(docPath, question, false).then(response => {
    console.log("Response from OpenRouter:", response?.data?.choices[0].message.content);
})
*/

/**
 * This function is used to stream the response from OpenRouter API.
 */

askQuestion(docPath, question, true).then(response => {
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


// const streamOpenRouter = async () => {
//   try {
//     const response = await axios.post(
//       ENV_VARIABLES.OPEN_ROUTER_API_URL as string,
//       {
//         model: ENV_VARIABLES.OPEN_ROUTER_MODEL,
//         messages: [{ role: 'user', content: 'Tell me a joke' }],
//         stream: true,
//       },
//       {
//         responseType: 'stream',
//         headers: {
//           'Authorization': `Bearer ${ENV_VARIABLES.OPEN_ROUTER_API_KEY}`,
//           'Content-Type': 'application/json',
//           'Accept': 'text/event-stream',
//           'HTTP-Referer': 'http://localhost',
//           'X-Title': 'Streaming Test App',
//         },
//       }
//     );

//     const rl = readline.createInterface({
//       input: response.data,
//       crlfDelay: Infinity,
//     });

//     rl.on('line', (line: string) => {
//       if (line.startsWith('data: ')) {
//         const payload = line.replace(/^data: /, '');
//         if (payload === '[DONE]') {
//           console.log('\n✅ Stream complete.');
//           rl.close();
//           return;
//         }

//         try {
//           const data = JSON.parse(payload);
//           const content = data.choices?.[0]?.delta?.content;
//           if (content) process.stdout.write(content);
//         } catch (err) {
//           console.error('❌ JSON Parse Error:', err);
//         }
//       }
//     });
//   } catch (err) {
//     console.error('❌ Axios Stream Error:', err);
//   }
// };

// streamOpenRouter();


