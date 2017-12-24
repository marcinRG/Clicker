import {Observable} from 'rxjs/Observable';
import {TimeEvent} from '../model/events/TimeEvent';
import 'rxjs/add/operator/filter';
import {Observer} from 'rxjs/Observer';
import {MoneyEvent} from '../model/events/MoneyEvent';

export const filterTimeEvents = (observable: Observable<TimeEvent>, frequency: number) => {
    return observable.filter((timeEvent: TimeEvent) => {
        return (timeEvent.value > 0) && ((timeEvent.value % frequency) === 0);
    });
};

export const filterMoneyEvents = (observable: Observable<MoneyEvent>) => {
    return observable.filter((moneyEvent: MoneyEvent) => {
        return (moneyEvent.amount !== 0);
    });
};

export const createObserver = <E>(next: (e: E) => void, errorMsg: string): Observer<E> => {
    const obj: Observer<E> = {
        next: next,
        error: (e) => {
            console.log(errorMsg);
            console.log(e);
        },
        complete: () => {
            console.log('completed');
        }
    };
    return obj;
};
