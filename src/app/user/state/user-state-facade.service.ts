import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPageActions } from './actions';
import { Action, Select, Selector, State, StateContext, Store } from '@ngxs/store';
import { User } from '../user';
import { MaskUserName } from './actions/user-page.actions';

export interface UserState {
    maskUserName: boolean;
    currentUser: User | null;
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: null,
};

@State<UserState>({
    name: 'user',
    defaults: initialState,
})
@Injectable({
    providedIn: 'root',
})
export class UserStateFacadeService {
    @Select(UserStateFacadeService.getMaskUserName) maskUserName$: Observable<boolean>;

    @Selector()
    static getMaskUserName(state: UserState) {
        return state.maskUserName;
    }

    @Selector()
    static getCurrentUser(state: UserState) {
        return state.currentUser;
    }

    @Action(MaskUserName)
    private _toggleProductCode(ctx: StateContext<UserState>) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            maskUserName: !state.maskUserName,
        });
    }

    constructor(private store: Store) {}

    maskUserName(): void {
        this.store.dispatch(new MaskUserName());
    }
}
