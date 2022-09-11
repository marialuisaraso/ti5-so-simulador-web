import { Memory } from './memory';
import { Process } from './process';
import { Queue } from './queue';

export class CPU {
    readyQueue: Queue<Queue<Process>>;
    runningJob: Process | null = null;
    memory: Memory;
    cache?: Memory;
    roundRobinQuantum: number = 1000;
    contextChangeTime: number = 10;
    clockSpeed: number = 100;
    
    // TODO update initial values
    constructor() {
        this.readyQueue = new Queue<Queue<Process>>();
        this.memory = new Memory();
    }
}
