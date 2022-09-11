export class Queue<T> {
    length: number = 10;
    items: Array<Array<T>>;

    constructor(lenght?: number) {
        this.length = lenght ?? this.length;
        this.items = Array.from(Array(this.length), () => new Array<T>());
    }

    toString(): string {
        return `[${this.items.map(e => `[${e.toString()}]`).toString()}]`;
    }

    push(item: T, priority: number = 0): void {
        this.items[priority].push(item);
    }

    getElementAt(index: number, priority: number = 0): T {
        return this.items[priority][index];
    }

    getFirst(): T | null {
        const filledLevel = this.items.find(e => e.length > 0);
        if (filledLevel === undefined) return null;
        else return filledLevel.shift() as T;
    }
}
