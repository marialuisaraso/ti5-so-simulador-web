import { Queue } from './model/queue';

export function main() {
    // let cpu = new CPU();
    let queue = new Queue<Queue<number>>();
    queue.push(new Queue<number>());
    // queue.push(2);
    // queue.push(3);
    console.log(queue);
}

if (typeof require !== 'undefined' && require.main === module) {
    main();
}
