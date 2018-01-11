import {Vault} from '../model/Vault';
import {Subject} from 'rxjs/Subject';
import {Observer} from 'rxjs/Observer';
import {ChangeEvent} from '../model/events/ChangeEvent';
import {MoneyChangeEvent} from '../model/events/MoneyChangeEvent';
import {addTextToChild, createSpan} from '../utils/HTMLManipulationUtils';

export class VaultComponent implements Observer<any> {
    private vault: Vault;
    private htmlElem: HTMLElement;
    private subject: Subject<any> = new Subject<any>();

    constructor(elemQueryStr: string, value: number = 0, totalSum: number = 0, generatedPerSecond: number = 0) {
        this.vault = new Vault(value, totalSum, generatedPerSecond);
        this.createHTMLElements(elemQueryStr);
    }

    public next(value: any) {
        this.handleMoneyEvent(value);
        this.handlePropertyChangeEvent(value);
    }

    public error(err: any) {
        console.log('error' + err);
    }

    public complete() {
        console.log('completed');
    }

    public subscribe(observer: Observer<any>) {
        this.subject.subscribe(observer);
    }

    public dumpProperties() {
        return this.vault.dumpProperties();
    }

    private createHTMLElements(elemQueryStr: string) {
        const elem = document.querySelector(elemQueryStr);
        if (elem) {
            this.htmlElem = <HTMLElement> elem;
            this.htmlElem.appendChild(createSpan('value'));
            this.htmlElem.appendChild(createSpan('per-second'));
        }
    }

    private handleMoneyEvent(moneyEvent: MoneyChangeEvent) {
        if (moneyEvent instanceof MoneyChangeEvent) {
            this.vault.add(moneyEvent.value);
            if (this.htmlElem) {
                addTextToChild('.value', this.vault.getValue() + '', this.htmlElem);
            }
            this.subject.next(new MoneyChangeEvent(this.vault.getValue()));
        }
    }

    private handlePropertyChangeEvent(propertyEvent: ChangeEvent<any>) {
        if (propertyEvent instanceof ChangeEvent
            && propertyEvent.propertyName === 'ClicksPerSecond') {
            if (this.htmlElem) {
                addTextToChild('.per-second', propertyEvent.value + '', this.htmlElem);
            }
            this.vault.setGeneratedPerSecond(propertyEvent.value);
        }
    }
}
