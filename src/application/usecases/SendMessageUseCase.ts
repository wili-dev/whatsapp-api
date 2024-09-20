import { Message } from "../../domain/entities/Message.js";
import { IMessageRepository } from "../../domain/repositories/IMessageRepository.js";

export class SendMessageUseCase {

    private messageRepository: IMessageRepository;

    constructor(messageRepository: IMessageRepository) {
        this.messageRepository = messageRepository;
    }

    async execute(data: object) : Promise<void> {

        const message = new Message(data);
        await this.messageRepository.sendMessage(message);
    }
}