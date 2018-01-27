import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import {Observer} from 'rxjs/Observer';
import {MoneyChangeEvent} from '../model/events/MoneyChangeEvent';
import {ISubscribe} from '../model/interfaces/ISubscribe';

export class ClickComponent implements ISubscribe<MoneyChangeEvent> {

    private htmlElement: HTMLElement;
    private moneyEventSource: Observable<MoneyChangeEvent>;

    constructor(elemQueryStr: string) {

        const elem = <HTMLElement> document.querySelector(elemQueryStr);
        if (elem) {
            this.htmlElement = elem;
            this.moneyEventSource = Observable.fromEvent(this.htmlElement, 'click').map(() => {
                return (new MoneyChangeEvent(1));
            });
        }
    }

    public getObservable(): Observable<MoneyChangeEvent> {
        return this.moneyEventSource;
    }

    public subscribe(observer: Observer<MoneyChangeEvent>) {
        this.moneyEventSource.subscribe(observer);
    }
}
