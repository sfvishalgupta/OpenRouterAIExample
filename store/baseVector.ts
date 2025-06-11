export interface BaseVector {
    addDocument(collectionName: string, text: string): Promise<any>;
    generate(index_name:string, query: string): Promise<any>;
}