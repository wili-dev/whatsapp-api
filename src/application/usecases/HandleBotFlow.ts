import { User } from "../../domain/entities/User.js";
import { Flow } from "../../domain/entities/Flow.js";
import { IUsersRepository } from "../../domain/repositories/IUsersRepository.js";

export class HandleBotFlowUseCase {

    private flowMap: Map<string, Flow>;
    private usersRepository: IUsersRepository;

    constructor(flowMap: Map<string, Flow>, usersRepository: IUsersRepository) {

        this.flowMap = flowMap;
        this.usersRepository = usersRepository;
    }

    async execute(user: User, message: any) {
        
        let flow;

        if (flow = user.getStateFlow()) {

            const flow = this.flowMap.get('INITIAL_FLOW');
            console.log(flow)
        }
    }
}