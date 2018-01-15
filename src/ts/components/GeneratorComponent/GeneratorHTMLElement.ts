import {
    addTextToChild, createGeneratorElem, toggleDisability,
    toggleVisibility,
} from '../../utils/HTMLManipulationUtils';
import {Observer} from 'rxjs/Observer';
import {Subject} from 'rxjs/Subject';
import {ChangeEvent} from '../../model/events/ChangeEvent';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

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
        if (value) {
            this.handleClick(value);
            this.handlePriceChange(value);
            this.handleEnabledChange(value);
            this.handleQuantityChange(value);
            this.handleVisibleChange(value);
        }
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
            if (!this.htmlElement.hasAttribute('disabled')) {
                return (new ChangeEvent<any>('Click', this.htmlElement));
            }
            return null;
        });
    }

    private handleClick(changeEvent: ChangeEvent<any>) {
        if (changeEvent.propertyName === 'Click') {
            this.subject.next(changeEvent);
        }
    }

    private handlePriceChange(changeEvent: ChangeEvent<boolean>) {
        if (changeEvent.propertyName === 'Price') {
            if (this.htmlElement) {
                addTextToChild('.price', changeEvent.value + '', this.htmlElement);
            }
        }
    }

    private handleQuantityChange(changeEvent: ChangeEvent<number>) {
        if (changeEvent.propertyName === 'Quantity') {
            if (this.htmlElement) {
                addTextToChild('.quantity', changeEvent.value + '', this.htmlElement);
            }
        }
    }

    private handleVisibleChange(changeEvent: ChangeEvent<boolean>) {
        if (changeEvent.propertyName === 'Visible') {
            console.log('visible event');
            if (this.htmlElement) {
                toggleVisibility(this.htmlElement, !changeEvent.value);
            }
        }
    }

    private handleEnabledChange(propertyChangeEvent: ChangeEvent<boolean>) {
        if (propertyChangeEvent.propertyName === 'Enabled') {
            console.log('property change Enabled');
            if (this.htmlElement) {
               toggleDisability(this.htmlElement, propertyChangeEvent.value);
            }
        }
    }
}
