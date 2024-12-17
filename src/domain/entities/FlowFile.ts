export interface IFlowFile {

    id: string;
    type: "text" | "interactive";
    delay?: number;
    action: {
        request: Record<string, any>;
        interactive_options?: Record<string, any>;
    };
    flow_var?: string;
    next_flow?: string;
    reset_flow?: boolean;
}

export interface IFlowFileConfig {

    flows: IFlowFile[];
    defaultFlowId: string
}