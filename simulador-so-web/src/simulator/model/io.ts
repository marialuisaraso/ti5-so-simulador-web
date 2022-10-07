import { Queue } from './shared/queue';
import { IORequest } from './shared/IORequest';
import { processActions } from './shared/processActions';

export class IO {
    queue: Queue<IORequest>;
    activeRequest: IORequest | null = null;
    IOTime: number;
    hook: Function = () => {};
    active: boolean = false;

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

    async run() {
        while (this.active) {
            const request = this.queue.getFirst();
            if (!request) {
                this.hook();
                return;
            } else {
                await this.processRequest(request);
            }

            this.hook();
        }
    }

    async processRequest(request: IORequest): Promise<void> {
        this.activeRequest = request;
        this.hook();

        await new Promise<void>(resolve =>
            setTimeout(() => {
                request.originalQueue.push(request.process);
                this.activeRequest = null;
                request.process.determineNextState(processActions.WaitProcessed);

                resolve();
            }, this.IOTime)
        );
    }
}
