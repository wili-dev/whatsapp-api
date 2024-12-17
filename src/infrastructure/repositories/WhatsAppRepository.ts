import { IHttpClient } from "../../domain/services/IHttpClient.js";
import { IWhatsAppRepository } from "../../domain/repositories/IWhatsAppRepository.js";

export class WhatsAppRepository implements IWhatsAppRepository {

    private httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        this.httpClient = httpClient;
    }

    async sendMessage(data: object): Promise<void> {

        const url = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_ID}/messages`;
        const headers = { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` };

       const result = await this.httpClient.post(url, data, headers);
    }
}