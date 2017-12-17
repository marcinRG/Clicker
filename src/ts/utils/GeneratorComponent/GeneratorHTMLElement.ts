import {Observable} from 'rxjs/Observable';
import {Event} from '../../model/events/Event';
import 'rxjs/add/observable/fromEvent';
import {Observer} from 'rxjs/Observer';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {ProperyChangeEvent} from '../../model/events/ProperyChangeEvent';

export class GeneratorHTMLElement {
    private htmlElement: HTMLElement;
    private propertyChangeEventObserver: Observer<ProperyChangeEvent<any>>;
    private subject: Subject<any> = new Subject();

    constructor(name: string, price: number, quantity: number) {
        const elem = createGeneratorElem(name, price, quantity);
        if (elem) {
            this.htmlElement = elem;

            Observable.fromEvent(elem, 'click').map((value) => {
                if (!this.htmlElement.getAttribute('disabled')) {
                    return (new Event('click', this.htmlElement));
                }
                return null;
            }).subscribe(this.subject);

            this.propertyChangeEventObserver = {
                next: (propertyEvent) => {
                    if ((propertyEvent) && (propertyEvent instanceof ProperyChangeEvent)) {
                        handleVisibleChange(propertyEvent, this.htmlElement);
                        handleEnabledChange(propertyEvent, this.htmlElement);
                        handlePriceChange(propertyEvent, this.htmlElement);
                        handleQuantityChange(propertyEvent, this.htmlElement);
                    }
                },
                error: (error) => {
                    console.log(error);
                },
                complete: () => {
                    console.log('completed');
                },
            };
        }
    }

    public getHTMLElement() {
        return this.htmlElement;
    }

    public addPropertyEventSource(source) {
        source.subscribe(this.propertyChangeEventObserver);
    }

    public subscribe(observer) {
        this.subject.subscribe(observer);
    }
}

const addTextToChild = (className: string, textToAdd: string, elem: HTMLElement) => {
    if (elem) {
        const child = elem.querySelector(className);
        if (child) {
            child.textContent = textToAdd;
        }
    }
};

const handlePriceChange = (propertyChangeEvent: ProperyChangeEvent<boolean>, elem: HTMLElement) => {
    if (propertyChangeEvent.propertyName === 'price') {
        if (elem) {
            addTextToChild('.price', propertyChangeEvent.value + '', elem);
        }
    }
};

const handleQuantityChange = (propertyChangeEvent: ProperyChangeEvent<boolean>, elem: HTMLElement) => {
    if (propertyChangeEvent.propertyName === 'quantity') {
        if (elem) {
            addTextToChild('.quantity', propertyChangeEvent.value + '', elem);
        }
    }
};

const handleVisibleChange = (propertyChangeEvent: ProperyChangeEvent<boolean>, elem: HTMLElement) => {
    if (propertyChangeEvent.propertyName === 'visible') {
        if (elem) {
            toggleVisibility(elem, !propertyChangeEvent.value);
        }
    }
};

const handleEnabledChange = (propertyChangeEvent: ProperyChangeEvent<boolean>, elem: HTMLElement) => {
    if (propertyChangeEvent.propertyName === 'enabled') {
        if (elem) {
            toggleDisability(elem, !propertyChangeEvent.value);
        }
    }
};

const toggleDisability = (elem: HTMLElement, toggle: boolean) => {
    if (toggle) {
        elem.setAttribute('disabled', 'true');
    } else {
        elem.removeAttribute('disabled');
    }

};

const toggleVisibility = (elem: HTMLElement, toggle: boolean) => {
    if (toggle) {
        elem.style.display = 'none';
    } else {
        elem.style.display = '';
    }
};

const createGeneratorElem = (name: string, price: number, amount: number): HTMLElement => {
    const div = document.createElement('div');
    div.classList.add('generator', name);
    div.appendChild(createSpan('name'));
    div.appendChild(createSpan('price'));
    div.appendChild(createSpan('quantity'));
    addTextToChild('.name', name, div);
    addTextToChild('.price', price + '', div);
    addTextToChild('.quantity', amount + '', div);
    toggleDisability(div, true);
    toggleVisibility(div, true);
    return div;
};

const createSpan = (name: string) => {
    const span = document.createElement('span');
    span.classList.add(name);
    return span;
};
