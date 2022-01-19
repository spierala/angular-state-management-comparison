import { ApplicationRef, ChangeDetectorRef, Injectable } from '@angular/core';
import { State } from 'ngx-bang';
import { User } from '../user';

export interface UserState {
    maskUserName: boolean;
    currentUser: User | null;
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: null,
};

@Injectable()
export class UserStateFacadeService extends State<UserState> {
    constructor(cdr: ChangeDetectorRef) {
        super(cdr, initialState);
    }

    maskUserName() {
        this.state.maskUserName = !this.snapshot.maskUserName;
    }
}
