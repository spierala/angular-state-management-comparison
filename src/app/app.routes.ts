import { Routes } from '@angular/router';

import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';

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
            },
            {
                path: 'login',
                loadComponent: () => import('./user/login.component').then((x) => x.LoginComponent),
            },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        ],
    },
    { path: '**', component: PageNotFoundComponent },
];
