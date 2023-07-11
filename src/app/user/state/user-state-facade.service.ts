import { Injectable, Signal } from '@angular/core';
import { User } from '../user';
import { ComponentStore } from '@ngrx/component-store';

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
export class UserStateFacadeService extends ComponentStore<UserState> {
    maskUserName$: Signal<boolean> = this.selectSignal((state) => state.maskUserName);

    constructor() {
        super(initialState);
    }

    maskUserName(): void {
        this.patchState((state) => ({ maskUserName: !state.maskUserName }));
    }
}
