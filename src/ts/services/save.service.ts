import {VaultComponent} from '../components/VaultComponent';
import {GeneratorComponentCollection} from '../components/GeneratorComponentCollection';
import {ISubscribe} from '../model/interfaces/ISubscribe';
import {Observable} from 'rxjs/Observable';
import {createObserver, filterTimeEvents} from '../utils/RxUtils';
import {TimeEvent} from '../model/events/TimeEvent';
import {Observer} from 'rxjs/Observer';
import {storageService} from './storage.service';
import {timerService} from './timer.service';

class SaveService {

    private vault: VaultComponent;
    private generatorCollection: GeneratorComponentCollection;
    private timeEventObserver: Observer<TimeEvent>;
    private saveAfter: number = 60;
    private nextTimeEvent = (e: TimeEvent) => {
        if (e) {
            if ((this.vault && this.vault.dumpProperties) &&
                (this.generatorCollection && this.generatorCollection.dumpProperties)) {
                storageService.save(this.vault, this.generatorCollection).then(() => {
                    console.log('saved to local storage');
                }, () => {
                    console.log('error occured while saving to localstorage');
                });
            }
        }
    };

    constructor() {
        this.timeEventObserver = createObserver<TimeEvent>(this.nextTimeEvent,
            'error in SaveService, timeEventObserver creator');
        this.addTimer(timerService);
    }

    public setVault(vault: VaultComponent) {
        this.vault = vault;
    }

    public setGeneratorCollection(generatorCollection: GeneratorComponentCollection) {
        this.generatorCollection = generatorCollection;
    }

    private addTimer(timer: ISubscribe<TimeEvent>) {
        const observable: Observable<TimeEvent> = timer.getObservable();
        filterTimeEvents(observable, this.saveAfter).subscribe(this.timeEventObserver);
    }
}

export const saveService = new SaveService();