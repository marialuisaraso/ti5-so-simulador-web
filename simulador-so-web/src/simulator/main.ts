import { Queue } from './model/queue';
import { CPU } from './model/cpu';
import { Process } from './model/process';

export var cpu: CPU;
export function main(hook?: Function) {
    let q = new Queue<Process>();
    q.push(new Process(10000));
    q.push(new Process(20000));
    q.push(new Process(1000, 4, 1), 1);
    // console.log(`main start`);
    cpu = new CPU(q, hook);
    console.log(q);
    // for (let i = 0; i < 3; i++)
    // cpu.executeJob().then(e => console.log(`aqui`));
    // console.log(`main end`);
}

export function start() {
    console.log('start cpu');
    cpu.start();
    // for (let i = 0; i < 3; i++)
    // cpu.executeJob().then(e => console.log(`aqui`));
    // console.log(`main end`);
}

export function stop() {
    console.log('aaaaaa');
    cpu.stop();
    // for (let i = 0; i < 3; i++)
    // cpu.executeJob().then(e => console.log(`aqui`));
    // console.log(`main end`);
}

if (typeof require !== 'undefined' && require.main === module) {
    main();
}
