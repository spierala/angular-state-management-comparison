import { Injectable } from '@angular/core';
import { snapshot, state } from 'ngx-bang';
import { User } from '../user';

export interface UserState {
    maskUserName: boolean;
    currentUser: User | null;
}

@Injectable()
export class UserStateFacadeService {
    readonly state = state<UserState>({
        maskUserName: true,
        currentUser: null,
    });

    maskUserName() {
        this.state.maskUserName = !snapshot(this.state).maskUserName;
    }
}
