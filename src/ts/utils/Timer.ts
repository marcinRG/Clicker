import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import {TimeEvent} from '../model/events/TimeEvent';
import {TimerEventTypes} from '../model/enums/TimerEventTypes';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';

export class Timer {
    private timeGenerator: Observable<TimeEvent>;

    constructor() {
        const timeGenerator = Observable.interval(1000);
        this.timeGenerator = timeGenerator.map((value) => {
            return new TimeEvent(TimerEventTypes.NormalTimerEvent, value);
        });
    }

    public subscribe(observer) {
        this.timeGenerator.subscribe(observer);
    }
}
