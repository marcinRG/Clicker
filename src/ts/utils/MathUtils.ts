import {IMathFunctions} from '../model/interfaces/IMathFunctions';

export class MathUtils implements IMathFunctions {

    public calculateProduction(amount: number, quantity: number): number {
        return Math.round(amount * quantity);
    }

    public calculateNextPrice(quantity: number, currentPrice: number): number {
        if (quantity > 0 && currentPrice > 0) {
            return Math.round(currentPrice * (1 + (quantity - 1) * 0.2));
        }
        return -1;
    }

    public calculateProductionPerSec(amount: number, quantity: number, frequency: number) {
        if (frequency > 0) {
            return (amount * quantity) / (frequency);
        }
    }
}
