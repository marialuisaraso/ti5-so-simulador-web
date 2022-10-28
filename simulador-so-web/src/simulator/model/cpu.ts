import { Memory } from './memory';
import { Process } from './process';
import { Queue } from './shared/queue';
import { IORequest } from './shared/IORequest';
import { processActions } from './shared/processActions';
import { processState } from './shared/processState';

export class CPU {
    static nextId: number = 0;

    cpuId: number;
    readyQueue: Queue<Process>;
    suspendedQueue: Array<Process>;
    allProcess: Array<Process>;
    runningJob: Process | null = null;
    ioQueue: Queue<IORequest>;
    memory: Memory;
    roundRobinQuantum: number = 1000;
    active: boolean = false;
    running: boolean = false;
    hook: Function = () => {};
    runningPercentage: number = 0;
    // TODO
    // Actually implement these
    cache?: Memory;
    contextChangeTime: number = 10;
    clockSpeed: number = 100;

    // TODO update initial values
    constructor({
        readyQueue,
        hook,
        suspendedQueue,
        allProcess,
        memory,
        ioQueue,
    }: {
        readyQueue?: Queue<Process>;
        hook?: Function;
        suspendedQueue?: Array<Process>;
        allProcess?: Array<Process>;
        memory?: Memory;
        ioQueue?: Queue<IORequest>;
    }) {
        this.cpuId = CPU.nextId;
        CPU.nextId++;

        this.hook = hook ? hook : () => {};
        this.readyQueue = readyQueue ?? new Queue<Process>();
        this.suspendedQueue = suspendedQueue ?? new Array<Process>();
        this.allProcess = allProcess ?? new Array<Process>();
        this.ioQueue = ioQueue ?? new Queue<IORequest>();
        this.memory = memory ?? new Memory();
    }

    stop() {
        this.active = false;
        this.hook();
    }

    start() {
        this.active = true;
        this.run();
    }

    private async run() {
        // não roda se já existir uma instância rodando
        if (this.running) return;

        this.running = true;
        while (this.active) {
            const job = this.readyQueue.getFirst();
            if (!job) {
                this.hook();
                await new Promise<void>(resolve =>
                    setTimeout(() => resolve(), this.roundRobinQuantum)
                );
            } else {
                switch (job.state) {
                    case processState.Ready:
                        await this.executeJob(job);
                        break;
                    case processState.ReadySuspended:
                        this.suspendedQueue.push(job);
                        break;
                    case processState.Wait:
                    case processState.WaitSuspended:
                        this.sendToIO(job);
                        break;
                    case processState.Completed:
                    case processState.Terminate:
                        this.memory.remove(job.pId);
                        break;
                    default:
                        break;
                }
                this.hook();
            }
        }
        this.running = false;
    }

    async executeJob(job: Process): Promise<void> {
        const runDivide = 10;
        this.runningJob = job;
        const execTime = job.determineExecTime(this.roundRobinQuantum);
        job.determineNextState(processActions.Run);
        this.hook();

        await new Promise<void>(async resolve => {
            this.runningPercentage = 0;

            for (let i = 1; i < runDivide; i++) {
                await new Promise<void>(resolve =>
                    setTimeout(() => {
                        this.runningPercentage += 100 / runDivide;
                        this.hook();

                        resolve();
                    }, execTime / runDivide)
                );
            }

            setTimeout(() => {
                job.cpuTime += execTime;
                if (job.cpuTime !== job.executionSize) this.readyQueue.push(job, job.priority);
                this.runningJob = null;
                this.runningPercentage = 0;
                job.determineNextState();
                this.hook();

                resolve();
            }, execTime / runDivide);
        });
    }

    private sendToIO(process: Process) {
        let ioRequest = new IORequest(process, this.readyQueue);

        this.ioQueue.push(ioRequest, process.priority);
    }

    public setRoundRobin(newValue: number) {
        this.roundRobinQuantum = newValue;
        this.hook();
    }
}
