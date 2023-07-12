import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { ComponentStore } from 'mini-rx-store';

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
    maskUserName$: Observable<boolean> = this.select((state) => state.maskUserName);

    constructor() {
        super(initialState);
    }

    maskUserName(): void {
        this.setState((state) => ({ maskUserName: !state.maskUserName }));
    }
}
