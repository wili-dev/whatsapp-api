import { FlowConfig, Flow } from '../entities/Flow.js';

export interface IFlowConfigRepository {

    loadConfig(): FlowConfig;
    createMapConfig(config: FlowConfig): Map<string, Flow>;
    findFlowById(id: string): Flow | undefined;
}