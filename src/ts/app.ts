import {GeneratorComponent} from './components/GeneratorComponent/GeneratorComponent';
import {Timer} from './components/Timer';
import {VaultComponent} from './components/VaultComponent';
import {ClickComponent} from './components/ClickComponent';
import {mathUtilsService} from './services/mathUtils.service';
import {GeneratorComponentCollection} from './components/GeneratorComponentCollection';

const timer = new Timer();
const vault = new VaultComponent('.vault');
const click = new ClickComponent('.clicker');
vault.addMoneySource(click);
const generatorCollection = new GeneratorComponentCollection('.generators-container');
generatorCollection.setTimer(timer);
generatorCollection.setVault(vault);
generatorCollection.setMathUtils(mathUtilsService);
const armComponent = new GeneratorComponent('artificial arm', 20, 1, 0,
    10, 0, 'arm');
const robotComponent = new GeneratorComponent('robot', 100, 1, 0,
    1, 0, 'robot');
const assemblyLineComponent = new GeneratorComponent('assembly line', 1100, 8, 0,
    1, 0, 'assembly');
const reactorComponent = new GeneratorComponent('fission reactor', 12000, 47, 0,
    1, 0, 'assembly');
const tokamakComponent = new GeneratorComponent('tokamak', 130000, 260, 0,
    1, 0, 'assembly');
generatorCollection.addComponent(armComponent);
generatorCollection.addComponent(robotComponent);
generatorCollection.addComponent(assemblyLineComponent);
generatorCollection.addComponent(reactorComponent);
generatorCollection.addComponent(tokamakComponent);