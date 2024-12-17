import { IWhatsAppRepository } from "../../domain/repositories/IWhatsAppRepository.js";

export class WhatsAppSendMessageUseCase {

    private whatsAppRepository: IWhatsAppRepository;

    constructor(messageRepository: IWhatsAppRepository) {
        this.whatsAppRepository = messageRepository;
    }

    async execute(data: object) : Promise<void> {

        await this.whatsAppRepository.sendMessage(data);
    }
}