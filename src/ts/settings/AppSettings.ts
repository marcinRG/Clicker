import * as localForage from 'localforage';

export class AppSettings {
    public static storageConfig = {
        driver: localForage.INDEXEDDB,
        name: 'ClickerApp',
        version: 1.0,
        size: 4980736,
        storeName: 'baza_Clicker',
        description: 'baza lokalna apki Clicker',
    };
}
