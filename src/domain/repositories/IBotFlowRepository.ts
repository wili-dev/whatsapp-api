import { FlowConfig, Flow } from '../entities/Flow.js';

export interface IBotFlowRepository {

    loadConfig(): FlowConfig;
    createMapConfig(config: FlowConfig): Map<string, Flow>;
}
