export class Process {
    static nextId: number = 1;

    pId: number;
    executionSize: number | null = null; // null significa infinito
    memorySize: number = 4;
    cpuTime: number = 0;
    priority: number = 0;

    constructor(executionSize?: number | null, memorySize?: number, priority?: number) {
        this.pId = Process.nextId;
        Process.nextId++;

        this.executionSize = executionSize ?? null;
        this.memorySize = memorySize ?? 4;
        this.priority = priority ?? 0;
    }

    toString(): string {
        return `Process_${this.pId}(${this.executionSize}, ${this.memorySize}, ${this.cpuTime}, ${this.priority})`;
    }

    determineExecTime(timeAvailable: number): number {
        if (this.executionSize === null || this.executionSize > this.cpuTime + timeAvailable)
            return timeAvailable;
        else return this.executionSize - this.cpuTime;
    }
}
