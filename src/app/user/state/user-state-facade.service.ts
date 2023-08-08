import { Injectable, Signal } from '@angular/core';
import { UserPageActions } from './actions';
import { getMaskUserName } from './user.reducer';
import { Store } from '@mini-rx/signal-store';

@Injectable({
    providedIn: 'root',
})
export class UserStateFacadeService {
    maskUserName$: Signal<boolean> = this.store.select(getMaskUserName);

    constructor(private store: Store) {}

    maskUserName(): void {
        this.store.dispatch(UserPageActions.maskUserName());
    }
}
