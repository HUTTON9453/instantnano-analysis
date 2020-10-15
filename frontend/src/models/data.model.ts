import { Group } from "./data.group.model";

export class Data {
    ka: number;
    kd: number;
    KD: number;
    group: Group;

    constructor(){
        this.group = new Group()
    }
}