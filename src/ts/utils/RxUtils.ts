import {Observer} from 'rxjs/Observer';

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
