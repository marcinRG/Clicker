import {ChangeEvent} from './ChangeEvent';

export class TimeChangeEvent extends ChangeEvent<number> {
    constructor(value: number = 1) {
        super('TimeChangeEvent', value);
    }
}
