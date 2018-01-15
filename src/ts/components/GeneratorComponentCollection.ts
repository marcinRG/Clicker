import {GeneratorComponent} from './GeneratorComponent/GeneratorComponent';
import {IMathFunctions} from '../model/interfaces/IMathFunctions';
import {Timer} from './Timer';
import {VaultComponent} from './VaultComponent';
import {Observer} from 'rxjs/Observer';
import {ChangeEvent} from '../model/events/ChangeEvent';
import {Subject} from 'rxjs/Subject';

export class GeneratorComponentCollection implements Observer<any> {
    private generatorsArray: GeneratorComponent[] = [];
    private htmlElement: HTMLElement;
    private mathUtils: IMathFunctions;
    private timer: Timer;
    private vault: VaultComponent;
    private subject: Subject<any> = new Subject<any>();

    constructor(elemQueryStr: string) {
        const elem = <HTMLElement> document.querySelector(elemQueryStr);
        if (elem) {
            this.htmlElement = elem;
        }
    }

    public next(value: any) {
        this.handleChangeEvent(value);
    }

    public error(err: any) {
        console.log('error' + err);
    }

    public complete() {
        console.log('completed');
    }

    public setMathUtils(mathUtils: IMathFunctions) {
        if (mathUtils) {
            this.mathUtils = mathUtils;
        }
    }

    public setTimer(timer: Timer) {
        if (timer) {
            this.timer = timer;
        }
    }

    public setVault(vault: VaultComponent) {
        if (vault) {
            this.vault = vault;
        }
    }

    public addComponent(generatorComponent: GeneratorComponent) {
        if (generatorComponent) {
            generatorComponent.setMathUtils(this.mathUtils);
            subscribeIfExist(this.vault, generatorComponent);
            subscribeIfExist(this.timer, generatorComponent);
            subscribeIfExist(generatorComponent, this.vault);
            subscribeIfExist(generatorComponent, this);
            this.addToHTML(generatorComponent.getHtmlElement());
            this.generatorsArray.push(generatorComponent);
        }
    }

    private handleChangeEvent(event: ChangeEvent<any>) {
        if (event && event.propertyName === 'GenPerSec') {
            this.subject.next(new ChangeEvent('GenPerSecAll',
                this.calculateGeneratedPerSecond()));
        }
    }

    private calculateGeneratedPerSecond(): number {
        let sum = 0;
        for (const elem of this.generatorsArray) {
            sum = sum + elem.getClickGenerator().getClicksPerSecond();
        }
        return sum;
    }

    private addToHTML(element: HTMLElement) {
        this.htmlElement.appendChild(element);
    }
}

const subscribeIfExist = (subscibable: any, observer: Observer<any>) => {
    if (subscibable && subscibable.subscribe && observer) {
        subscibable.subscribe(observer);
    }
};
