import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { createState, select, Store, withProps } from '@ngneat/elf';

export interface UserState {
    maskUserName: boolean;
    currentUser: User | null;
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: null,
};

const { state, config } = createState(withProps<UserState>(initialState));
const userStore = new Store({ state, name: 'user', config });

@Injectable({
    providedIn: 'root',
})
export class UserStateFacadeService {
    maskUserName$: Observable<boolean> = userStore.pipe(select((state) => state.maskUserName));

    maskUserName(): void {
        userStore.update((state) => ({ ...state, maskUserName: !state.maskUserName }));
    }
}
