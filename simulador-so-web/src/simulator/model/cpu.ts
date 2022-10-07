import { Memory } from './memory';
import { Process } from './process';
import { Queue } from './shared/queue';
import { IORequest } from './shared/IORequest';
import { processActions } from './shared/processActions';
import { processState } from './shared/processState';

export class CPU {
    static nextId: number = 0;

    cpuId: number;
    readyQueue: Queue<Process>;
    suspendedQueue: Array<Process>;
    allProcess: Array<Process>;
    runningJob: Process | null = null;
    ioQueue: Queue<IORequest>;
    memory: Memory;
    roundRobinQuantum: number = 1000;
    active: boolean = false;
    hook: Function = () => {};
    // TODO
    // Actually implement these
    cache?: Memory;
    contextChangeTime: number = 10;
    clockSpeed: number = 100;

    // TODO update initial values
    constructor({
        readyQueue,
        hook,
        suspendedQueue,
        allProcess,
        ioQueue,
    }: {
        readyQueue?: Queue<Process>;
        hook?: Function;
        suspendedQueue?: Array<Process>;
        allProcess?: Array<Process>;
        ioQueue?: Queue<IORequest>;
    }) {
        this.cpuId = CPU.nextId;
        CPU.nextId++;

        this.hook = hook ? hook : () => {};
        this.readyQueue = readyQueue ?? new Queue<Process>();
        this.suspendedQueue = suspendedQueue ?? new Array<Process>();
        this.allProcess = allProcess ?? new Array<Process>();
        this.ioQueue = ioQueue ?? new Queue<IORequest>();
        this.memory = new Memory();
    }

    stop() {
        this.active = false;
        this.hook();
    }

    start() {
        this.active = true;
        this.run();
    }

    private async run() {
        while (this.active) {
            const job = this.readyQueue.getFirst();
            if (!job) {
                this.hook();
                return;
            } else {
                switch (job.state) {
                    case processState.Ready:
                        await this.executeJob(job);
                        break;
                    case processState.ReadySuspended:
                        this.suspendedQueue.push(job);
                        break;
                    case processState.Wait:
                    case processState.WaitSuspended:
                        this.sendToIO(job);
                        break;
                    case processState.Completed:
                    case processState.Terminate:
                        this.memory.remove(job.pId);
                        break;
                    default:
                        break;
                }
                this.hook();
            }
        }
    }

    async executeJob(job: Process): Promise<void> {
        this.runningJob = job;
        const execTime = job.determineExecTime(this.roundRobinQuantum);
        job.determineNextState(processActions.Run);
        this.hook();
        await new Promise<void>(resolve =>
            setTimeout(() => {
                job.cpuTime += execTime;
                if (job.cpuTime !== job.executionSize) this.readyQueue.push(job, job.priority);
                this.runningJob = null;
                job.determineNextState();
                resolve();
            }, execTime)
        );
    }

    public addProcess({
        executionSize,
        memorySize,
        priority,
        ioPeriod,
    }: {
        executionSize?: number | null;
        memorySize?: number;
        priority?: number;
        ioPeriod?: number;
    }) {
        const newProcess = new Process(executionSize, memorySize, priority, ioPeriod);
        this.memory.add(newProcess);
        this.readyQueue.push(newProcess, newProcess.priority);
        this.allProcess.push(newProcess);

        // reinicia o método run que foi parado
        if (this.readyQueue.isEmpty() && !this.runningJob && this.active) this.start();

        this.hook();
    }

    public suspendProcess(pId: number): void {
        const process = this.allProcess.find(e => e.pId === pId);
        if (process) process.determineNextState(processActions.Suspend);
        this.hook();
    }

    public wakeProcess(pId: number): void {
        let processidx = this.suspendedQueue.findIndex(e => e.pId === pId);
        if (processidx === -1) return;

        let process = this.suspendedQueue.splice(processidx, 1)[0];
        if (process) process.determineNextState(processActions.Wake);

        this.readyQueue.push(process, process.priority);
        this.hook();
    }

    public excludeProcess(pId: number): void {
        const process = this.allProcess.find(e => e.pId === pId);
        if (process) {
            process.determineNextState(processActions.Terminate);
            this.memory.remove(process.pId);
        }
        this.hook();
    }

    private sendToIO(process: Process) {
        let ioRequest = new IORequest(process, this.readyQueue);

        this.ioQueue.push(ioRequest, process.priority);
    }

    public setRoundRobin(newValue: number) {
        this.roundRobinQuantum = newValue;
        this.hook();
    }
}
