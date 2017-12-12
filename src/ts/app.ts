// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/observable/fromEvent';
// import 'rxjs/add/observable/interval';
// import {Observer} from 'rxjs/Observer';
//
// const button = document.querySelector('.button');
// Observable.fromEvent(button, 'click')
//     .subscribe(() => console.log('Clicked!'));
// const observable = Observable.interval(1000);
//
// const source = Observable.create((observer) => {
//     console.log(observable);
//     observable.subscribe((val) => {
//         console.log(val);
//         observer.next({
//             number: val,
//             name: '1sec',
//         });
//         if (val % 5 === 0) {
//             observer.next({
//                 number: val,
//                 name: '5sec',
//             });
//         }
//         if (val % 10 === 0) {
//             observer.next({
//                 number: val,
//                 name: '10sec',
//             });
//         }
//     });
// });
//
// class MyObserver implements Observer<any> {
//     public next(value: any) {
//         console.log(value);
//         if (value.name) {
//             console.log(value.name);
//         }
//     }
//
//     public error(err: any) {
//         console.log('error ocurred' + err);
//     }
//
//     public complete() {
//         console.log('completed');
//     }
// }
//
// source.subscribe(new MyObserver());

//import {Timer} from './utils/Timer';
//import {Observer} from 'rxjs/Observer';

//console.log('start');
//const timer = new Timer();
// class MyObserver implements Observer<any> {
//     public next(value: any) {
//         console.log('next');
//         console.log(value);
//         // console.log(value.eventType);
//         // console.log(value.value);
//     }
//
//     public error(err: any) {
//         console.log('error ocurred' + err);
//     }
//
//     public complete() {
//         console.log('completed');
//     }
// }
//
// timer.subscribe(new MyObserver());
