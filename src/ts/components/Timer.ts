import {TimeChangeEvent} from '../model/events/TimeChangeEvent';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

export class Timer {
    private timeGenerator: Observable<TimeChangeEvent>;

    constructor() {
        const timeGenerator = Observable.interval(1000);
        this.timeGenerator = timeGenerator.map((value) => {
            return new TimeChangeEvent(value);
        });
    }

    public getObservable(): Observable<TimeChangeEvent> {
        return this.timeGenerator;
    }

    public subscribe(observer: Observer<TimeChangeEvent>) {
        this.timeGenerator.subscribe(observer);
    }
}
