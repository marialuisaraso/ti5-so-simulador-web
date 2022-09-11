export class Process {
    executionSize: number | null = null; // null significa infinito
    memorySize: number = 4;
    ucpTime: number = 0;
    priority: number = 0;

    constructor(executionSize?: number, memorySize?: number, priority?: number) {
        this.executionSize = executionSize ?? null;
        this.memorySize = memorySize ?? 4;
        this.priority = priority ?? 0;
    }

    toString(): string {
        return `Process(${this.executionSize}, ${this.memorySize}, ${this.ucpTime}, ${this.priority})`;
    }
}
