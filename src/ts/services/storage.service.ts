import * as Promise from 'bluebird';
import {AppSettings} from '../settings/AppSettings';
import * as localForage from 'localforage';
import {VaultComponent} from '../components/VaultComponent';
import {GeneratorComponentCollection} from '../components/GeneratorComponentCollection';

class StorageService {

    public config() {
        return new Promise((resolve, reject) => {
            try {
                localForage.config(AppSettings.storageConfig);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    public read(): Promise<any> {
        return Promise.all([this.readVault(), this.readCollection()]);
    }

    public save(vault: VaultComponent, generatorCollection: GeneratorComponentCollection): Promise<any> {
        return Promise.all([this.saveVault(vault), this.saveCollection(generatorCollection)]);
    }

    private readVault(): Promise<any> {
        return Promise.resolve(localForage.getItem('vault'));
    }

    private readCollection(): Promise<any> {
        return Promise.resolve(localForage.getItem('collection'));
    }

    private saveVault(vault: VaultComponent): Promise<any> {
        return Promise.resolve(localForage.setItem('vault', vault.dumpProperties()));
    }

    private saveCollection(genCollection: GeneratorComponentCollection): Promise<any> {
        return Promise.resolve(localForage.setItem('collection', genCollection.dumpProperties()));
    }
}

export const storageService: StorageService = new StorageService();
