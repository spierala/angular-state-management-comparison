import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatefulDirectiveModule } from 'ngx-bang/stateful';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';

const userRoutes: Routes = [{ path: 'login', component: LoginComponent }];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(userRoutes),
        StatefulDirectiveModule,
        StatefulDirectiveModule,
    ],
    declarations: [LoginComponent],
})
export class UserModule {}
