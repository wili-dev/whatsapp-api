export class User {

    private id: string;
    private name: string;
    private stateFlow: string;

    constructor(id: string, name: string) {

        this.id = id;
        this.name = name;
        this.stateFlow = '';
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setStateFlow(state: string) {
        this.stateFlow = state;
    }

    public getStateFlow(): string {
        return this.stateFlow;
    }
}