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
    active: boolean = true;

    // TODO update initial values
    constructor(readyQueue?: Queue<Process>) {
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
    }

    async start(): Promise<void> {
        this.active = true;
        while (this.active) {
            await this.executeJob();
            console.log(this.readyQueue.toString());
        }
    }
}
