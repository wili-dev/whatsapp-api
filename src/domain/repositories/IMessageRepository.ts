import { Message } from "../entities/Message.js";

export interface IMessageRepository {

    sendMessage(message: Message): Promise<void>;
}