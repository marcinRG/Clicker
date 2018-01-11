import {Observer} from 'rxjs/Observer';
import {Subject} from 'rxjs/Subject';
import {ClickGenerator} from '../../model/ClickGenerator';
import {TimeChangeEvent} from '../../model/events/TimeChangeEvent';
import {MoneyChangeEvent} from '../../model/events/MoneyChangeEvent';
import {ChangeEvent} from '../../model/events/ChangeEvent';

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
        this.handleTimeEvent(value);
        this.handleMoneyEvent(value);
    }

    public error(err: any) {
        console.log('error ocurred:' + err);
    }

    public complete() {
        console.log('complete');
    }

    private handleTimeEvent(timeEvent: TimeChangeEvent) {
        if (timeEvent && timeEvent instanceof TimeChangeEvent) {
            if (this.clickGenerator.getQuantity() > 0) {
                this.subject.next(new MoneyChangeEvent(this.clickGenerator.getClicks()));
                this.subject.next(new ChangeEvent('Sum', this.clickGenerator.getSum()));
            }
        }
    }

    private handleMoneyEvent(moneyEvent: MoneyChangeEvent) {
        if (moneyEvent && moneyEvent instanceof MoneyChangeEvent) {
            if (this.clickGenerator.canChangeVisible(moneyEvent.value)) {
                this.clickGenerator.setVisible();
                this.subject.next(new ChangeEvent<boolean>('Visible', this.clickGenerator.getVisible()));
            }
            if (this.clickGenerator.canChangeEnabled(moneyEvent.value)) {
                const enabledState = this.clickGenerator.changeEnabled();
                this.subject.next(new ChangeEvent<boolean>('enabled', enabledState));
            }
        }
    }

    //
    // private nextEvent = (e: Event<any>) => {
    //     if (e && e.name === 'click') {
    //         const oldPrice = this.clickGenerator.increaseQuantityByOne();
    //         this.subject.next(new MoneyEvent(-1 * oldPrice));
    //         this.subject.next(new PropertyChangeEvent('price', this.clickGenerator.getPrice()));
    //         this.subject.next(new PropertyChangeEvent('quantity', this.clickGenerator.getQuantity()));
    //         this.subject.next(new PropertyChangeEvent('genPerSec', this.clickGenerator.getClicksPerSecond()));
    //     }
    // };

}
