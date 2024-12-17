import { IFlowFile, IFlowFileConfig } from "../entities/FlowFile.js";

export interface IFlowFileVar {
    [key: string]: any;
}

export interface IFlowFileRepository {

    getMap(): Map<string, IFlowFile>;
    getDefaultFlow(): IFlowFile | undefined;
    getFlowById(id: string): IFlowFile | undefined;
    setFlowVar(key: string, value: any): void;
    fillFlowVar(data: object): any;
}