import {Observer} from 'rxjs/Observer';
import {Subject} from 'rxjs/Subject';
import {Vault} from '../model/Vault';
import {MoneyEvent} from '../model/events/MoneyEvent';

export class VaultComponent {
    private htmlElem: Element;
    private vault: Vault = new Vault();
    private moneyEventObserver: Observer<MoneyEvent>;
    private subject: Subject<any> = new Subject<any>();

    constructor(elemQueryStr: string) {
        const elem = document.querySelector(elemQueryStr);
        if (elem) {
            this.htmlElem = elem;
        }

        this.moneyEventObserver = {
            next: (moneyEvent) => {
                if (moneyEvent instanceof MoneyEvent) {
                    this.vault.add(moneyEvent.amount);
                }
                if (this.htmlElem) {
                    this.htmlElem.textContent = (this.vault.getValue()).toString();
                }
                this.subject.next(new MoneyEvent(this.vault.getValue()));
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {
                console.log('completed');
            },
        };
    }

    public addSource(obs) {
        obs.subscribe(this.moneyEventObserver);
    }

    public subscribe(observable) {
        this.subject.subscribe(observable);
    }
}
