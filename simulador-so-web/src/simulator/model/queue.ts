import { CPU } from './cpu';
import { Process } from './process';

export class Queue<T> {
    items: T[];
}

export class AffinityQueue {
    items: { process: Process; lastCPU?: CPU; time?: number }[];
}
