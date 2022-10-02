import { Queue } from './model/queue';
import { CPU } from './model/cpu';
import { Process } from './model/process';

export var cpu: CPU;
export var io: CPU;
export function main(hook?: Function) {
    let q = new Queue<Process>();

    cpu = new CPU({ readyQueue: q, hook });
    if (hook) hook();
    // io = new CPU({readyQueue:cpu.ioQueue, hook})
}

export function start() {
    cpu.start();
}

export function stop() {
    cpu.stop();
}

if (typeof require !== 'undefined' && require.main === module) {
    main();
}
