import {Observer} from 'rxjs/Observer';
import {Subject} from 'rxjs/Subject';
import {ClickGenerator} from '../../model/ClickGenerator';
import {TimeChangeEvent} from '../../model/events/TimeChangeEvent';
import {MoneyChangeEvent} from '../../model/events/MoneyChangeEvent';
import {ChangeEvent} from '../../model/events/ChangeEvent';
import {IMathFunctions} from '../../model/interfaces/IMathFunctions';

export class GeneratorEventWrapper implements Observer<any> {
    private clickGenerator: ClickGenerator;
    private subject: Subject<any> = new Subject<any>();

    constructor(name: string, price: number, amount: number, quantity: number,
                frequency: number, sumGenerated: number) {
        this.clickGenerator = new ClickGenerator(name, price, amount, quantity, frequency, sumGenerated);
    }

    public getClickGenerator() {
        return this.clickGenerator;
    }

    public next(value: any) {
        if (value) {
            this.handleTimeEvent(value);
            this.handleMoneyEvent(value);
            this.handleClickEvent(value);
        }
    }

    public error(err: any) {
        console.log('error ocurred:' + err);
    }

    public complete() {
        console.log('complete');
    }

    public subscribe(observer: Observer<any>) {
        this.subject.subscribe(observer);
    }

    public addMathUtils(mathUtils: IMathFunctions) {
        this.clickGenerator.setMathUtils(mathUtils);
    }

    private handleTimeEvent(timeEvent: TimeChangeEvent) {
        if (timeEvent instanceof TimeChangeEvent) {
            if ((timeEvent.value % this.clickGenerator.getFrequency()) === 0) {
                if (this.clickGenerator.getQuantity() > 0) {
                    this.subject.next(new MoneyChangeEvent(this.clickGenerator.getClicks()));
                    this.subject.next(new ChangeEvent('Sum', this.clickGenerator.getSum()));
                }
            }
        }
    }

    private handleMoneyEvent(moneyEvent: MoneyChangeEvent) {
        if (moneyEvent instanceof MoneyChangeEvent) {
            if (this.clickGenerator.canChangeVisible(moneyEvent.value)) {
                this.clickGenerator.setVisible();
                this.subject.next(new ChangeEvent<boolean>('Visible', this.clickGenerator.getVisible()));
            }
            if (this.clickGenerator.canChangeEnabled(moneyEvent.value)) {
                const enabledState = this.clickGenerator.changeEnabled();
                this.subject.next(new ChangeEvent<boolean>('Enabled', enabledState));
            }
        }
    }

    private handleClickEvent(clickEvent: ChangeEvent<any>) {
        if (clickEvent.propertyName === 'Click') {
            const oldPrice = this.clickGenerator.increaseQuantityByOne();
            this.subject.next(new MoneyChangeEvent(-1 * oldPrice));
            this.subject.next(new ChangeEvent('Price', this.clickGenerator.getPrice()));
            this.subject.next(new ChangeEvent('Quantity', this.clickGenerator.getQuantity()));
            this.subject.next(new ChangeEvent('GenPerSec', this.clickGenerator.getClicksPerSecond()));
        }
    }
}
