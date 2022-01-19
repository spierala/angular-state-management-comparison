import { Injectable } from '@angular/core';
import { AdaptCommon, createAdapter, Source } from '@state-adapt/core';
import { User } from '../user';

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
export class UserStoreService {
    maskUserName$ = new Source<void>('maskUserName$');

    adapter = createAdapter<UserState>()({
        maskUserName: (state) => ({ ...state, maskUserName: !state.maskUserName }),
        selectors: { userNameMasked: (state) => state.maskUserName },
    });
    store = this.adapt.init(['User', this.adapter, initialState], {
        maskUserName: this.maskUserName$,
    });

    userNameMasked$ = this.store.userNameMasked$;

    constructor(private adapt: AdaptCommon<any>) {}
}
