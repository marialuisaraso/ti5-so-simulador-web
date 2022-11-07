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

export function addCluster(hook: Function) {
    clusters.push(new Cluster({ hook }));
}

export function addProcess({
    executionSize,
    memorySize,
    priority,
    ioPeriod,
}: {
    executionSize?: number | null;
    memorySize?: number;
    priority?: number;
    ioPeriod?: number;
}) {
    clusters[clusters.map(c => c.readyQueue.items.filter((pq, idx) => idx <= (priority??0)).flatMap(pq => c.memory.checkToAdd(memorySize ?? 4, true) ? pq.length : Number.MAX_SAFE_INTEGER).reduce((tot, l) => tot + l, 0)).reduce((minIdx, v, idx, a) => v < a[minIdx] ? idx : minIdx, 0)].addProcess({executionSize, memorySize, priority, ioPeriod});
}

export function removeCluster(clusterId: number) {
    let i = clusters.findIndex(c => c.clusterId === clusterId);
    let hook: Function = clusters[i].hook;
    clusters.splice(i, 1);
    hook();
}

if (typeof require !== 'undefined' && require.main === module) {
    main(() => console.log(clusters));
}
