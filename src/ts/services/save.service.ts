import * as Noty from 'noty';
import {VaultComponent} from '../components/VaultComponent';
import {TimeChangeEvent} from '../model/events/TimeChangeEvent';
import {Observer} from 'rxjs/Observer';
import {GeneratorCollectionComponent} from '../components/GeneratorCollectionComponent';
import {ISubscribe} from '../model/interfaces/ISubscribe';
import {Observable} from 'rxjs/Observable';
import {createObserver, filterTimeEvents} from '../utils/RxUtils';
import {timerService} from './timer.service';
import {storageService} from './storage.service';

class SaveService {

    private vault: VaultComponent;
    private generatorCollection: GeneratorCollectionComponent;
    private timeEventObserver: Observer<TimeChangeEvent>;
    private saveAfter: number = 60;

    constructor() {
        this.timeEventObserver = createObserver<TimeChangeEvent>(this.nextTimeEvent,
            'error in SaveService, timeEventObserver');
        this.addTimer(timerService);
    }

    public setVault(vault: VaultComponent) {
        this.vault = vault;
    }

    public setGeneratorCollection(generatorCollection: GeneratorCollectionComponent) {
        this.generatorCollection = generatorCollection;
    }

    private nextTimeEvent = (timeEvent: TimeChangeEvent) => {
        if (timeEvent) {
            if ((this.vault && this.vault.dumpProperties) &&
                (this.generatorCollection && this.generatorCollection.dumpProperties)) {
                storageService.save(this.vault, this.generatorCollection).then(() => {
                    new Noty({
                        type: 'info',
                        text: 'Saved to local storage',
                        timeout: 6000,
                        progressBar: false,
                        layout: 'bottomCenter',
                    }).show();
                }, () => {
                    console.log('error occured while saving to localstorage');
                });
            }
        }
    }

    private addTimer(timer: ISubscribe<TimeChangeEvent>) {
        const observable: Observable<TimeChangeEvent> = timer.getObservable();
        filterTimeEvents(observable, this.saveAfter).subscribe(this.timeEventObserver);
    }
}

export const saveService = new SaveService();
