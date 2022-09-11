import { Queue } from './model/queue';
import { CPU } from './model/cpu';
import { Process } from './model/process';

export function main() {
    let q = new Queue<Process>();
    q.push(new Process(10));
    q.push(new Process(20));
    q.push(new Process(10, 4, 1), 1);
    // console.log(`main start`);
    let cpu = new CPU(q);
    console.log(q);
    cpu.start();
    // for (let i = 0; i < 3; i++)
    // cpu.executeJob().then(e => console.log(`aqui`));
    // console.log(`main end`);
}

if (typeof require !== 'undefined' && require.main === module) {
    main();
}
