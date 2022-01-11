import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { UserStateFacadeService } from './state/user-state-facade.service';

const userRoutes: Routes = [{ path: 'login', component: LoginComponent }];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(userRoutes),
        NgxsModule.forFeature([UserStateFacadeService]),
    ],
    declarations: [LoginComponent],
})
export class UserModule {}
