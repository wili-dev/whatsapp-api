import { Request, Response } from 'express';

export class ValidateWebhookController {

    async execute(req: Request, res: Response): Promise<Response> {

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
}