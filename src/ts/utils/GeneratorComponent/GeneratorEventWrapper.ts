import {Observer} from 'rxjs/Observer';
import {Subject} from 'rxjs/Subject';
import {TimeEvent} from '../../model/events/TimeEvent';
import {MoneyEvent} from '../../model/events/MoneyEvent';
import {ClickGenerator} from '../../model/ClickGenerator';
import {ProperyChangeEvent} from '../../model/events/ProperyChangeEvent';
import {Event} from '../../model/events/Event';

export class GeneratorEventWrapper {
    private eventObserver: Observer<Event<any>>;
    private timeEventObserver: Observer<TimeEvent>;
    private moneyEventObserver: Observer<MoneyEvent>;
    private clickGenerator: ClickGenerator;
    private subject: Subject<any> = new Subject();

    constructor(name: string, price: number, amount: number) {
        this.clickGenerator = new ClickGenerator(name, price, amount);
        this.timeEventObserver = {
            next: (timeEvent) => {
                if (timeEvent) {
                    this.subject.next(new MoneyEvent(this.clickGenerator.getClicks()));
                    this.subject.next(new ProperyChangeEvent('sum', this.clickGenerator.getSum()));
                }
            },
            error: (error) => {
                console.log('error in ClickGeneratorEventWrapper');
                console.log(error);
            },
            complete: () => {
                console.log('completed');
            },
        };

        this.moneyEventObserver = {
            next: (moneyEvent) => {
                if (moneyEvent) {
                    if (this.clickGenerator.canChangeVisible(moneyEvent.amount)) {
                        this.clickGenerator.setVisible();
                        this.subject.next(new ProperyChangeEvent('visible', this.clickGenerator.getVisible()));
                    }
                    if (this.clickGenerator.canChangeEnabled(moneyEvent.amount)) {
                        const enabledState = this.clickGenerator.changeEnabled();
                        this.subject.next(new ProperyChangeEvent('enabled', enabledState));
                    }
                }
            },
            error: (error) => {
                console.log('error in ClickGeneratorEventWrapper');
                console.log(error);
            },
            complete: () => {
                console.log('completed');
            },
        };

        this.eventObserver = {
            next: (event) => {
                if (event && event.name === 'click') {
                    const oldPrice = this.clickGenerator.increaseQuantityByOne();
                    this.subject.next(new MoneyEvent(-1 * oldPrice));
                    this.subject.next(new ProperyChangeEvent('price', this.clickGenerator.getPrice()));
                    this.subject.next(new ProperyChangeEvent('quantity', this.clickGenerator.getQuantity()));
                }
            },
            error: (error) => {
                console.log('error in ClickGeneratorEventWrapper');
                console.log(error);
            },
            complete: () => {
                console.log('completed');
            },
        };
    }

    public subscribe(obj) {
        this.subject.subscribe(obj);
    }

    public addTimer(timer: any) {
        timer.subscribe(this.timeEventObserver);
    }

    public addEventElem(eventElem: any) {
        eventElem.subscribe(this.eventObserver);
    }

    public addMoneyEvent(moneyEvent: any) {
        moneyEvent.subscribe(this.moneyEventObserver);
    }
}
