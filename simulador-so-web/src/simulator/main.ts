import { Queue } from './model/shared/queue';
import { CPU } from './model/cpu';
import { Process } from './model/process';
import { Cluster } from './model/cluster';
import { IO } from './model/io';

export var clusters: Array<Cluster>;

export function main(hook?: Function) {
    clusters = new Array<Cluster>();
    clusters.push(new Cluster({ hook }));
    clusters[0].addCpu();
    clusters[0].addCpu();
    clusters[0].addCpu();

    clusters.push(new Cluster({ hook }));
    clusters[1].addCpu();

    if (hook) hook();
    // io = new CPU({readyQueue:cpu.ioQueue, hook})
}

export function start() {
    clusters.forEach(c => c.startAll());
}

export function stop() {
    clusters.forEach(c => c.stopAll());
}

if (typeof require !== 'undefined' && require.main === module) {
    main(() => console.log(clusters));
}
