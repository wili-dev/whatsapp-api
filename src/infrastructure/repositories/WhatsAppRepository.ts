import { Message } from "../../domain/entities/Message.js";
import { IHttpClient } from "../../domain/services/IHttpClient.js";
import { IMessageRepository } from "../../domain/repositories/IMessageRepository.js";

export class WhatsAppRepository implements IMessageRepository {

    private httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        this.httpClient = httpClient;
    }

    async sendMessage(message: Message): Promise<void> {

        const url = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_ID}/messages`;
        const headers = { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` };

        const result = await this.httpClient.post(url, message.getData(), headers);

        console.log(result)
    }
}