import path from "path";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { ReadPDFDocument } from "./utils";
import { GetStore } from "./store/utils";
import { logger } from "./pino";

const pdfPath = process.argv[2];
const index_name = process.argv[3];

if (!pdfPath || !index_name) {
    console.error("Usage: npx ts-node src/syncDataToVectorDB.ts <pdfPath> <index_name>");
    process.exit(1);
}

const getDocument = async (text: string): Promise<Document[]> => {
    logger.info("🧠 Embedding document...");
    const splitter: RecursiveCharacterTextSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
    });
    return await splitter.createDocuments([text]);
}

const run = async () => {
    logger.info("Syncing data to Vector DB...");
    logger.info("📄 Reading PDF...");
    const text: string = await ReadPDFDocument(
        path.join(__dirname, pdfPath)
    );

    const docs: Document[] = await getDocument(text);
    logger.info("📄 Storing PDF...");
    await GetStore().storeData(
        docs, 
        index_name
    );
};

run();