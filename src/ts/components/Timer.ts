import {TimeChangeEvent} from '../model/events/TimeChangeEvent';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import {ISubscribe} from '../model/interfaces/ISubscribe';

export class Timer implements ISubscribe<TimeChangeEvent> {
    private timeGenerator: Observable<TimeChangeEvent>;

    constructor() {
        this.timeGenerator = Observable.interval(1000)
            .map((value) => {
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
