import { Process } from './process';

export class Memory {
    size: number;
    usage: { process: Process; cost: number }[] = [];
    fetchTime: number = 0;

    constructor(size?: number){
        this.size = size ?? 64; 
    }

    getUsageRate(): number {
        return this.usage.map(e => e.cost).reduce((a, b) => a+b, 0) / this.size * 100;
    }
}
