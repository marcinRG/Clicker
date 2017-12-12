import {Observer} from 'rxjs/Observer';

export class ClickComponent implements Observer<any> {

    public next(value: any) {
        console.log(value);
        if (value.name) {
            console.log(value.name);
        }
    }

    public error(err: any) {
        console.log('error ocurred' + err);
    }

    public complete() {
        console.log('completed');
    }

    public addTimer(timer:any) {
       timer.subscribe(this);
    }

    public addClickElem(clickElem: any) {
        clickElem.subscribe(this);
    }

}
