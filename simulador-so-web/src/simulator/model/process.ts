import { processActions } from './shared/processActions';
import { processState } from './shared/processState';

export class Process {
    static nextId: number = 1;

    pId: number;
    executionSize: number | null = null; // null significa infinito
    memorySize: number = 4;
    cpuTime: number = 0;
    priority: number = 0;
    state: processState = processState.New;
    IOPeriod: number | null = null; // send to IO every n times
    lastIO: number = 0;

    constructor(
        executionSize?: number | null,
        memorySize?: number,
        priority?: number,
        IOPeriod?: number | null
    ) {
        this.pId = Process.nextId;
        Process.nextId++;

        this.executionSize = executionSize ?? null;
        this.memorySize = memorySize ?? 4;
        this.priority = priority ?? 0;
        this.IOPeriod = IOPeriod ?? null;

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

    determineNextState(action?: processActions): processState {
        // https://www.javatpoint.com/os-process-states

        if (action === processActions.Terminate) {
            this.state = processState.Terminate;
            return this.state;
        }

        switch (this.state) {
            case processState.New:
                this.state = processState.Ready;
                break;
            case processState.Ready:
                switch (action) {
                    case processActions.Run:
                        this.state = processState.Run;
                        break;
                    case processActions.Suspend:
                        this.state = processState.ReadySuspended;
                        break;
                }
                break;
            case processState.Run:
                if (this.isComplete()) {
                    this.state = processState.Completed;
                } else if (this.sendToIO()) {
                    this.state = processState.Wait;
                } else if (action === processActions.Suspend) {
                    this.state = processState.ReadySuspended;
                    return this.state;
                } else {
                    this.state = processState.Ready;
                }
                break;
            case processState.Wait:
                switch (action) {
                    case processActions.WaitProcessed:
                        this.state = processState.Ready;
                        break;
                    case processActions.Suspend:
                        this.state = processState.WaitSuspended;
                        break;
                }
                break;
            case processState.ReadySuspended:
                switch (action) {
                    case processActions.Wake:
                        this.lastIO = this.cpuTime;
                        this.state = processState.Ready;
                        break;
                }
                break;
            case processState.WaitSuspended:
                switch (action) {
                    case processActions.Wake:
                        this.lastIO = this.cpuTime;
                        this.state = processState.Wait;
                        break;
                    case processActions.WaitProcessed:
                        this.state = processState.ReadySuspended;
                        break;
                }
                break;
        }

        return this.state;
    }

    private sendToIO(): boolean {
        if (this.IOPeriod === null) return false;
        if (this.cpuTime - this.lastIO >= this.IOPeriod) return true;
        else return false;
    }

    private isComplete(): boolean {
        return this.cpuTime >= (this.executionSize ?? Infinity);
    }
}
