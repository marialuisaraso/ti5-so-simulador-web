import { Queue } from './model/shared/queue';
import { CPU } from './model/cpu';
import { Process } from './model/process';
import { IO } from './model/io';

export var cpu: CPU;
export var io: IO;
export function main(hook?: Function) {
    let q = new Queue<Process>();

    cpu = new CPU({ readyQueue: q, hook });
    io = new IO({ queue: cpu.ioQueue, hook });
    io.start();
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
