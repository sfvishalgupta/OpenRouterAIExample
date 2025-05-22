import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface PostRequest {
    url: string;
    headers: any;
    body: any;
    responseType: string
}


export const MakePostCall = ({ url, headers, body, responseType }: PostRequest): Promise<AxiosResponse> => {
    try {
        const config: AxiosRequestConfig = { 
            responseType: responseType as AxiosRequestConfig['responseType'], 
            headers 
        };
        return axios.post(url, body, config);
    } catch (error) {
        throw error;
    }
}