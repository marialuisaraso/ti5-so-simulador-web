import { Queue } from './shared/queue';
import { IORequest } from './shared/IORequest';
import { processActions } from './shared/processActions';

export class IO {
    queue: Queue<IORequest>;
    activeRequest: IORequest | null = null;
    IOTime: number;
    hook: Function = () => {};
    active: boolean = false;
    runningPercentage: number = 0;

    constructor({
        queue,
        hook,
        IOTime,
    }: {
        queue: Queue<IORequest>;
        hook?: Function;
        IOTime?: number;
    }) {
        this.queue = queue;
        this.hook = hook ? hook : () => {};
        this.IOTime = IOTime ?? 10000;
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
        while (this.active) {
            const request = this.queue.getFirst();
            if (!request) {
                this.hook();
                await new Promise<void>(resolve => setTimeout(() => resolve(), this.IOTime));
            } else {
                await this.processRequest(request);
            }
        }
    }

    async processRequest(request: IORequest): Promise<void> {
        const runDivide = 10;
        this.activeRequest = request;
        this.hook();

        await new Promise<void>(async resolve => {
            this.runningPercentage = 0;

            for (let i = 1; i < runDivide; i++) {
                await new Promise<void>(resolve =>
                    setTimeout(() => {
                        this.runningPercentage += 100 / runDivide;
                        this.hook();

                        resolve();
                    }, this.IOTime / runDivide)
                );
            }

            setTimeout(() => {
                this.runningPercentage += 100 / runDivide;
                this.hook();

                request.originalQueue.push(request.process);
                this.activeRequest = null;
                request.process.determineNextState(processActions.WaitProcessed);

                this.hook();

                resolve();
            }, this.IOTime / runDivide);
        });
    }
}
