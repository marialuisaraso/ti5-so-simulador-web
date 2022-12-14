import { Process } from './process';

export class Memory {
    size: number;
    usage: { process: Process; cost: number }[] = [];
    fetchTime: number = 0;

    constructor(size?: number) {
        this.size = size ?? 64;
    }

    getUsageRate(): number {
        return (this.getTotalUsage() * 100) / this.size;
    }

    getTotalUsage(): number {
        return this.usage.map(e => Number(e.cost)).reduce((a, b) => a + b, 0);
    }

    remove(pId: number) {
        this.usage = this.usage.filter(p => p.process.pId !== pId);
    }

    checkToAdd(memSize: number, returns?: boolean): boolean;
    checkToAdd(process: Process, returns?: boolean): boolean;
    checkToAdd(p: any, returns?: boolean) {
        let memSize = p.memorySize || p;
        if (this.getTotalUsage() + memSize > this.size) {
            if (returns) return false;
            else throw 'Overflow de memória';
        }
        return true;
    }

    add(process: Process) {
        if (this.getTotalUsage() + process.memorySize > this.size) throw 'Overflow de memória';
        this.usage.push({ process: process, cost: process.memorySize });
    }
}
