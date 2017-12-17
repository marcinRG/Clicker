export class ClickGenerator {

    private quantity: number = 0;
    private visible: boolean = false;
    private enabled: boolean = false;
    private sumGenerated: number = 0;

    constructor(private name: string, private price: number, private amount: number) {
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
        const newPrice = changePrice(this.quantity, this.price);
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

    public getClicks(): number {
        const clicks = Math.round(this.amount * this.quantity);
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

}

const changePrice = (quantity, price) => {
    if (quantity > 0 && price > 0) {
        return Math.round(price * (1 + (quantity - 1) * 0.2));
    }
    return -1;
};
