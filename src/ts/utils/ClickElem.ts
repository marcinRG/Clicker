import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import {Event} from '../model/events/Event';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/fromEvent';

export class ClickElem {
    private clickEvent: Observable<any>;

    constructor(elemQueryStr: string) {
        const elem = document.querySelector(elemQueryStr);
        if (elem) {
            this.clickEvent = Observable.fromEvent(elem, 'click').map(() => {
                return new Event('click', elem);
            });
        }
    }

    public subscribe(observer) {
        this.clickEvent.subscribe(observer);
    }
}