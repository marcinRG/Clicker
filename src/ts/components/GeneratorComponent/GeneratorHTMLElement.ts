import {
    addTextToChild, createGeneratorElem, toggleDisability,
    toggleVisibility,
} from '../../utils/HTMLManipulationUtils';
import {Observer} from 'rxjs/Observer';
import {Subject} from 'rxjs/Subject';
import {ChangeEvent} from '../../model/events/ChangeEvent';
import {Observable} from 'rxjs/Observable';

export class GeneratorHTMLElement implements Observer<any> {
    private htmlElement: HTMLElement;
    private subject: Subject<any> = new Subject();
    private clickEventEmmiter: Observable<any>;

    constructor(name: string, price: number, quantity: number, private className: string) {
        const elem = createGeneratorElem(name, price, quantity, this.className);
        if (elem) {
            this.htmlElement = elem;
            this.clickEventEmmiter = this.createMouseClickObservable();
            this.clickEventEmmiter.subscribe(this);
        }
    }

    public next(value: any) {
        console.log('next');
    }

    public error(err: any) {
        console.log('error' + err);
    }

    public complete() {
        console.log('completed');
    }

    public getClassName() {
        return this.className;
    }

    public getHTMLElement() {
        return this.htmlElement;
    }

    public subscribe(observer: Observer<any>) {
        this.subject.subscribe(observer);
    }

    private createMouseClickObservable(): Observable<any> {
        return Observable.fromEvent(this.htmlElement, 'click').map((value) => {
            if (!this.htmlElement.getAttribute('disabled')) {
                return (new ChangeEvent<any>('click', this.htmlElement));
            }
            return null;
        });
    }

}

const handlePriceChange = (propertyChangeEvent: ChangeEvent<boolean>, elem: HTMLElement) => {
    if (propertyChangeEvent.propertyName === 'price') {
        if (elem) {
            addTextToChild('.price', propertyChangeEvent.value + '', elem);
        }
    }
};

const handleQuantityChange = (propertyChangeEvent: ChangeEvent<number>, elem: HTMLElement) => {
    if (propertyChangeEvent.propertyName === 'quantity') {
        if (elem) {
            addTextToChild('.quantity', propertyChangeEvent.value + '', elem);
        }
    }
};

const handleVisibleChange = (propertyChangeEvent: ChangeEvent<boolean>, elem: HTMLElement) => {
    if (propertyChangeEvent.propertyName === 'visible') {
        if (elem) {
            toggleVisibility(elem, !propertyChangeEvent.value);
        }
    }
};

const handleEnabledChange = (propertyChangeEvent: ChangeEvent<boolean>, elem: HTMLElement) => {
    if (propertyChangeEvent.propertyName === 'enabled') {
        if (elem) {
            toggleDisability(elem, !propertyChangeEvent.value);
        }
    }
};