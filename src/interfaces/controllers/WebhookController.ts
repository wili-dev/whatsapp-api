import { Request, Response } from 'express';

import { Flow } from '../../domain/entities/Flow.js';
import { User } from '../../domain/entities/User.js';
import { IFlowConfigRepository } from '../../domain/repositories/IFlowConfigRepository.js';
import { IUsersRepository } from '../../domain/repositories/IUsersRepository.js';
import { HandleBotFlowUseCase } from '../../application/usecases/HandleBotFlow.js';

export class WebhookController {

    private usersRepository: IUsersRepository;
    private flowConfigRepository: IFlowConfigRepository;
    private flowMap: Map<string, Flow>;

    constructor(flowConfigRepository: IFlowConfigRepository, usersRepository: IUsersRepository) {

        this.usersRepository = usersRepository;

        this.flowConfigRepository = flowConfigRepository;

        const config = this.flowConfigRepository.loadConfig();
        this.flowMap = this.flowConfigRepository.createMapConfig(config);
    }

    async validateWebhook(req: Request, res: Response): Promise<Response> {

        const token = process.env.WHATSAPP_TOKEN;
        const mode = req.query['hub.mode'];
        const challenge = req.query['hub.challenge'];
        const verifyToken = req.query['hub.verify_token'];

        if (mode === 'subscribe' && verifyToken === token) {
            console.log('Webhook verificado!');
            return res.status(200).send(challenge);
        } else {
            return res.status(403).send('Falha na verificação');
        }
    }

    async handleIncomingMessage(req: Request, res: Response): Promise<Response> {

        let user;

        const reqBody = req.body;
        const msgBody = {

            from: reqBody.entry[0].changes[0].value.contacts[0].wa_id,
            name: reqBody.entry[0].changes[0].value.contacts[0].profile.name,
            message: reqBody.entry[0].changes[0].value.messages[0],
        }

        if ((user = await this.usersRepository.getUser(msgBody.from)) == undefined) {
            user = new User(msgBody.from, msgBody.name);
        }

        new HandleBotFlowUseCase(this.flowMap, this.usersRepository).execute(user, msgBody.message);

        return res.sendStatus(200);
    }
}