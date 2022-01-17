import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { Query, Store, StoreConfig } from '@datorama/akita';

export interface UserState {
    maskUserName: boolean;
    currentUser: User | null;
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: null,
};

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
    maskUserName$: Observable<boolean> = this.select((state) => state.maskUserName);

    constructor(store: UserStateFacadeService) {
        super(store);
    }
}

@StoreConfig({ name: 'user' })
@Injectable({
    providedIn: 'root',
})
export class UserStateFacadeService extends Store<UserState> {
    constructor() {
        super(initialState);
    }

    maskUserName(): void {
        this.update((state) => ({ maskUserName: !state.maskUserName }));
    }
}
