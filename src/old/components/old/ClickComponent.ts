import {Observable} from 'rxjs/Observable';
import {MoneyEvent} from '../../model/events/MoneyEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import {Observer} from 'rxjs/Observer';
import {ISubscribe} from '../../../ts/model/interfaces/ISubscribe';

export class ClickComponent implements ISubscribe<MoneyEvent> {

    private htmlElement: HTMLElement;
    private clickSource: Observable<MoneyEvent>;

    constructor(elemQueryStr: string) {

        const elem = <HTMLElement> document.querySelector(elemQueryStr);
        if (elem) {
            this.htmlElement = elem;
            this.clickSource = Observable.fromEvent(this.htmlElement, 'click').map(() => {
                return (new MoneyEvent(1));
            });
        }
    }

    public getObservable(): Observable<MoneyEvent> {
        return this.clickSource;
    }

    public subscribe(observer: Observer<MoneyEvent>) {
        this.clickSource.subscribe(observer);
    }
}
