import {Observer} from 'rxjs/Observer';
import {Subject} from 'rxjs/Subject';
import {ClickGenerator} from '../../model/ClickGenerator';
import {TimeChangeEvent} from '../../model/events/TimeChangeEvent';
import {MoneyChangeEvent} from '../../model/events/MoneyChangeEvent';
import {ChangeEvent} from '../../model/events/ChangeEvent';
import {IMathFunctions} from '../../model/interfaces/IMathFunctions';
import {ISubscribe} from '../../model/interfaces/ISubscribe';
import {Observable} from 'rxjs/Observable';
import {createObserver} from '../../utils/RxUtils';

export class GeneratorEventWrapper implements ISubscribe<any> {
    private clickGenerator: ClickGenerator;
    private timeEventObserver: Observer<TimeChangeEvent>;
    private moneyEventObserver: Observer<MoneyChangeEvent>;
    private clickEventObserver: Observer<ChangeEvent<any>>;
    private subject: Subject<any> = new Subject<any>();
    private handleTimeEvent = (timeEvent: TimeChangeEvent) => {
        if (timeEvent instanceof TimeChangeEvent) {
            if (this.clickGenerator.getQuantity() > 0) {
                this.subject.next(new MoneyChangeEvent(this.clickGenerator.getClicks()));
                this.subject.next(new ChangeEvent('Sum', this.clickGenerator.getSum()));
            }
        }
    };
    private handleMoneyEvent = (moneyEvent: MoneyChangeEvent) => {
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
    };
    private handleClickEvent = (clickEvent: ChangeEvent<any>) => {
        if (clickEvent.propertyName === 'Click') {
            const oldPrice = this.clickGenerator.increaseQuantityByOne();
            this.subject.next(new MoneyChangeEvent(-1 * oldPrice));
            this.subject.next(new ChangeEvent('Price', this.clickGenerator.getPrice()));
            this.subject.next(new ChangeEvent('Quantity', this.clickGenerator.getQuantity()));
            this.subject.next(new ChangeEvent('GenPerSec', this.clickGenerator.getClicksPerSecond()));
        }
    };

    constructor(name: string, price: number, amount: number, quantity: number,
                frequency: number, sumGenerated: number) {
        this.clickGenerator = new ClickGenerator(name, price, amount, quantity, frequency, sumGenerated);
        this.timeEventObserver = createObserver<TimeChangeEvent>(this.handleTimeEvent,
            'error in GeneratorEventWrapper, timeEventObserver creator');
        this.moneyEventObserver = createObserver<MoneyChangeEvent>(this.handleMoneyEvent,
            'error in GeneratorEventWrapper, moneyEventObserver creator');
        this.clickEventObserver = createObserver<ChangeEvent<any>>(this.handleClickEvent,
            'error in GeneratorEventWrapper, clickEventObserver creator');
    }

    public addTimeEventSource(source: ISubscribe<TimeChangeEvent>) {
        source.subscribe(this.timeEventObserver);
    }

    public addMoneyEventSource(source: ISubscribe<MoneyChangeEvent>) {
        source.subscribe(this.moneyEventObserver);
    }

    public addClickEventSource(source: ISubscribe<ChangeEvent<any>>) {
        source.subscribe(this.clickEventObserver);
    }

    public getClickGenerator() {
        return this.clickGenerator;
    }

    public getObservable(): Observable<any> {
        return this.subject;
    }

    public subscribe(observer: Observer<any>) {
        this.subject.subscribe(observer);
    }

    public addMathUtils(mathUtils: IMathFunctions) {
        this.clickGenerator.setMathUtils(mathUtils);
    }
}
