import { Injectable, Signal } from '@angular/core';
import { StateService } from 'src/app/state.service';
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
export class UserStateFacadeService extends StateService<UserState> {
    maskUserName: Signal<boolean> = this.select((state) => state.maskUserName);

    constructor() {
        super(initialState);
    }

    toggleMaskUserName(): void {
        this.setState({ maskUserName: !this.state.maskUserName });
    }
}
