import { Memory } from './memory';
import { Process } from './process';
import { Queue } from './queue';

export class CPU {
    readyQueue: Queue<Process>;
    runningJob: Process | null;
    memory: Memory;
    cache?: Memory;
    roundRobinQuantum: number = 5;
    clockSpeed: number = 100; // in milliseconds
}
