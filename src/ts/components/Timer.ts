import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import {TimeEvent} from '../model/events/TimeEvent';
import {Observer} from 'rxjs/Observer';
import {ISubscribe} from '../model/interfaces/ISubscribe';

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
