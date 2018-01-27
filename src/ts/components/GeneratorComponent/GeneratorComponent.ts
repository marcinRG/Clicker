import {Observer} from 'rxjs/Observer';
import {GeneratorEventWrapper} from './GeneratorEventWrapper';
import {GeneratorHTMLElement} from './GeneratorHTMLElement';
import {IMathFunctions} from '../../model/interfaces/IMathFunctions';
import {ISubscribe} from '../../model/interfaces/ISubscribe';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {VaultComponent} from '../VaultComponent';
import {Timer} from '../Timer';

export class GeneratorComponent implements ISubscribe<any> {

    private generatorEventWrapper: GeneratorEventWrapper;
    private generatorHTMLElement: GeneratorHTMLElement;
    private subject: Subject<any> = new Subject();

    constructor(name: string, price: number, amount: number, quantity: number,
                frequency: number, sumGenerated: number, className: string) {
        this.generatorEventWrapper = new GeneratorEventWrapper(name, price, amount, quantity, frequency, sumGenerated);
        this.generatorHTMLElement = new GeneratorHTMLElement(name, price, quantity, sumGenerated, className);
        this.generatorHTMLElement.addPropertyEventSource(this.generatorEventWrapper);
        this.generatorEventWrapper.addClickEventSource(this.generatorHTMLElement);
        this.generatorEventWrapper.subscribe(this.subject);
        this.generatorHTMLElement.subscribe(this.subject);
    }

    public setMathUtils(mathUtils: IMathFunctions) {
        this.generatorEventWrapper.addMathUtils(mathUtils);
    }

    public subscribe(observer: Observer<any>) {
        this.subject.subscribe(observer);
    }

    public getObservable(): Observable<any> {
        return this.subject;
    }

    public addVault(vault: VaultComponent) {
        this.generatorEventWrapper.addMoneyEventSource(vault);
        vault.addMoneyEventSource(this.generatorEventWrapper);
    }

    public addTimer(timer: Timer) {
        this.generatorEventWrapper.addTimeEventSource(timer);
    }

    public getClickGenerator() {
        return this.generatorEventWrapper.getClickGenerator();
    }

    public getHtmlElement() {
        return this.generatorHTMLElement.getHTMLElement();
    }

    public dumpProperties() {
        const className = 'className';
        const obj = this.getClickGenerator().dumpProperties();
        obj[className] = this.generatorHTMLElement.getClassName();
        return obj;
    }
}
