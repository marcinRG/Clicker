import {Observer} from 'rxjs/Observer';
import {Subject} from 'rxjs/Subject';
import {TimeEvent} from '../../model/events/TimeEvent';
import {MoneyEvent} from '../../model/events/MoneyEvent';
import {ClickGenerator} from '../../model/ClickGenerator';
import {PropertyChangeEvent} from '../../model/events/PropertyChangeEvent';
import {Event} from '../../model/events/Event';
import {Observable} from 'rxjs/Observable';
import {ISubscribe} from '../../model/interfaces/ISubscribe';
import {IMathFunctions} from '../../model/interfaces/IMathFunctions';
import {createObserver, filterTimeEvents} from '../../utils/RxUtils';

export class GeneratorEventWrapper implements ISubscribe<any> {

    private eventObserver: Observer<Event<any>>;
    private timeEventObserver: Observer<TimeEvent>;
    private moneyEventObserver: Observer<MoneyEvent>;
    private clickGenerator: ClickGenerator;
    private subject: Subject<any> = new Subject();

    private nextTimeEvent = (e: TimeEvent) => {
        if (e) {
            if (this.clickGenerator.getQuantity() > 0) {
                this.subject.next(new MoneyEvent(this.clickGenerator.getClicks()));
                this.subject.next(new PropertyChangeEvent('sum', this.clickGenerator.getSum()));
            }
        }
    };

    private nextMoneyEvent = (e: MoneyEvent) => {
        if (e) {
            if (this.clickGenerator.canChangeVisible(e.amount)) {
                this.clickGenerator.setVisible();
                this.subject.next(new PropertyChangeEvent('visible', this.clickGenerator.getVisible()));
            }
            if (this.clickGenerator.canChangeEnabled(e.amount)) {
                const enabledState = this.clickGenerator.changeEnabled();
                this.subject.next(new PropertyChangeEvent('enabled', enabledState));
            }
        }
    };

    private nextEvent = (e: Event<any>) => {
        if (e && e.name === 'click') {
            const oldPrice = this.clickGenerator.increaseQuantityByOne();
            this.subject.next(new MoneyEvent(-1 * oldPrice));
            this.subject.next(new PropertyChangeEvent('price', this.clickGenerator.getPrice()));
            this.subject.next(new PropertyChangeEvent('quantity', this.clickGenerator.getQuantity()));
            this.subject.next(new PropertyChangeEvent('genPerSec', this.clickGenerator.getClicksPerSecond()));
        }
    };

    constructor(name: string, price: number, amount: number, quantity: number, frequency: number, sumGenerated: number) {
        this.clickGenerator = new ClickGenerator(name, price, amount, quantity, frequency, sumGenerated);
        this.timeEventObserver = createObserver<TimeEvent>(this.nextTimeEvent,
            'error in GeneratorEventWrapper, timeEventObserver creator');
        this.moneyEventObserver = createObserver<MoneyEvent>(this.nextMoneyEvent,
            'error in GeneratorEventWrapper, moneyEventObserver creator');
        this.eventObserver = createObserver<Event<any>>(this.nextEvent,
            'error in GeneratorEventWrapper, eventObserver creator');
    }

    public getClickGenerator() {
        return this.clickGenerator;
    }

    public addMathUtils(mathUtils: IMathFunctions) {
        this.clickGenerator.setMathUtils(mathUtils);
    }

    public subscribe(obj: Observer<any>) {
        this.subject.subscribe(obj);
    }

    public getObservable(): Observable<any> {
        return this.subject;
    }

    public addTimer(timer: ISubscribe<TimeEvent>) {
        const observable: Observable<TimeEvent> = timer.getObservable();
        filterTimeEvents(observable, this.clickGenerator.getFrequency()).subscribe(this.timeEventObserver);
    }

    public addEventElem(eventElem: Observable<Event<any>>) {
        eventElem.subscribe(this.eventObserver);
    }

    public addMoneyEvent(moneyEvent: ISubscribe<MoneyEvent>) {
        const observable:Observable<MoneyEvent> = moneyEvent.getObservable();
        observable.subscribe(this.moneyEventObserver);
    }
}
