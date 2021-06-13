import { makeObservable, observable, runInAction } from 'mobx';
import { enableStaticRendering } from 'mobx-react';

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
