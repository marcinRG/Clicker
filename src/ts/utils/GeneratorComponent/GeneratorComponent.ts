import {GeneratorHTMLElement} from './GeneratorHTMLElement';
import {GeneratorEventWrapper} from './GeneratorEventWrapper';

export class GeneratorComponent {
    private generatorHTMLElement: GeneratorHTMLElement;
    private generatorEventWrapper: GeneratorEventWrapper;

    constructor(name: string, price: number, amount: number) {
        this.generatorEventWrapper = new GeneratorEventWrapper(name, price, amount);
        this.generatorHTMLElement = new GeneratorHTMLElement(name, price, 1);
        this.generatorEventWrapper.addEventElem(this.generatorHTMLElement);
        this.generatorHTMLElement.addPropertyEventSource(this.generatorEventWrapper);
    }

    public addVault(vault) {
        this.generatorEventWrapper.addMoneyEvent(vault);
        vault.addSource(this.generatorEventWrapper);
    }

    public addTimer(timer) {
        this.generatorEventWrapper.addTimer(timer);

    }

    public getHtmlElement() {
        return this.generatorHTMLElement.getHTMLElement();
    }
}
