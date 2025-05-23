import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";
import { EmbeddingsInterface } from "@langchain/core/embeddings";
import { FakeEmbeddings } from "langchain/embeddings/fake";
import { QdrantClient } from "@qdrant/js-client-rest";
import { BaseVector } from "./baseVector";
import { ENV_VARIABLES } from "../environment";
import { logger } from "../pino";

export class QdrantVector implements BaseVector {

    getEmbeddings(): EmbeddingsInterface {
        return new FakeEmbeddings({});
    }

    getClient(): QdrantClient {
        return new QdrantClient({
            url: ENV_VARIABLES.VECTOR_STORE_URL
        });
    }

    async getStoreFromDocument(collectionName: string): Promise<QdrantVectorStore> {
        return await QdrantVectorStore.fromExistingCollection(
            this.getEmbeddings(),
            {
                client: this.getClient(),
                collectionName,
            }
        );


    }

    // 2. Setup LangChain vector store with Qdrant
    // const vectorStoreTxt = await qdrantVecor.getStoreFromTexts(
    //         [
    //         "Hello world",
    //         "LangChain rocks",
    //         "Qdrant is fast!"
    //     ],
    //     [
    //         { tag: "greeting" },
    //         { tag: "ai" },
    //         { tag: "vector" }
    //     ],
    //     "tenant_123"
    // );
    async getStoreFromTexts(texts: string[], metadatas: any, collectionName: string): Promise<QdrantVectorStore> {
        return await QdrantVectorStore.fromTexts(
            texts,
            metadatas,
            this.getEmbeddings(),
            {
                client: this.getClient(),
                collectionName,
            }
        );
    }

    async storeData(docs: any, collectionName: string): Promise<any> {
        logger.info("Storing data in Qdrant... on index "+ collectionName);
        return await QdrantVectorStore.fromDocuments(
            docs,
            this.getEmbeddings(),
            {
                client: this.getClient(),
                collectionName,
            }
        );
    }
}