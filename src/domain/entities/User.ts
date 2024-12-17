export class User {

    private state: string | undefined;

    constructor(state?: string) {
        this.state = state ?? undefined;
    }

    setState(state: string) {
        this.state = state;
    }

    getState() {
        return this.state;
    }
}