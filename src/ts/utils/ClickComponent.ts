import {Observable} from 'rxjs/Observable';
import {MoneyEvent} from '../model/events/MoneyEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';

export class ClickComponent {
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

    public subscribe(obj) {
        this.clickSource.subscribe(obj);
    }
}
