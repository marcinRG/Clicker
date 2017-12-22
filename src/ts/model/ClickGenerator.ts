import {IMathFunctions} from './interfaces/IMathFunctions';

export class ClickGenerator {

    private visible: boolean = false;
    private enabled: boolean = false;
    private mathUtils: IMathFunctions;

    constructor(private name: string, private price: number, private amount: number,
                private quantity: number = 0, private frequency: number = 1, private sumGenerated: number = 0) {
    }

    public setMathUtils(mathUtils: IMathFunctions) {
        this.mathUtils = mathUtils;
    }

    public getFrequency() {
        return this.frequency;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setVisible() {
        this.visible = true;
    }

    public getVisible() {
        return this.visible;
    }

    public increaseQuantityByOne(): number {
        this.quantity = this.quantity + 1;
        const oldPrice = this.price;
        const newPrice = this.calculateNewPrice();
        if (newPrice) {
            this.price = newPrice;
            return oldPrice;
        }
        return 0;
    }

    public getPrice(): number {
        return this.price;
    }

    public getName(): string {
        return this.name;
    }

    public getClicksPerSecond() {
        if (this.mathUtils) {
            return this.mathUtils.calculateProductionPerSec(this.amount, this.quantity, this.frequency);
        }
    }

    public getClicks(): number {
        const clicks = this.calculateClicks();
        this.sumGenerated = this.sumGenerated + clicks;
        return clicks;
    }

    public changeEnabled() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    public canChangeVisible(val) {
        return (!this.visible) && (val >= (this.price / 2));
    }

    public canChangeEnabled(val) {
        return ((!this.enabled) && (val >= this.price)) || ((this.enabled) && !(val >= this.price));
    }

    public getSum() {
        return this.sumGenerated;
    }

    private calculateNewPrice() {
        if (this.mathUtils) {
            return this.mathUtils.calculateNextPrice(this.quantity, this.price);
        }
        return 0;
    }

    private calculateClicks() {
        if (this.mathUtils) {
            return this.mathUtils.calculateProduction(this.quantity, this.amount);
        }
        return 0;
    }
}
