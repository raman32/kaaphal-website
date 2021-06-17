import { makeObservable, observable, runInAction } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { makePersistable, stopPersisting } from 'mobx-persist-store';
enableStaticRendering(typeof window === 'undefined');

export class Store {
    user = null;
    isDark = false;
    constructor() {
        makeObservable(this, {
            // @ts-ignore
            user: observable,
            // @ts-ignore
            isDark: observable,
        });
        typeof window !== 'undefined' &&
            makePersistable(this, { name: 'isDark', properties: ['isDark'], storage: window.localStorage });
    }

    stopStore = () => {
        stopPersisting(this);
    }

    login = (user) => {
        runInAction(() => {
            this.user = user;
        });
    };

    logout = () => runInAction(() => (this.user = null));

    toggleDark = () => {
        runInAction(() => {
            this.isDark = true;
        });
    };

    toggleLight = () => {
        runInAction(() => {
            this.isDark = false;
        });
    };
}
