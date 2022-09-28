import { Queue } from './model/queue';
import { CPU } from './model/cpu';
import { Process } from './model/process';

export var cpu: CPU;
export function main(hook?: Function) {
    let q = new Queue<Process>();

    cpu = new CPU(q, hook);
    console.log(q);
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
