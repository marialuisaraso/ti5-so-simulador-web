import { Queue } from './model/shared/queue';
import { CPU } from './model/cpu';
import { Process } from './model/process';
import { IO } from './model/io';

export var cpus: Array<CPU>;
export var ios: Array<IO>;

export function main(hook?: Function, numberOfCpu?: number) {
    let q = new Queue<Process>();
    cpus = new Array<CPU>();
    ios = new Array<IO>();
    numberOfCpu = numberOfCpu ? numberOfCpu : 1;
    for (let i = 0; i < numberOfCpu; i++) {
        const cpu = new CPU({ readyQueue: q, hook });
        const io = new IO({ queue: cpu.ioQueue, hook });
        cpus.push(cpu);
        ios.push(io);
        io.start();
    }
    if (hook) hook();
    // io = new CPU({readyQueue:cpu.ioQueue, hook})
}

export function start() {
    cpus.forEach(cpu => {
        cpu.start();
    });
}

export function stop() {
    cpus.forEach(cpu => {
        cpu.stop();
    });
}

if (typeof require !== 'undefined' && require.main === module) {
    main();
}
