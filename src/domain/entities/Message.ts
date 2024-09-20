export class Message {

    private data: object;

    constructor(data: object) {

        this.data = data;
    }

    public getData(): object {
        return this.data;
    }
}