import { Cluster } from './model/cluster';

export var clusters: Array<Cluster>;

export function main(hook?: Function) {
    clusters = new Array<Cluster>();
    clusters.push(new Cluster({ hook }));
    clusters[0].addCpu();

    clusters.push(new Cluster({ hook }));
    clusters[1].addCpu();
    clusters[1].addCpu();

    if (hook) hook();
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
