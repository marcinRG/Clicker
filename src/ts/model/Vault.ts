export class Vault {

    constructor(private value: number = 0) {
    };

    public add(amount: number) {
        const newValue = this.value + amount;
        if (newValue >= 0) {
            this.value = newValue;
        } else {
            this.value = 0;
        }
    }
}
