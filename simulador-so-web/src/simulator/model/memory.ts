import { Process } from './process';

export class Memory {
    size: number;
    usage: { process: Process; cost: number }[] = [];
}
