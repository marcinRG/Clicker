import {ClickGenerator} from '../../src/ts/model/ClickGenerator';

describe('ClickGenerator object tests', () => {
    it('should be defined', () => {
        console.log('Object should be defined');
        const clickGenerator: ClickGenerator = new ClickGenerator('cursor', 10, 50);
        expect(clickGenerator).toBeDefined();
    });

    it('object functions should return expected values', () => {
        console.log('object functions should return expected values');
        const clickGenerator: ClickGenerator = new ClickGenerator('Factory', 100, 50);
        expect(clickGenerator.getPrice()).toBe(100);
        expect(clickGenerator.getName()).toBe('Factory');
        expect(clickGenerator.getQuantity()).toBe(0);

        clickGenerator.increaseQuantityByOne();
        expect(clickGenerator.getPrice()).toBe(100);
        expect(clickGenerator.getQuantity()).toBe(1);
        expect(clickGenerator.getClicks()).toBe(50 * 1);

        clickGenerator.increaseQuantityByOne();
        expect(clickGenerator.getPrice()).toBe(120);
        expect(clickGenerator.getQuantity()).toBe(2);
        expect(clickGenerator.getClicks()).toBe(50 * 2);

        clickGenerator.increaseQuantityByOne();
        expect(clickGenerator.getPrice()).toBe(168);
        expect(clickGenerator.getQuantity()).toBe(3);
        expect(clickGenerator.getClicks()).toBe(50 * 3);

        clickGenerator.increaseQuantityByOne();
        expect(clickGenerator.getPrice()).toBe(269);
        expect(clickGenerator.getQuantity()).toBe(4);
        expect(clickGenerator.getClicks()).toBe(50 * 4);

        clickGenerator.increaseQuantityByOne();
        expect(clickGenerator.getPrice()).toBe(484);
        expect(clickGenerator.getQuantity()).toBe(5);
        expect(clickGenerator.getClicks()).toBe(50 * 5);
    });

});
