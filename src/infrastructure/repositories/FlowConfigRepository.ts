import fs from 'fs';
import { IFlowConfigRepository } from '../../domain/repositories/IFlowConfigRepository.js';
import { Flow, FlowConfig } from '../../domain/entities/Flow.js';

// export class FlowConfigRepository implements IFlowConfigRepository {
    
//     private filePath: string;

//     constructor(filePath: string) {
//         this.filePath = filePath;
//     }

//     public loadConfig(): FlowConfig {

//         const fileContent = fs.readFileSync(this.filePath, 'utf-8');
//         return JSON.parse(fileContent) as FlowConfig;
//     }

//     public createMapConfig(config: FlowConfig): Map<string, Flow> {

//         const flowMap = new Map<string, Flow>();
//         config.flows.forEach(flow => flowMap.set(flow.id, flow));
//         return flowMap;
//     }

//     public findFlowById(id: string): Map<string, Flow> {

//     }
// }

export class FlowConfigRepository implements IFlowConfigRepository {
    
    private filePath: string;
    private flowMap: Map<string, Flow>;

    constructor(filePath: string) {

        this.filePath = filePath;
        const config = this.loadConfig();
        this.flowMap = this.createMapConfig(config);
    }

    public loadConfig(): FlowConfig {

        const fileContent = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(fileContent) as FlowConfig;
    }

    public createMapConfig(config: FlowConfig): Map<string, Flow> {

        const flowMap = new Map<string, Flow>();
        config.flows.forEach(flow => flowMap.set(flow.id, flow));
        return flowMap;
    }

    public findFlowById(id: string): Flow | undefined {
        return this.flowMap.get(id);
    }
}
