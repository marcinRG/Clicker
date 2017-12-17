import {GeneratorComponent} from './utils/GeneratorComponent/GeneratorComponent';
import {Timer} from './utils/Timer';
import {VaultComponent} from './utils/VaultComponent';
import {ClickComponent} from './utils/ClickComponent';

const timer = new Timer();
const vault = new VaultComponent('.vault');

const click = new ClickComponent('.clicker');
vault.addSource(click);

const generatorContainer = document.querySelector('.generators-container');

const cursorComponent = new GeneratorComponent('cursor', 20, 1);
cursorComponent.addVault(vault);
cursorComponent.addTimer(timer);

const grandpaComponent = new GeneratorComponent('granpa', 100, 20);
grandpaComponent.addVault(vault);
grandpaComponent.addTimer(timer);

generatorContainer.appendChild(cursorComponent.getHtmlElement());
generatorContainer.appendChild(grandpaComponent.getHtmlElement());
