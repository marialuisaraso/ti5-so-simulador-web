export class Process {
    static nextId: number = 1;

    pId: number;
    executionSize: number | null = null; // null significa infinito
    memorySize: number = 4;
    ucpTime: number = 0;
    priority: number = 0;

    constructor(executionSize?: number, memorySize?: number, priority?: number) {
        this.pId = Process.nextId;
        Process.nextId++;

        this.executionSize = executionSize ?? null;
        this.memorySize = memorySize ?? 4;
        this.priority = priority ?? 0;
    }

    toString(): string {
        return `Process_${this.pId}(${this.executionSize}, ${this.memorySize}, ${this.ucpTime}, ${this.priority})`;
    }

    determineExecTime(timeAvailable: number): number {
        if (this.executionSize === null || this.executionSize > this.ucpTime + timeAvailable)
            return timeAvailable;
        else return this.executionSize - this.ucpTime;
    }
}
