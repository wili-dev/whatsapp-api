import fs from 'fs';
import { IBotFlowRepository } from '../../domain/repositories/IBotFlowRepository.js';
import { Flow, FlowConfig } from '../../domain/entities/Flow.js';

export class BotFlowRepository implements IBotFlowRepository {
    
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
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
}
