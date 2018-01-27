export class Vault {

    constructor(private value: number = 0, private totalSum: number = 0, private generatedPerSecond: number = 0) {
    }

    public setGeneratedPerSecond(val: number) {
        this.generatedPerSecond = val;
    }

    public getGeneratedPerSecond(): number {
        return this.generatedPerSecond;
    }

    public add(amount: number) {
        if (amount > 0) {
            this.totalSum = this.totalSum + amount;
        }
        const newValue = this.value + amount;
        if (newValue >= 0) {
            this.value = newValue;
        } else {
            this.value = 0;
        }
    }

    public getTotalSum() {
        return this.totalSum;
    }

    public getValue(): number {
        return this.value;
    }

    public dumpProperties() {
        return {
            value: this.value,
            totalSum: this.totalSum,
            generatedPerSecond: this.generatedPerSecond
        };
    }
}
