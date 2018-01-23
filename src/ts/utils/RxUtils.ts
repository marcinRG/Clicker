import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {TimeChangeEvent} from '../model/events/TimeChangeEvent';
import {MoneyChangeEvent} from '../model/events/MoneyChangeEvent';

export const createObserver = <E>(next: (e: E) => void, errorMsg: string): Observer<E> => {
    const obj: Observer<E> = {
        next,
        error: (e) => {
            console.log(errorMsg);
            console.log(e);
        },
        complete: () => {
            console.log('completed');
        },
    };
    return obj;
};

export const filterTimeEvents = (observable: Observable<TimeChangeEvent>, frequency: number): Observable<any> => {
    return observable.filter((timeEvent: TimeChangeEvent) => {
        return (timeEvent.value > 0) && ((timeEvent.value % frequency) === 0);
    });
};

export const filterMoneyEvents = (observable: Observable<MoneyChangeEvent>) => {
    return observable.filter((moneyEvent: MoneyChangeEvent) => {
        return (moneyEvent.value !== 0);
    });
};
