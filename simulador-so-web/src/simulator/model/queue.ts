export class Queue<T> {
    items: T[];

    constructor() {
        this.items = new Array<T>();
    }

    toString(): string {
        return this.items.toString();
    }

    push(item: T): void {
        this.items.push(item);
    }
}
