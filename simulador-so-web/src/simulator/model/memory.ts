import { Process } from './process';

export class Memory {
    size: number;
    usage: { process: Process; cost: number }[] = [];
    fetchTime: number = 0;

    constructor(size?: number) {
        this.size = size ?? 64;
    }

    getUsageRate(): number {
        return (this.usage.map(e => Number(e.cost)).reduce((a, b) => a + b, 0) * 100) / this.size;
    }

    remove(pId: number) {
        this.usage = this.usage.filter(p => p.process.pId !== pId);
    }
}
