import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import { ValidateWebhookController } from './interfaces/controllers/ValidateWebhookController.js';
import { IncomingMessageController } from './interfaces/controllers/IncomingMessageController.js';
import { FlowFileRepository } from './infrastructure/repositories/FlowFileRepository.js';
import { HandleBotFlowUseCase } from './application/usecases/HandleBotFlowUseCase.js';
import { FetchHttpClient } from './infrastructure/http/FetchHttpClient.js';
import { WhatsAppRepository } from './infrastructure/repositories/WhatsAppRepository.js';
import { UserRepository } from './infrastructure/repositories/UserRepository.js';

const flowFileRepository = new FlowFileRepository('./src/configs/flow-config.json');
const userRepository = new UserRepository();
const whatsAppRepository = new WhatsAppRepository(new FetchHttpClient());
const handleBotFlowUseCase = new HandleBotFlowUseCase(flowFileRepository, whatsAppRepository, userRepository);

const incomingMessageController = new IncomingMessageController(flowFileRepository, userRepository, handleBotFlowUseCase);
const validateWebhookController = new ValidateWebhookController();

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.get('/webhook', (req, res) => validateWebhookController.execute(req, res));
app.post('/webhook', (req, res) => incomingMessageController.execute(req, res));