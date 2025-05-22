# 🧠 OpenRouter AI Examples (TypeScript)

This repository showcases how to use [OpenRouter](https://openrouter.ai) for interacting with LLMs in a Node.js (TypeScript) environment using streaming, prompt templates, and document-based Q&A.

---

## 📦 Features

- 🤖 Call OpenRouter AI models with streaming support.
- 📄 Ask questions from a PDF document.
- 🛠️ Fully typed with TypeScript.
- 📂 Document-based LLM retrieval with `npx` CLI support.

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/sfvishalgupta/OpenRouterAIExample.git
cd OpenRouterAIExample
```

### 2.  Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a .env file in the src folder:
```bash
OPEN_ROUTER_API_KEY=your_openrouter_api_key
```

## Example 1: Ask a Question from a PDF

Place your pdf inside src/documents folder

Run the below Command

```bash
npx ts-node src/askQuestionFromPDF.ts "documents/saas.pdf" "tell me a joke"
```

🧠 Tech Stack
	•	Node.js
	•	TypeScript
	•	OpenRouter
	•	PDF-parse for reading PDFs

📬 License
MIT — feel free to use and adapt!