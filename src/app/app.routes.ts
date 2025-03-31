import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './home/page-not-found.component';
import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ProductEffects } from './products/state/product.effects';
import { productReducer } from './products/state/product.reducer';
import { userReducer } from './user/state/user.reducer';

export const appRoutes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [
            { path: 'welcome', component: WelcomeComponent },
            {
                path: 'products',
                // canActivate: [AuthGuard],
                loadComponent: () =>
                    import('./products/product-shell/product-shell.component').then(
                        (x) => x.ProductShellComponent
                    ),
                providers: [
                    provideState('products', productReducer),
                    provideEffects([ProductEffects]),
                ],
            },
            {
                path: 'login',
                loadComponent: () => import('./user/login.component').then((x) => x.LoginComponent),
                providers: [provideState('users', userReducer)],
            },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        ],
    },
    { path: '**', component: PageNotFoundComponent },
];
