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

import {Timer} from './components/Timer';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import {ClickComponent} from './components/ClickComponent';
import {GeneratorComponentCollection} from './components/GeneratorComponentCollection';
import {VaultComponent} from './components/VaultComponent';
import {mathUtilsService} from './services/mathUtils.service';
import {GeneratorComponent} from './components/GeneratorComponent/GeneratorComponent';
import {Observer} from 'rxjs/Observer';

console.log('app start');
//const timer = new Timer();
const click: ClickComponent = new ClickComponent('.clicker');
// const obs: Observer<any> = {
//     next: (value: any) => {
//         this.generatorEventWrapper.next(value);
//         this.generatorHTMLElement.next(value);
//     },
//     error: (err: any) => {
//         console.log('error' + err);
//     },
//     complete: () => {
//         console.log('completed');
//     },
// };
const observer2: Observer<any> = {
    next: (val) => {
        console.log('recived ob2');
    },
    error: (err) => {
        console.error('ob2 error: ' + err);
    },
    complete: () => console.log('o2 completed'),

};

click.subscribe(observer2);
//const generatorCollection: GeneratorComponentCollection = new GeneratorComponentCollection('.generators-container');
//const vault = new VaultComponent('.vault');
//click.subscribe(vault);
//generatorCollection.setTimer(timer);
//generatorCollection.setMathUtils(mathUtilsService);
//generatorCollection.setVault(vault);
//generatorCollectionDefaultValues(generatorCollection);
console.log('app end');

// function generatorCollectionDefaultValues(generatorCollection: GeneratorComponentCollection) {
//     generatorCollection.addComponent(new GeneratorComponent('artificial arm', 20, 1, 0,
//         10, 0, 'arm'));
//     /*    generatorCollection.addComponent(new GeneratorComponent('robot', 100, 1, 0,
//             1, 0, 'robot'));
//         generatorCollection.addComponent(new GeneratorComponent('assembly line', 1100, 8, 0,
//             1, 0, 'assembly'));
//         generatorCollection.addComponent(new GeneratorComponent('fission reactor', 12000, 47, 0,
//             1, 0, 'reactor'));
//         generatorCollection.addComponent(new GeneratorComponent('tokamak', 130000, 260, 0,
//             1, 0, 'tokamak'));*/
// }
