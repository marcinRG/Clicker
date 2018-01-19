import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import {Observer} from 'rxjs/Observer';
import {MoneyChangeEvent} from '../model/events/MoneyChangeEvent';

export class ClickComponent {

    private htmlElement: HTMLElement;
    private clickSource: Observable<MoneyChangeEvent>;

    constructor(elemQueryStr: string) {

        const elem = <HTMLElement> document.querySelector(elemQueryStr);
        if (elem) {
            this.htmlElement = elem;
            this.clickSource = Observable.fromEvent(this.htmlElement, 'click').map(() => {
                return (new MoneyChangeEvent(1));
            });
        }
    }

    public getObservable(): Observable<MoneyChangeEvent> {
        return this.clickSource;
    }

    public subscribe(observer: Observer<MoneyChangeEvent>) {
        this.clickSource.subscribe(observer);
    }
}
