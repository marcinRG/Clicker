import {ClickComponent} from '../../src/ts/utils/ClickComponent';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';


describe('ClickComponent object tests', () => {
    it('should be defined', () => {
        console.log('Object should be defined');
        const clickComp: ClickComponent = new ClickComponent();
        expect(clickComp).toBeDefined();
    });

    it('object functions should return expected values', () => {
        console.log('object functions should return expected values');
        const array = [0,1,2];
        const clickComp: ClickComponent = new ClickComponent();
        const spy: jasmine.Spy = spyOn(clickComp, 'next');

        const observable = Observable.from(array);
        const observable2 = Observable.from(array);

        clickComp.addTimer(observable);
        clickComp.addClickElem(observable2);

        expect(clickComp.next).toHaveBeenCalledTimes(6);
        expect(spy.calls.count()).toBe(6);

    });

});
