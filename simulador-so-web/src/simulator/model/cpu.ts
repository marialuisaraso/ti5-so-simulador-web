import { Memory } from './memory';
import { Process } from './process';
import { Queue } from './queue';
import { processState } from './shared/processState';

export class CPU {
    readyQueue: Queue<Process>;
    suspendedQueue: Array<Process>;
    allProcess: Array<Process>;
    runningJob: Process | null = null;
    ioQueue: Queue<Process>;
    memory: Memory;
    cache?: Memory;
    roundRobinQuantum: number = 1000;
    active: boolean = false;
    hook: Function = () => {};
    // TODO
    // Actually implement these
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
        ioQueue?: Queue<Process>;
    } = {}) {
        this.hook = hook ? hook : () => {};
        this.readyQueue = readyQueue ?? new Queue<Process>();
        this.suspendedQueue = suspendedQueue ?? new Array<Process>();
        this.allProcess = allProcess ?? new Array<Process>();
        this.ioQueue = ioQueue ?? new Queue<Process>();
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

    async run() {
        while (this.active) {
            const job = this.readyQueue.getFirst();
            if (!job) {
                this.stop();
                return;
            } else if (job.state === processState.Ready) {
                job.determineNextState('run');
                this.runningJob = job;
                this.hook();

                await this.executeJob(job);
                job.determineNextState();
            } else if (job.state === processState.ReadySuspended) this.suspendedQueue.push(job);
            else if (job.state === processState.Terminate) job.executionSize = 0;
            else if (job.state === processState.Wait || job.state === processState.WaitSuspended)
                this.ioQueue.push(job);
            this.hook();
        }
    }

    async executeJob(job: Process): Promise<void> {
        const execTime = job.determineExecTime(this.roundRobinQuantum);
        await new Promise<void>(resolve =>
            setTimeout(() => {
                job.cpuTime += execTime;
                if (job.cpuTime !== job.executionSize) this.readyQueue.push(job, job.priority);
                this.runningJob = null;
                resolve();
            }, execTime)
        );
    }

    public addProcess(executionSize?: number | null, memorySize?: number, priority?: number) {
        const newProcess = new Process(executionSize, memorySize, priority);
        this.readyQueue.push(newProcess, newProcess.priority);
        this.allProcess.push(newProcess);
        this.hook();
    }

    public suspendProcess(pId: number): void {
        const process = this.allProcess.find(e => e.pId === pId);
        if (process) process.determineNextState('suspend');
    }

    public wakeProcess(pId: number): void {
        let process = this.suspendedQueue.find(e => e.pId === pId);
        if (process) process.determineNextState('wake');
        // else {
        //     process = this.ioQueue.find(e => e.pId === pId);
        //     if (!process) return;
        //     process.boundTo = RUN;
        //     this.readyQueue.push(process, process.priority);
        //     // process = null;
        // }
    }

    public excludeProcess(pId: number): void {
        const process = this.allProcess.find(e => e.pId === pId);
        if (process) process.determineNextState('terminate');
    }
}
