export interface BaseVector {
    getEmbeddings(): any;
    getClient(): any;
    storeData(docs: any, collectionName: string): Promise<BaseVector>;
    getStoreFromDocument(collectionName?: string): Promise<any>;
    getStoreFromTexts(texts: string[], metadatas: any, collectionName: string): Promise<any>;
}