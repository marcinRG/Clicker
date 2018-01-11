// import {GeneratorComponent} from './components/GeneratorComponent/GeneratorComponent';
// import {VaultComponent} from './components/VaultComponent';
// import {ClickComponent} from './components/ClickComponent';
// import {mathUtilsService} from './services/mathUtils.service';
// import {GeneratorComponentCollection} from './components/GeneratorComponentCollection';
// import 'rxjs/add/observable/fromPromise';
// import {timerService} from './services/timer.service';
// import {storageService} from './services/storage.service';
// import {saveService} from './services/save.service';
//
// let vault: VaultComponent;
// const click: ClickComponent = new ClickComponent('.clicker');
// const generatorCollection: GeneratorComponentCollection = new GeneratorComponentCollection('.generators-container');
// generatorCollection.setTimer(timerService);
// generatorCollection.setMathUtils(mathUtilsService);
//
// storageService.config().then(() => {
//     return storageService.read();
// }).then((val) => {
//     console.log('succes');
//     if (val[0]) {
//         const {value, totalSum, generatedPerSecond} = val[0];
//         vault = new VaultComponent('.vault', value, totalSum, generatedPerSecond);
//     } else {
//         vault = new VaultComponent('.vault');
//     }
//     generatorCollection.setVault(vault);
//     if (val[1]) {
//         addGeneratorCollection(val[1], generatorCollection);
//     } else {
//         generatorCollectionDefaultValues();
//     }
//     vault.addMoneySource(click);
//     initializeSaveService(vault, generatorCollection);
// }, () => {
//     console.log('failure');
//     initializeWithDefault();
//     initializeSaveService(vault, generatorCollection);
// });
//
// const addGeneratorCollection = (array: any[], generatorCollection: GeneratorComponentCollection) => {
//     for (const elem of array) {
//         const {amount, className, frequency, name, price, quantity, sumGenerated} = elem;
//         const generatorComp = new GeneratorComponent(name, price, amount, quantity, frequency, sumGenerated, className);
//         generatorCollection.addComponent(generatorComp);
//     }
// };
//
// const initializeSaveService = (vault: VaultComponent, generatorCollection: GeneratorComponentCollection) => {
//     saveService.setVault(vault);
//     saveService.setGeneratorCollection(generatorCollection);
// };
//
// const initializeWithDefault = () => {
//     vault = new VaultComponent('.vault');
//     vault.addMoneySource(click);
//     generatorCollection.setVault(vault);
//     generatorCollectionDefaultValues();
// };
//
// const generatorCollectionDefaultValues = () => {
//     generatorCollection.addComponent(new GeneratorComponent('artificial arm', 20, 1, 0,
//         10, 0, 'arm'));
//     generatorCollection.addComponent(new GeneratorComponent('robot', 100, 1, 0,
//         1, 0, 'robot'));
//     generatorCollection.addComponent(new GeneratorComponent('assembly line', 1100, 8, 0,
//         1, 0, 'assembly'));
//     generatorCollection.addComponent(new GeneratorComponent('fission reactor', 12000, 47, 0,
//         1, 0, 'reactor'));
//     generatorCollection.addComponent(new GeneratorComponent('tokamak', 130000, 260, 0,
//         1, 0, 'tokamak'));
// };

import {VaultNewComponent} from './components/VaultComponent';
import {Observer} from 'rxjs/Observer';
import {TimerNew} from './components/Timer';
import {Observable} from 'rxjs/Observable';
import {ChangeEvent} from './model/event/ChangeEvent';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import {MoneyChangeEvent} from './model/event/MoneyChangeEvent';

console.log('app start');
//const timer = new TimerNew();
const observable = Observable.create((observer) => {
    observer.next(new ChangeEvent<number>('ClicksPerSecond', 25));
    observer.next(new ChangeEvent<number>('ClicksPerSecond', 37));
    observer.next(new ChangeEvent<number>('ClicksPerSecond', 49));
});

const observable2: Observable<any> = Observable.from([0, 1, 2, 3, 4, 5])
    .map((val) => {
        return new MoneyChangeEvent(val);
    });
const vaultNew = new VaultNewComponent('.vault');

const observer2: Observer<any> = {
    next: (val) => {
        console.log('recived ob2');
    },
    error: (err) => {
        console.error('ob2 error: ' + err);
    },
    complete: () => console.log('o2 completed'),

};
console.log('start');
observable2.subscribe(vaultNew);
observable.subscribe(vaultNew);
vaultNew.subscribe(observer2);

console.log('end');
