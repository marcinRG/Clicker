import {timerService} from './services/timer.service';
import {GeneratorComponent} from './components/GeneratorComponent/GeneratorComponent';
import {VaultComponent} from './components/VaultComponent';
import {ClickComponent} from './components/ClickComponent';
import {mathUtilsService} from './services/mathUtils.service';
import {Observer} from 'rxjs/Observer';
import {GeneratorCollectionComponent} from './components/GeneratorCollectionComponent';

const vault = new VaultComponent('.vault');
const arm = new GeneratorComponent('artificial arm', 20, 1, 0,
    10, 0, 'arm');
const click: ClickComponent = new ClickComponent('.clicker');
vault.addMoneyEventSource(click);

const generatorCollection: GeneratorCollectionComponent = new GeneratorCollectionComponent('.generators-container');
generatorCollection.setTimer(timerService);
generatorCollection.setMathUtils(mathUtilsService);
generatorCollection.setVault(vault);
generatorCollection.addComponent(arm);
generatorCollection.addComponent(new GeneratorComponent('robot', 100, 1, 0,
    1, 0, 'robot'));
generatorCollection.addComponent(new GeneratorComponent('assembly line', 1100, 8, 0,
    1, 0, 'assembly'));
generatorCollection.addComponent(new GeneratorComponent('fission reactor', 12000, 47, 0,
    1, 0, 'reactor'));
generatorCollection.addComponent(new GeneratorComponent('tokamak', 130000, 260, 0,
    1, 0, 'tokamak'));
