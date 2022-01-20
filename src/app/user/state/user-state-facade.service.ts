import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    maskUserName$: Observable<boolean> = this.select((state) => state.maskUserName);

    constructor() {
        super(initialState);
    }

    maskUserName(): void {
        this.setState({ maskUserName: !this.state.maskUserName });
    }
}
