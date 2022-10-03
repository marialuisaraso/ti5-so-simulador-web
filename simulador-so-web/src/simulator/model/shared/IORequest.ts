import { Process } from '../process';
import { Queue } from '../queue';

export class IORequest {
    process: Process;
    originalQueue: Queue<Process>;

    constructor(process: Process, originalQueue: Queue<Process>) {
        this.process = process;
        this.originalQueue = originalQueue;
    }
}
