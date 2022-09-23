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
        await new Promise<void>(resolve =>
            setTimeout(() => {
                (this.runningJob as Process).ucpTime += this.roundRobinQuantum;
                this.readyQueue.push(this.runningJob as Process, this.runningJob?.priority);
                this.runningJob = null;
                resolve();
            }, 1000)
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
