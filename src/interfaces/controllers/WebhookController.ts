import { Request, Response } from 'express';

import { Flow } from '../../domain/entities/Flow.js';
import { IBotFlowRepository } from '../../domain/repositories/IBotFlowRepository.js';

export class WebhookController {

    private botFlowRepository: IBotFlowRepository;
    private flowMap: Map<string, Flow>;

    constructor(botFlowRepository: IBotFlowRepository) {

        this.botFlowRepository = botFlowRepository;

        const config = this.botFlowRepository.loadConfig();
        this.flowMap = this.botFlowRepository.createMapConfig(config);
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

        // Exemplo de como pegar o fluxo inicial
        const flow = this.flowMap.get('FLOW_INITIAL');
        
        if (flow) {
            // Processar a mensagem com o fluxo adequado
        }

        return res.sendStatus(200);
    }
}
