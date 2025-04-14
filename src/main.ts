import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { extModules } from './app/build-specifics';
import { ProductData } from './app/products/product-data';
import { environment } from './environments/environment';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes),
        provideHttpClient(withInterceptorsFromDi()),
        provideStore({}),
        provideEffects([]),
        importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(ProductData), extModules),
    ],
}).catch((err) => console.error(err));
