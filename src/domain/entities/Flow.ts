export interface Flow {

    id: string;
    delay: number;
    action: {
        type: string;
        content: string;
    };
    next_flow?: {
        id: string;
        delay: number;
    };
}

export interface FlowConfig {

    flows: Flow[];
}
