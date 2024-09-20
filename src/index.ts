import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import { WebhookController } from './interfaces/controllers/WebhookController.js';
import { BotFlowRepository } from './infrastructure/repositories/BotFlowRepository.js';

const botFlowRepository = new BotFlowRepository('./config/flow-config.json');
const webhookController = new WebhookController(botFlowRepository);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.get('/webhook', (req, res) => webhookController.validateWebhook(req, res));
app.post('/webhook', (req, res) => webhookController.handleIncomingMessage(req, res));