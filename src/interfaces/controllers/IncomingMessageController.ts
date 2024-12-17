import { Request, Response } from 'express';
import { IFlowFileRepository } from '../../domain/repositories/IFlowFileRepository.js';
import { WhatsAppSendMessageUseCase } from '../../application/usecases/WhatsAppSendMessageUseCase.js';
import { WhatsAppRepository } from '../../infrastructure/repositories/WhatsAppRepository.js';
import { FetchHttpClient } from '../../infrastructure/http/FetchHttpClient.js';
import { HandleBotFlowUseCase } from '../../application/usecases/HandleBotFlowUseCase.js';
import { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import { User } from '../../domain/entities/User.js';

export class IncomingMessageController {

    private flowFileRepository: IFlowFileRepository;
    private userRepository: IUserRepository;
    private handleBotFlowUseCase: HandleBotFlowUseCase;

    constructor(flowFileRepository: IFlowFileRepository, userRepository: IUserRepository, handleBotFlowUseCase: HandleBotFlowUseCase) {

        this.flowFileRepository = flowFileRepository;
        this.userRepository = userRepository;
        this.handleBotFlowUseCase = handleBotFlowUseCase;
    }

    async execute(req: Request, res: Response): Promise<Response> {

        const messages = req.body.entry[0].changes[0].value.messages;

        if (messages) {

            const msgBody = {

                from: req.body.entry[0].changes[0].value.contacts[0].wa_id,
                name: req.body.entry[0].changes[0].value.contacts[0].profile.name,
                message: req.body.entry[0].changes[0].value.messages[0]
            }

            let user;
            if ((user = this.userRepository.getUser(msgBody.from)) == undefined)  {

                user = new User();
                this.userRepository.addUser(msgBody.from, user)
            }

            this.handleBotFlowUseCase.execute(msgBody, user);
        }

        return res.sendStatus(200);
    }
}