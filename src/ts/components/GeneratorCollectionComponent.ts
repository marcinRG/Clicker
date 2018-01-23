import {GeneratorComponent} from './GeneratorComponent/GeneratorComponent';
import {IMathFunctions} from '../model/interfaces/IMathFunctions';
import {Timer} from './Timer';
import {VaultComponent} from './VaultComponent';
import {Observer} from 'rxjs/Observer';
import {ChangeEvent} from '../model/events/ChangeEvent';
import {Subject} from 'rxjs/Subject';
import {createObserver} from '../utils/RxUtils';

export class GeneratorCollectionComponent {
    private generatorsArray: GeneratorComponent[] = [];
    private htmlElement: HTMLElement;
    private mathUtils: IMathFunctions;
    private timer: Timer;
    private vault: VaultComponent;
    private propertyChangeEventObserver: Observer<ChangeEvent<any>>;
    private subject: Subject<any> = new Subject<any>();

    private handleChangeEvent = (event: ChangeEvent<any>) => {
        if (event) {
            if (event instanceof ChangeEvent && event.propertyName === 'GenPerSec') {
                this.subject.next(new ChangeEvent('ClicksPerSec',
                    this.calculateGeneratedPerSecond()));
            }
        }
    };

    constructor(elemQueryStr: string) {
        const elem = <HTMLElement> document.querySelector(elemQueryStr);
        if (elem) {
            this.htmlElement = elem;
            this.propertyChangeEventObserver = createObserver(this.handleChangeEvent,
                'error in GeneratorCollectionComponent, propertyChangeEventObserver creator');
        }
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
            generatorComponent.addVault(this.vault);
            generatorComponent.addTimer(this.timer);
            generatorComponent.subscribe(this.propertyChangeEventObserver);
            this.addToHTML(generatorComponent.getHtmlElement());
            this.generatorsArray.push(generatorComponent);
        }
    }

    public dumpProperties() {
        let array = [];
        for (const elem of this.generatorsArray) {
            array.push(elem.dumpProperties());
        }
        return array;
    }

    private addToHTML(element: HTMLElement) {
        this.htmlElement.appendChild(element);
    }

    private calculateGeneratedPerSecond(): number {
        let sum = 0;
        for (let elem of this.generatorsArray) {
            sum = sum + elem.getClickGenerator().getClicksPerSecond();
        }
        return sum;
    }
}
