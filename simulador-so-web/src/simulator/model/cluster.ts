import { Memory } from './memory';
import { Process } from './process';
import { Queue } from './shared/queue';
import { IORequest } from './shared/IORequest';
import { CPU } from './cpu';
import { processActions } from './shared/processActions';
import { IO } from './io';

export class Cluster {
    static nextId: number = 0;

    clusterId: number;
    cpus: Array<CPU>;
    io: IO;
    readyQueue: Queue<Process>;
    suspendedQueue: Array<Process>;
    allProcess: Array<Process>;
    ioQueue: Queue<IORequest>;
    memory: Memory;
    hook: Function = () => {};

    constructor({
        hook,
        ioQueue,
        memory,
    }: {
        hook?: Function;
        ioQueue?: Queue<IORequest>;
        memory?: Memory | number;
    }) {
        this.clusterId = Cluster.nextId;
        Cluster.nextId++;

        this.hook = hook ? hook : () => {};
        this.cpus = new Array<CPU>();
        this.readyQueue = new Queue<Process>();
        this.suspendedQueue = new Array<Process>();
        this.allProcess = new Array<Process>();
        this.ioQueue = ioQueue ?? new Queue<IORequest>();
        this.memory = memory instanceof Memory ? memory : new Memory(memory);

        this.io = new IO({ queue: this.ioQueue, hook: this.hook });
    }

    addCpu() {
        this.cpus.push(
            new CPU({
                readyQueue: this.readyQueue,
                suspendedQueue: this.suspendedQueue,
                ioQueue: this.ioQueue,
                hook: this.hook,
                memory: this.memory,
                allProcess: this.allProcess,
            })
        );

        this.hook();
    }

    async removeCPU(id: number) {
        let cpu = this.cpus.find(c => c.cpuId === id);

        if (cpu) {
            cpu.stop();
            // espera cpu parar de executar para removê-la
            while (cpu.runningJob) {
                await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
            }
            this.cpus.filter(c => c.cpuId !== id);
            this.hook();
        }
    }

    startAll() {
        this.cpus.forEach(cpu => cpu.start());
    }

    stopAll() {
        this.cpus.forEach(cpu => cpu.stop());
    }

    public addProcess({
        executionSize,
        memorySize,
        priority,
        ioPeriod,
    }: {
        executionSize?: number | null;
        memorySize?: number;
        priority?: number;
        ioPeriod?: number;
    }) {
        const newProcess = new Process(executionSize, memorySize, priority, ioPeriod);
        this.memory.checkToAdd(newProcess);
        this.readyQueue.push(newProcess, newProcess.priority);
        this.allProcess.push(newProcess);
        this.memory.add(newProcess);

        this.hook();
    }

    public suspendProcess(pId: number): void {
        const process = this.allProcess.find(e => e.pId === pId);
        if (process) process.determineNextState(processActions.Suspend);
        this.hook();
    }

    public wakeProcess(pId: number): void {
        let processidx = this.suspendedQueue.findIndex(e => e.pId === pId);
        if (processidx === -1) return;

        let process = this.suspendedQueue.splice(processidx, 1)[0];
        if (process) process.determineNextState(processActions.Wake);

        this.readyQueue.push(process, process.priority);
        this.hook();
    }

    public excludeProcess(pId: number): void {
        const process = this.allProcess.find(e => e.pId === pId);
        if (process) {
            process.determineNextState(processActions.Terminate);
            this.memory.remove(process.pId);
        }
        this.hook();
    }
}
