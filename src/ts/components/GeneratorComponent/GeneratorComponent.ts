import {GeneratorHTMLElement} from './GeneratorHTMLElement';
import {GeneratorEventWrapper} from './GeneratorEventWrapper';
import {IMathFunctions} from '../../model/interfaces/IMathFunctions';
import {Subject} from 'rxjs/Subject';
import {ISubscribe} from '../../model/interfaces/ISubscribe';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {VaultComponent} from '../VaultComponent';
import {Timer} from '../Timer';

export class GeneratorComponent implements ISubscribe<any> {
    private generatorHTMLElement: GeneratorHTMLElement;
    private generatorEventWrapper: GeneratorEventWrapper;
    private subject: Subject<any> = new Subject();

    constructor(name: string, price: number, amount: number, quantity: number, frequency: number, sumGenerated: number, className: string) {
        this.generatorEventWrapper = new GeneratorEventWrapper(name, price, amount, quantity, frequency, sumGenerated);
        this.generatorHTMLElement = new GeneratorHTMLElement(name, price, quantity, className);
        this.generatorEventWrapper.addEventElem(this.generatorHTMLElement.getObservable());
        this.generatorHTMLElement.addPropertyEventSource(this.generatorEventWrapper.getObservable());
        this.generatorHTMLElement.getObservable().subscribe(this.subject);
        this.generatorEventWrapper.getObservable().subscribe(this.subject);
    }

    public getClickGenerator() {
        return this.generatorEventWrapper.getClickGenerator();
    }

    public setMathUtils(mathUtils: IMathFunctions) {
        this.generatorEventWrapper.addMathUtils(mathUtils);
    }

    public addVault(vault: VaultComponent) {
        this.generatorEventWrapper.addMoneyEvent(vault);
        vault.addMoneySource(this.generatorEventWrapper);
    }

    public addTimer(timer:Timer) {
        this.generatorEventWrapper.addTimer(timer);
    }

    public getHtmlElement() {
        return this.generatorHTMLElement.getHTMLElement();
    }

    public subscribe(obj: Observer<any>) {
        this.subject.subscribe(obj);
    }

    public getObservable(): Observable<any> {
        return this.subject;
    }

}
