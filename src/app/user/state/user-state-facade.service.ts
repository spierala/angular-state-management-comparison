import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { createFeatureSelector, createSelector, FeatureStore } from 'mini-rx-store';

export interface UserState {
    maskUserName: boolean;
    currentUser: User | null;
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: null,
};

const getUserFeatureState = createFeatureSelector<UserState>();
const getMaskUserName = createSelector(getUserFeatureState, (state) => state.maskUserName);

@Injectable({
    providedIn: 'root',
})
export class UserStateFacadeService extends FeatureStore<UserState> {
    maskUserName$: Observable<boolean> = this.select(getMaskUserName);

    constructor() {
        super('users', initialState);
    }

    maskUserName(): void {
        this.setState((state) => ({ maskUserName: !state.maskUserName }));
    }
}
