import { Injectable, Signal } from '@angular/core';
import { User } from '../user';
import { patchState, signalState } from '@ngrx/signals';

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
export class UserStateFacadeService {
    state = signalState(initialState);

    maskUserName$: Signal<boolean> = this.state.maskUserName;

    maskUserName(): void {
        patchState(this.state, (state) => ({ maskUserName: !state.maskUserName }));
    }
}
