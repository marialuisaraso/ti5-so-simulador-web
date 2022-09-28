import { Memory } from './memory';
import { Process } from './process';
import { Queue } from './queue';

export class CPU {
    readyQueue: Queue<Process>;
    runningJob: Process | null = null;
    memory: Memory;
    cache?: Memory;
    roundRobinQuantum: number = 1000;
    contextChangeTime: number = 10;
    clockSpeed: number = 100;
    active: boolean = false;
    hook: Function = () => {};

    // TODO update initial values
    constructor(readyQueue?: Queue<Process>, hook?: Function) {
        this.hook = hook ? hook : () => {};
        this.readyQueue = readyQueue ?? new Queue<Process>();
        this.memory = new Memory();
    }

    async executeJob(): Promise<void> {
        this.runningJob = this.readyQueue.getFirst();
        if (this.runningJob === null) {
            this.stop();
            return;
        }
        const job: Process = this.runningJob;
        const execTime = job.determineExecTime(this.roundRobinQuantum);
        await new Promise<void>(resolve =>
            setTimeout(() => {
                job.ucpTime += execTime;
                if (job.ucpTime !== job.executionSize) this.readyQueue.push(job, job.priority);
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
        this.hook();
        while (this.active) {
            await this.executeJob();
            this.hook();
            console.log(this.readyQueue.toString());
        }
    }

    public addProcess(executionSize?: number | null, memorySize?: number, priority?: number) {
        this.readyQueue.push(
            new Process(
                (executionSize = executionSize),
                (memorySize = memorySize),
                (priority = priority)
            )
        );
        this.hook();
    }
}
