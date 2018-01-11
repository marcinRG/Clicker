import {IMathFunctions} from '../../../ts/model/interfaces/IMathFunctions';
import {GeneratorComponent} from './GeneratorComponent/GeneratorComponent';
import {VaultComponent} from './VaultComponent';
import {PropertyChangeEvent} from '../../model/events/PropertyChangeEvent';
import {Observer} from 'rxjs/Observer';
import {Subject} from 'rxjs/Subject';
import {createObserver} from '../../../ts/utils/RxUtils';
import {Timer} from '../../services/old/timer.service';

export class GeneratorComponentCollection {

    private mathUtils: IMathFunctions;
    private timer: Timer;
    private vault: VaultComponent;
    private generatorsArray: GeneratorComponent[] = [];
    private htmlElement: HTMLElement;
    private propertyChangeEventObserver: Observer<PropertyChangeEvent<any>>;
    private subject: Subject<any> = new Subject<any>();

    constructor(elemQueryStr: string) {
        const elem = <HTMLElement> document.querySelector(elemQueryStr);
        if (elem) {
            this.htmlElement = elem;
        }

        this.propertyChangeEventObserver = createObserver(this.nextPropertyChangeEvent,
            'error in GeneratorComponentCollection, propertyChangeEventObserver creator');
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
            vault.addPropertySource(this.subject);
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
        const array = [];
        for (const elem of this.generatorsArray) {
            array.push(elem.dumpProperties());
        }
        return array;
    }
    private nextPropertyChangeEvent = (event: PropertyChangeEvent<any>) => {
        if (event) {
            if (event instanceof PropertyChangeEvent && event.propertyName === 'genPerSec') {
                this.subject.next(new PropertyChangeEvent('clicksPerSecond',
                    this.calculateGeneratedPerSecond()));
            }
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
