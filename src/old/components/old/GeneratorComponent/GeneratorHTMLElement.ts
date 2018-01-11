import {Observable} from 'rxjs/Observable';
import {Event} from '../../../model/events/Event';
import 'rxjs/add/observable/fromEvent';
import {Observer} from 'rxjs/Observer';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {createObserver} from '../../../../ts/utils/RxUtils';
import {
    addTextToChild, createGeneratorElem, toggleDisability,
    toggleVisibility
} from '../../../../ts/utils/HTMLManipulationUtils';
import {ISubscribe} from '../../../../ts/model/interfaces/ISubscribe';
import {PropertyChangeEvent} from '../../../model/events/PropertyChangeEvent';

export class GeneratorHTMLElement implements ISubscribe<any> {
    private htmlElement: HTMLElement;
    private propertyChangeEventObserver: Observer<PropertyChangeEvent<any>>;
    private subject: Subject<any> = new Subject();
    constructor(name: string, price: number, quantity: number, private className: string) {
        const elem = createGeneratorElem(name, price, quantity, this.className);
        if (elem) {
            this.htmlElement = elem;
            this.createMouseClickObservable().subscribe(this.subject);
            this.propertyChangeEventObserver = createObserver(this.nextPropertyChange,
                'error in GeneratorHTMLElement, propertyChangeEventObserver creator');
        }
    }

    public getClassName() {
        return this.className;
    }

    public getHTMLElement() {
        return this.htmlElement;
    }

    public addPropertyEventSource(source: Observable<PropertyChangeEvent<any>>) {
        source.subscribe(this.propertyChangeEventObserver);
    }

    public subscribe(observer: Observer<any>) {
        this.subject.subscribe(observer);
    }

    public getObservable(): Observable<any> {
        return this.subject;
    }
    private nextPropertyChange = (e: PropertyChangeEvent<any>) => {
        if ((e) && (e instanceof PropertyChangeEvent)) {
            handleVisibleChange(e, this.htmlElement);
            handleEnabledChange(e, this.htmlElement);
            handlePriceChange(e, this.htmlElement);
            handleQuantityChange(e, this.htmlElement);
        }
    }
    private createMouseClickObservable(): Observable<any> {
        return Observable.fromEvent(this.htmlElement, 'click').map((value) => {
            if (!this.htmlElement.getAttribute('disabled')) {
                return (new Event('click', this.htmlElement));
            }
            return null;
        });
    }
}

const handlePriceChange = (propertyChangeEvent: PropertyChangeEvent<boolean>, elem: HTMLElement) => {
    if (propertyChangeEvent.propertyName === 'price') {
        if (elem) {
            addTextToChild('.price', propertyChangeEvent.value + '', elem);
        }
    }
};

const handleQuantityChange = (propertyChangeEvent: PropertyChangeEvent<boolean>, elem: HTMLElement) => {
    if (propertyChangeEvent.propertyName === 'quantity') {
        if (elem) {
            addTextToChild('.quantity', propertyChangeEvent.value + '', elem);
        }
    }
};

const handleVisibleChange = (propertyChangeEvent: PropertyChangeEvent<boolean>, elem: HTMLElement) => {
    if (propertyChangeEvent.propertyName === 'visible') {
        if (elem) {
            toggleVisibility(elem, !propertyChangeEvent.value);
        }
    }
};

const handleEnabledChange = (propertyChangeEvent: PropertyChangeEvent<boolean>, elem: HTMLElement) => {
    if (propertyChangeEvent.propertyName === 'enabled') {
        if (elem) {
            toggleDisability(elem, !propertyChangeEvent.value);
        }
    }
};
