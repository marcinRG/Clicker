import {Observer} from 'rxjs/Observer';
import {GeneratorEventWrapper} from './GeneratorEventWrapper';
import {GeneratorHTMLElement} from './GeneratorHTMLElement';
import {IMathFunctions} from '../../model/interfaces/IMathFunctions';

export class GeneratorComponent implements Observer<any> {
    private generatorEventWrapper: GeneratorEventWrapper;
    private generatorHTMLElement: GeneratorHTMLElement;

    constructor(name: string, price: number, amount: number, quantity: number,
                frequency: number, sumGenerated: number, className: string) {
        this.generatorEventWrapper = new GeneratorEventWrapper(name, price, amount, quantity, frequency, sumGenerated);
        this.generatorHTMLElement = new GeneratorHTMLElement(name, price, quantity, className);
        this.generatorEventWrapper.subscribe(this.generatorHTMLElement);
        this.generatorHTMLElement.subscribe(this.generatorEventWrapper);
    }

    public next(value: any) {
        this.generatorEventWrapper.next(value);
        this.generatorHTMLElement.next(value);
    }

    public error(err: any) {
        console.log('error' + err);
    }

    public complete() {
        console.log('completed');
    }

    public setMathUtils(mathUtils: IMathFunctions) {
        this.generatorEventWrapper.addMathUtils(mathUtils);
    }

    public subscribe(observer: Observer<any>) {
        this.generatorEventWrapper.subscribe(observer);
        this.generatorHTMLElement.subscribe(observer);
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
