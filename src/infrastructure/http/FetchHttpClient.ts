import fetch from "node-fetch";
import { IHttpClient } from "../../domain/services/IHttpClient.js";

export class FetchHttpClient implements IHttpClient {

    async post(url: string, data: any, headers?: any): Promise<any> {
        
        const response = await fetch(url, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            body: JSON.stringify(data)
        })
        return response.json();
    }

    async get(url: string, headers?: any): Promise<any> {
        
        const response = await fetch(url, { method: 'GET', headers});
        return response.json();
    }
}