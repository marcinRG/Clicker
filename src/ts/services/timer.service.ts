import {ISubscribe} from '../model/interfaces/ISubscribe';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {TimeEvent} from '../model/events/TimeEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';

export class Timer implements ISubscribe<TimeEvent> {
    private timeGenerator: Observable<TimeEvent>;

    constructor() {
        const timeGenerator = Observable.interval(1000);
        this.timeGenerator = timeGenerator.map((value) => {
            return new TimeEvent(value);
        });
    }

    public getObservable(): Observable<TimeEvent> {
        return this.timeGenerator;
    }

    public subscribe(observer: Observer<TimeEvent>) {
        this.timeGenerator.subscribe(observer);
    }
}

export const timerService: Timer = new Timer();
