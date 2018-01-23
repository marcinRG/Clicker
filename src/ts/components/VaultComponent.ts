import {Vault} from '../model/Vault';
import {Subject} from 'rxjs/Subject';
import {ChangeEvent} from '../model/events/ChangeEvent';
import {MoneyChangeEvent} from '../model/events/MoneyChangeEvent';
import {addTextToChild, createSpan} from '../utils/HTMLManipulationUtils';
import {ISubscribe} from '../model/interfaces/ISubscribe';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {createObserver} from '../utils/RxUtils';

export class VaultComponent implements ISubscribe<any> {
    private vault: Vault;
    private htmlElem: HTMLElement;
    private subject: Subject<any> = new Subject<any>();
    private moneyEventObserver: Observer<MoneyChangeEvent>;
    private propertyEventObserver: Observer<ChangeEvent<any>>;

    constructor(elemQueryStr: string, value: number = 0, totalSum: number = 0, generatedPerSecond: number = 0) {
        this.vault = new Vault(value, totalSum, generatedPerSecond);
        this.createHTMLElements(elemQueryStr);
        this.moneyEventObserver = createObserver(this.handleMoneyEvent,
            'error in VaultComponent, moneyEventObserver');
        this.propertyEventObserver = createObserver(this.handlePropertyChangeEvent,
            'error in VaultComponent, propertyEventObserver');
    }

    public addMoneyEventSource(source: ISubscribe<MoneyChangeEvent>) {
        source.subscribe(this.moneyEventObserver);
    }

    public addPropertyEventSource(source: ISubscribe<ChangeEvent<any>>) {
        source.subscribe(this.propertyEventObserver);
    }

    public dumpProperties() {
        return this.vault.dumpProperties();
    }

    public getObservable(): Observable<any> {
        return this.subject;
    }

    public subscribe(observer: Observer<any>) {
        this.subject.subscribe(observer);
    }

    private createHTMLElements(elemQueryStr: string) {
        const elem = document.querySelector(elemQueryStr);
        if (elem) {
            this.htmlElem = <HTMLElement> elem;
            this.htmlElem.appendChild(createSpan('value'));
            addTextToChild('.value', this.vault.getValue() + '', this.htmlElem)
            this.htmlElem.appendChild(createSpan('per-second'));
            addTextToChild('.per-second', this.vault.getGeneratedPerSecond() + '', this.htmlElem)
        }
    }

    private handleMoneyEvent = (moneyEvent: MoneyChangeEvent) => {
        if (moneyEvent instanceof MoneyChangeEvent) {
            this.vault.add(moneyEvent.value);
            if (this.htmlElem) {
                addTextToChild('.value', this.vault.getValue() + '', this.htmlElem);
            }
            this.subject.next(new MoneyChangeEvent(this.vault.getValue()));
        }
    }
    private handlePropertyChangeEvent = (propertyEvent: ChangeEvent<any>) => {
        if (propertyEvent instanceof ChangeEvent
            && propertyEvent.propertyName === 'ClicksPerSec') {
            if (this.htmlElem) {
                addTextToChild('.per-second', propertyEvent.value + '', this.htmlElem);
            }
            this.vault.setGeneratedPerSecond(propertyEvent.value);
        }
    }
}
