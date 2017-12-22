export interface IMathFunctions {
    calculateNextPrice(quantity: number, currentPrice: number): number;
    calculateProductionPerSec(amount: number, quantity: number, frequency: number): number;
    calculateProduction(amount:number, quantity: number): number;
}
