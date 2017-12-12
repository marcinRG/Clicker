export class ClickGenerator {

    constructor(private name: string, private price: number, private clicks: number, private quantity:number = 0) {
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public increaseQuantityByOne(): void {
        this.quantity = this.quantity + 1;
        const newPrice = changePrice(this.quantity, this.price);
        if (newPrice) {
            this.price = newPrice;
        }
    }

    public getPrice(): number {
        return this.price;
    }

    public getName(): string {
        return this.name;
    }

    public getClicks(): number {
        return Math.round(this.clicks * this.quantity);
    }

}

const changePrice = (quantity, price) => {
    if (quantity > 0 && price > 0) {
        return Math.round(price * (1 + (quantity - 1) * 0.2));
    }
    return -1;
};
