import {TimerEventTypes} from '../enums/TimerEventTypes';

export class TimeEvent {
    constructor(public eventType: TimerEventTypes, public value: number) {
    }
}
