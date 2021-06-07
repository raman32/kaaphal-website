import { makeObservable, observable, runInAction } from 'mobx';
import { enableStaticRendering } from 'mobx-react';

enableStaticRendering(typeof window === 'undefined');

export class Store {
    user = null;
    constructor() {
        makeObservable(this, {
            // @ts-ignore
            user: observable,
        });
    }

    login = (user) => {
        runInAction(() => {
            this.user = user;
        });
    };

    logout = () => runInAction(() => (this.user = null));
}
