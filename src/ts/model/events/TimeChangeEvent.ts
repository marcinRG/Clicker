import {ChangeEvent} from './ChangeEvent';

export class TimeChangeEvent extends ChangeEvent<number> {
    constructor() {
        super('TimeChangeEvent', 1);
    }
}
