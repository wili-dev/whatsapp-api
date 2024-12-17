import fs from 'fs';
import { IFlowFile, IFlowFileConfig } from "../../domain/entities/FlowFile.js";
import { IFlowFileRepository, IFlowFileVar } from "../../domain/repositories/IFlowFileRepository.js";

export class FlowFileRepository implements IFlowFileRepository {

    private flowFile: IFlowFileConfig;
    private flowMap: Map<string, IFlowFile>;
    private flowData: IFlowFileVar = {};

    constructor(filePath: string) {

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        this.flowFile = JSON.parse(fileContent) as IFlowFileConfig;

        const flowMap = new Map<string, IFlowFile>();
        this.flowFile.flows.forEach(flow => flowMap.set(flow.id, flow));
        this.flowMap = flowMap;
    }

    public getMap(): Map<string, IFlowFile> {
        return this.flowMap;
    }

    public getDefaultFlow(): IFlowFile | undefined {
        return this.flowMap.get(this.flowFile.defaultFlowId);
    }

    public getFlowById(id: string): IFlowFile | undefined {
        return this.flowMap.get(id);
    }

    public setFlowVar(key: string, value: any) {
        this.flowData[key] = value;
    }

    public fillFlowVar(data: any): any {
        const isObject = (item: any): item is Record<string, any> => {
            return typeof item === 'object' && item !== null && !Array.isArray(item);
        };
    
        const recursiveReplace = (item: any): any => {
            if (typeof item === 'string') {
                // Aqui você pode implementar a lógica para substituir strings
                return item.replace(/\$\{(\w+)\}/g, (_, key) => this.flowData?.[key] ?? `\${${key}}`);
            } else if (Array.isArray(item)) {
                return item.map(recursiveReplace);
            } else if (isObject(item)) {
                return Object.fromEntries(
                    Object.entries(item).map(([k, v]) => [k, recursiveReplace(v)])
                );
            }
            return item;
        };
    
        return recursiveReplace(data);
    }
    

    // public fillFlowVar(data: object) {
    //     return text.replace(/{{(.*?)}}/g, (_, key) => {
    //         return this.flowContext[key.trim()] || `{{${key}}}`;
    //     });
    // }
}