import { CONNREFUSED } from "dns";
import { User } from "../../domain/entities/User.js";
import { IFlowFileRepository } from "../../domain/repositories/IFlowFileRepository.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { IWhatsAppRepository } from "../../domain/repositories/IWhatsAppRepository.js";
import { delay } from "../../utils/utils.js";

export class HandleBotFlowUseCase {

    private flowFileRepository: IFlowFileRepository;
    private whatsAppRepository: IWhatsAppRepository;
    private userRepository: IUserRepository;

    constructor(flowFileRepository: IFlowFileRepository, whatsAppRepository: IWhatsAppRepository, userRepository: IUserRepository) {

        this.flowFileRepository = flowFileRepository;
        this.whatsAppRepository = whatsAppRepository;
        this.userRepository = userRepository;
    }

    async execute(message: Record<string, any>, user: User) {

        let msg: Record<string, any> | undefined = message;
        let flow = user.getState() ? this.flowFileRepository.getFlowById(user.getState()!) : this.flowFileRepository.getDefaultFlow();

        do {

            if (msg?.message.type == 'interactive') {

                if (flow?.flow_var) {
                    this.flowFileRepository.setFlowVar(flow.flow_var, msg?.message.interactive.button_reply.id);
                }
            }
            else if (msg?.message.type == 'text' && flow?.type == 'interactive') {

                if (flow?.flow_var) {
                    this.flowFileRepository.setFlowVar(flow.flow_var, msg?.message.text.body);
                }
            }

            if (flow?.delay) {
                await delay(flow?.delay)
            }

            let request = this.flowFileRepository.fillFlowVar(flow!.action.request);
            await this.whatsAppRepository.sendMessage(request);

            if (flow?.reset_flow || flow?.type == 'text' && !flow?.next_flow) {

                user.setState(this.flowFileRepository.getDefaultFlow()!.id);
                flow = undefined
            }
            else {

                if (msg?.message.type == 'interactive') {
                    flow = this.flowFileRepository.getFlowById(flow!.action.interactive_options![msg?.message.interactive.button_reply.id]);
                    user.setState(flow!.id);
                }
                else if (flow?.type == 'text') {
                    flow = this.flowFileRepository.getFlowById(flow?.next_flow!);
                    user.setState(flow!.id);
                }
                else {
                    flow = undefined;
                }
            }

            msg = undefined;
        }
        while (flow);
    }
}