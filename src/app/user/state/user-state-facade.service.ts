import { Injectable, Signal } from '@angular/core';
import { User } from '../user';
import { FeatureStore } from '@mini-rx/signal-store';

export interface UserState {
    maskUserName: boolean;
    currentUser: User | null;
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: null,
};

@Injectable({
    providedIn: 'root',
})
export class UserStateFacadeService extends FeatureStore<UserState> {
    maskUserName$: Signal<boolean> = this.select((state) => state.maskUserName);

    constructor() {
        super('users', initialState);
    }

    maskUserName(): void {
        this.update((state) => ({ maskUserName: !state.maskUserName }));
    }
}
