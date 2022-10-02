import { Memory } from './memory';
import { Process, EXCLUDE, IO, RUN, SUSPEND } from './process';
import { Queue } from './queue';

export class CPU {
    readyQueue: Queue<Process>;
    suspendedQueue: Array<Process>;
    allProcess: Array<Process>;
    runningJob: Process | null = null;
    ioJob: Process | null = null;
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
    constructor(
        readyQueue?: Queue<Process>,
        hook?: Function,
        suspendedQueue?: Array<Process>,
        allProcess?: Array<Process>
    ) {
        this.hook = hook ? hook : () => {};
        this.readyQueue = readyQueue ?? new Queue<Process>();
        this.suspendedQueue = suspendedQueue ?? new Array<Process>();
        this.allProcess = allProcess ?? new Array<Process>();
        this.memory = new Memory();
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

    async stop() {
        this.active = false;
        this.hook();
    }

    async start(): Promise<void> {
        this.active = true;
        while (this.active) {
            const job = this.readyQueue.getFirst();
            if (job === null) {
                this.stop();
                return;
            } else if (job?.boundTo === RUN) {
                this.runningJob = job;
                await this.executeJob(job);
            } else if (job?.boundTo === SUSPEND) this.suspendedQueue.push(job);
            else if (job?.boundTo === EXCLUDE) job.executionSize = 0;
            else if (job?.boundTo === IO) this.ioJob = job;
            this.hook();
        }
    }

    public addProcess(executionSize?: number | null, memorySize?: number, priority?: number) {
        const newProcess = new Process(executionSize, memorySize, priority);
        this.readyQueue.push(newProcess, newProcess.priority);
        this.allProcess.push(newProcess);
        this.hook();
    }

    public suspendProcess(pId: number): void {
        const process = this.allProcess.find(e => e.pId === pId);
        if (process) process.boundTo = SUSPEND;
    }

    public wakeProcess(pId: number): void {
        const process = this.suspendedQueue.find(e => e.pId === pId);
        if (process) process.boundTo = RUN;
        else if (this.ioJob?.pId === pId) {
            this.ioJob.boundTo = RUN;
            this.readyQueue.push(this.ioJob, this.ioJob.priority);
            this.ioJob = null;
        }
    }

    public excludeProcess(pId: number): void {
        const process = this.allProcess.find(e => e.pId === pId);
        if (process) process.boundTo = EXCLUDE;
    }
}
