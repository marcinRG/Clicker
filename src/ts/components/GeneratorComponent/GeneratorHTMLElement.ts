import {
    addTextToChild, createGeneratorElem, toggleDisability,
    toggleVisibility,
} from '../../utils/HTMLManipulationUtils';
import {Observer} from 'rxjs/Observer';
import {ChangeEvent} from '../../model/events/ChangeEvent';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import {ISubscribe} from '../../model/interfaces/ISubscribe';
import {createObserver} from '../../utils/RxUtils';
import 'rxjs/add/operator/filter';

export class GeneratorHTMLElement implements ISubscribe<any> {
    private htmlElement: HTMLElement;
    private clickEventSource: Observable<any>;
    private propertyEventObserver: Observer<ChangeEvent<any>>;

    constructor(name: string, price: number, quantity: number, sum: number, private className: string) {
        const elem = createGeneratorElem(name, price, quantity, sum, this.className);
        if (elem) {
            this.htmlElement = elem;
            this.clickEventSource = this.createMouseClickObservable();
            this.propertyEventObserver = createObserver(this.handlePropertyChange,
                'error in GeneratorHTMLElement, propertyEventObserver');
        }
    }

    public addPropertyEventSource(source: ISubscribe<any>) {
        source.subscribe(this.propertyEventObserver);
    }

    public getObservable(): Observable<any> {
        return this.clickEventSource;
    }

    public subscribe(observer: Observer<any>) {
        this.clickEventSource.subscribe(observer);
    }

    public getHTMLElement() {
        return this.htmlElement;
    }

    public getClassName() {
        return this.className;
    }

    private createMouseClickObservable(): Observable<any> {
        return Observable.fromEvent(this.htmlElement, 'click').map((value) => {
            if (!this.htmlElement.hasAttribute('disabled')) {
                return (new ChangeEvent<any>('Click', this.htmlElement));
            }
            return null;
        }).filter((value) => !!value);
    }

    private handlePropertyChange = (changeEvent: ChangeEvent<any>) => {
        if (changeEvent && changeEvent instanceof ChangeEvent) {
            this.handlePriceChange(changeEvent);
            this.handleEnabledChange(changeEvent);
            this.handleQuantityChange(changeEvent);
            this.handleVisibleChange(changeEvent);
            this.handleSumChange(changeEvent);
        }
    }
    private handlePriceChange = (changeEvent: ChangeEvent<boolean>) => {
        if (changeEvent.propertyName === 'Price') {
            if (this.htmlElement) {
                addTextToChild('.price', changeEvent.value + '', this.htmlElement);
            }
        }
    }
    private handleQuantityChange = (changeEvent: ChangeEvent<number>) => {
        if (changeEvent.propertyName === 'Quantity') {
            if (this.htmlElement) {
                addTextToChild('.quantity', changeEvent.value + '', this.htmlElement);
            }
        }
    }
    private handleVisibleChange = (changeEvent: ChangeEvent<boolean>) => {
        if (changeEvent.propertyName === 'Visible') {
            if (this.htmlElement) {
                toggleVisibility(this.htmlElement, !changeEvent.value);
            }
        }
    }
    private handleEnabledChange = (propertyChangeEvent: ChangeEvent<boolean>) => {
        if (propertyChangeEvent.propertyName === 'Enabled') {
            if (this.htmlElement) {
                toggleDisability(this.htmlElement, propertyChangeEvent.value);
            }
        }
    }
    private handleSumChange = (propertyChangeEvent: ChangeEvent<number>) => {
        if (propertyChangeEvent.propertyName === 'Sum') {
            if (this.htmlElement) {
                addTextToChild('.generated', propertyChangeEvent.value + '', this.htmlElement);
            }
        }
    }
}
