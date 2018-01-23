import {timerService} from './services/timer.service';
import {GeneratorComponent} from './components/GeneratorComponent/GeneratorComponent';
import {VaultComponent} from './components/VaultComponent';
import {ClickComponent} from './components/ClickComponent';
import {mathUtilsService} from './services/mathUtils.service';

const vault = new VaultComponent('.vault');
const gen = new GeneratorComponent('artificial arm', 20, 1, 0,
    10, 0, 'arm');
gen.setMathUtils(mathUtilsService);
gen.addVault(vault);
gen.addTimer(timerService);
const htmlElem = gen.getHtmlElement();
const container = document.querySelector('.generators-container');
container.appendChild(htmlElem);
const click: ClickComponent = new ClickComponent('.clicker');
vault.addMoneyEventSource(click);
