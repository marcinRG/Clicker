import {Observer} from 'rxjs/Observer';
import {Subject} from 'rxjs/Subject';
import {Vault} from '../../../ts/model/Vault';
import {MoneyEvent} from '../../model/events/MoneyEvent';
import {createObserver, filterMoneyEvents} from '../../../ts/utils/RxUtils';
import {ISubscribe} from '../../../ts/model/interfaces/ISubscribe';
import {Observable} from 'rxjs/Observable';
import {PropertyChangeEvent} from '../../model/events/PropertyChangeEvent';
import {addTextToChild, createSpan} from '../../../ts/utils/HTMLManipulationUtils';

export class VaultComponent implements ISubscribe<MoneyEvent> {
    private htmlElem: Element;
    private vault: Vault;
    private moneyEventObserver: Observer<MoneyEvent>;
    private propertyEventObserver: Observer<PropertyChangeEvent<any>>;
    private subject: Subject<any> = new Subject<any>();

    private nextMoneyEvent= (moneyEvent: MoneyEvent) => {
        if (moneyEvent instanceof MoneyEvent) {
            this.vault.add(moneyEvent.amount);
        }
        if (this.htmlElem) {
            addTextToChild('.value', this.vault.getValue() + '', <HTMLElement>this.htmlElem);

        }
        this.subject.next(new MoneyEvent(this.vault.getValue()));
    }

    private nextPropertyChangeEvent = (propertyEvent: PropertyChangeEvent<any>) => {
        if (propertyEvent instanceof PropertyChangeEvent
            && propertyEvent.propertyName === 'clicksPerSecond') {
            addTextToChild('.per-second', propertyEvent.value + '', <HTMLElement>this.htmlElem);
            this.vault.setGeneratedPerSecond(propertyEvent.value);
        }
    }

    constructor(elemQueryStr: string, value: number = 0, totalSum: number = 0, generatedPerSecond: number = 0) {
        this.vault = new Vault(value, totalSum, generatedPerSecond);
        const elem = document.querySelector(elemQueryStr);
        if (elem) {
            this.htmlElem = elem;
            this.htmlElem.appendChild(createSpan('value'));
            this.htmlElem.appendChild(createSpan('per-second'));
            this.moneyEventObserver = createObserver(this.nextMoneyEvent,
                'error in VaultComponent, moneyEventObserver creator');
            this.propertyEventObserver = createObserver(this.nextPropertyChangeEvent,
                'error in VaultComponent, propertyChangeEventObserver creator')
        }

    }

    public addPropertySource(obj: Observable<PropertyChangeEvent<any>>) {
        obj.subscribe(this.propertyEventObserver);
    }

    public addMoneySource(obj: ISubscribe<MoneyEvent>) {
        const observable: Observable<MoneyEvent> = obj.getObservable();
        filterMoneyEvents(observable).subscribe(this.moneyEventObserver);
    }

    public dumpProperties() {
        return this.vault.dumpProperties();
    }

    public getObservable(): Observable<MoneyEvent> {
        return this.subject;
    }

    public subscribe(observer: Observer<any>) {
        this.subject.subscribe(observer);
    }
}
