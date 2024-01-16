import { User } from '../user';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface UserState {
    maskUserName: boolean;
    currentUser: User | null;
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: null,
};

export const UserStore = signalStore(
    withState(initialState),
    withMethods((store) => ({
        toggleMaskUserName: () =>
            patchState(store, (state) => ({ maskUserName: !state.maskUserName })),
    }))
);
