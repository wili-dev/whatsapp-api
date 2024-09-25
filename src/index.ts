import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import { WebhookController } from './interfaces/controllers/WebhookController.js';
import { FlowConfigRepository } from './infrastructure/repositories/FlowConfigRepository.js';
import { UsersRepository } from './infrastructure/repositories/UsersRepository.js';

const usersRepository = new UsersRepository();
const flowConfigRepository = new FlowConfigRepository('./config/flow-config.json');
const webhookController = new WebhookController(flowConfigRepository, usersRepository);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.get('/webhook', (req, res) => webhookController.validateWebhook(req, res));
app.post('/webhook', (req, res) => webhookController.handleIncomingMessage(req, res));