import {ChangeEvent} from './ChangeEvent';

export class MoneyChangeEvent extends ChangeEvent<number> {
    constructor(value: number) {
        super('MoneyChangeEvent', value);
    }
}
