import path from "path";
import fs from "fs";
const pdf = require('pdf-parse');

export const ReadPDFDocument = async (filePath: string): Promise<string> => {
    if (fs.existsSync(filePath)) {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        return data.text;
    }
    throw new Error(`File not found: ${filePath}`);
}

const ReadTextDocument = async (filePath: string): Promise<string> => {
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
    }
    throw new Error(`File not found: ${filePath}`);
}


export const getDocumentContent = async (filePath: string): Promise<string> => {
    const fileExtension = path.extname(filePath).toLowerCase();
    let content = '';
    switch (fileExtension) {
        case '.pdf':
            content = await ReadPDFDocument(filePath);
            break;
        case '.txt':
            content = await ReadTextDocument(filePath);
            break;
        default:
            throw new Error(`Unsupported file type: ${fileExtension}`);
    }

    return content;
}