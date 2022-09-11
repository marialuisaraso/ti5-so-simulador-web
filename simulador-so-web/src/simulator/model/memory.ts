import { Process } from './process';

export class Memory {
    size: number;
    usage: { process: Process; cost: number }[] = [];
    fetchTime: number = 0;

    // TODO update initial values
    constructor(){
        this.size = 2; 
    }
}
