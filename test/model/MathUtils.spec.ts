import {MathUtils} from '../../src/ts/utils/MathUtils';

describe('Math Utils test', () => {
    const mathUtils: MathUtils = new MathUtils();
    it('Math Utils function tests', () => {
        console.log('Math Utils test');
        expect(mathUtils).toBeDefined();
        expect(mathUtils.calculateProduction(1, 50)).toBe(50);
        expect(mathUtils.calculateProduction(4, 25)).toBe(100);
        expect(mathUtils.calculateNextPrice(0, 20)).toBe(-1);
        //currentPrice * (1 + (quantity - 1) * 0.2)
        expect(mathUtils.calculateNextPrice(2, 45)).toBe(Math.round((1 + ((2 - 1) * 0.2)) * 45));
        //(amount * quantity) / (frequency);
        expect(mathUtils.calculateProductionPerSec(20, 5, 1)).toBe(20 * 5);
    });
});
