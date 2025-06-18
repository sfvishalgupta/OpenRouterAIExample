import axios from 'axios';
import { ENV_VARIABLES } from '../environment';
import { logger } from '../pino';

async function analyzeText(text: string): Promise<any> {
    const response = await axios.post(ENV_VARIABLES.PRESIDIO_ANALYZE_URL, {
        text,
        language: 'en',
    });
    return response.data;
}

async function anonymizeText(text: string, analyzerResults: any) {
    const anonymizers: { [key: string]: { type: string; new_value: string } } = {};
    for (const item of analyzerResults) {
        anonymizers[item.entity_type] = {
            type: 'replace',
            new_value: ' ',
        };
    }

    const response = await axios.post(
        ENV_VARIABLES.PRESIDIO_ANONYMIZE_URL, {
        text,
        analyzer_results: analyzerResults,
        anonymizers
    });
    return response.data;
}


export async function RemovePIIData(text: string): Promise<string> {
    logger.info("Removing PII Data from text received.......");
    if (ENV_VARIABLES.PRESIDIO_ANALYZE_URL.trim() == "" || ENV_VARIABLES.PRESIDIO_ANONYMIZE_URL.trim() == "") {
        logger.info("Presidio Service Not Found.");
        return text;
    }

    const analyzerResults = await analyzeText(text);
    if (analyzerResults) {
        const anonymizedText = await anonymizeText(text, analyzerResults);
        text = anonymizedText.text;
    }
    return text;
}