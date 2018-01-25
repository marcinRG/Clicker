import {timerService} from './services/timer.service';
import {GeneratorComponent} from './components/GeneratorComponent/GeneratorComponent';
import {VaultComponent} from './components/VaultComponent';
import {ClickComponent} from './components/ClickComponent';
import {mathUtilsService} from './services/mathUtils.service';
import {GeneratorCollectionComponent} from './components/GeneratorCollectionComponent';
import {storageService} from './services/storage.service';
import {saveService} from './services/save.service';

let vault: VaultComponent;
const click: ClickComponent = new ClickComponent('.clicker');
const generatorCollection: GeneratorCollectionComponent = new GeneratorCollectionComponent('.generators-container');
generatorCollection.setTimer(timerService);
generatorCollection.setMathUtils(mathUtilsService);

storageService.config().then(storageService.read).then((val) => {
    const {value, totalSum, generatedPerSecond} = val[0];
    vault = new VaultComponent('.vault', value, totalSum, generatedPerSecond);
    generatorCollection.setVault(vault);
    addGeneratorCollection(val[1], generatorCollection);
    vault.addMoneyEventSource(click);
    initializeSaveService(vault, generatorCollection);
}, () => {
    initializeWithDefault();
    initializeSaveService(vault, generatorCollection);
});

const addGeneratorCollection = (array: any[], generatorCollection: GeneratorCollectionComponent) => {
    for (const elem of array) {
        const {amount, className, frequency, name, price, quantity, sumGenerated} = elem;
        const generatorComp = new GeneratorComponent(name, price, amount, quantity, frequency, sumGenerated, className);
        generatorCollection.addComponent(generatorComp);
    }
};

const initializeSaveService = (vault: VaultComponent, generatorCollection: GeneratorCollectionComponent) => {
    saveService.setVault(vault);
    saveService.setGeneratorCollection(generatorCollection);
};

const initializeWithDefault = () => {
    vault = new VaultComponent('.vault');
    vault.addMoneyEventSource(click);
    generatorCollection.setVault(vault);
    generatorCollection.addComponent(new GeneratorComponent('artificial arm', 20, 1, 0,
        10, 0, 'arm'));
    generatorCollection.addComponent(new GeneratorComponent('robot', 100, 1, 0,
        1, 0, 'robot'));
    generatorCollection.addComponent(new GeneratorComponent('assembly line', 1100, 8, 0,
        1, 0, 'assembly'));
    generatorCollection.addComponent(new GeneratorComponent('fission reactor', 12000, 47, 0,
        1, 0, 'reactor'));
    generatorCollection.addComponent(new GeneratorComponent('tokamak', 130000, 260, 0,
        1, 0, 'tokamak'));
};

