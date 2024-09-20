export interface IHttpClient {

    post(url: string, data: any, headers?: any): Promise<any>;
    get(url: string, headers?: any): Promise<any>;
}