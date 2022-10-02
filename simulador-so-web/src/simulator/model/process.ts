import { processState } from './shared/processState';

export class Process {
    static nextId: number = 1;

    pId: number;
    executionSize: number | null = null; // null significa infinito
    memorySize: number = 4;
    cpuTime: number = 0;
    priority: number = 0;
    state: processState = processState.New;

    constructor(
        executionSize?: number | null,
        memorySize?: number,
        priority?: number,
        boundTo?: number
    ) {
        this.pId = Process.nextId;
        Process.nextId++;

        this.executionSize = executionSize ?? null;
        this.memorySize = memorySize ?? 4;
        this.priority = priority ?? 0;

        this.determineNextState();
    }

    toString(): string {
        return `Process_${this.pId}(${this.executionSize}, ${this.memorySize}, ${this.cpuTime}, ${this.priority}) - ${this.state}`;
    }

    determineExecTime(timeAvailable: number): number {
        if (this.executionSize === null || this.executionSize > this.cpuTime + timeAvailable)
            return timeAvailable;
        else return this.executionSize - this.cpuTime;
    }

    determineNextState(action?: string) {
        // https://www.javatpoint.com/os-process-states

        if (action === 'terminate') {
            this.state = processState.Terminate;
            return this.state;
        }

        if (this.state === processState.New) {
            this.state = processState.Ready;
        } else if (this.state === processState.Ready) {
            if (action === 'run') {
                this.state = processState.Run;
            } else if (action === 'suspend') {
                this.state = processState.ReadySuspended;
            }
        } else if (this.state === processState.Run) {
            if (this.cpuTime >= (this.executionSize ?? Infinity)) {
                this.state = processState.Completed;
            }
            if (false) {
                // TODO determine when process will go to IO
                this.state = processState.Wait;
            } else {
                this.state = processState.Ready;
            }
        } else if (this.state === processState.Wait) {
            if (action === 'ioComplete') {
                this.state = processState.Ready;
            } else if (action === 'suspend') {
                this.state = processState.WaitSuspended;
            }
        } else if (this.state === processState.ReadySuspended) {
            if (action === 'wake') {
                this.state = processState.Ready;
            }
        } else if (this.state === processState.WaitSuspended) {
            if (action === 'wake') {
                this.state = processState.Wait;
            } else if (action === 'ioComplete') {
                this.state = processState.ReadySuspended;
            }
        }

        return this.state;
    }
}
