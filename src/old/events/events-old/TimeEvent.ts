const timeEventName: string = 'timeEvent';

export class TimeEvent {
    constructor(public value: number, public eventType: string = timeEventName) {
    }
}
