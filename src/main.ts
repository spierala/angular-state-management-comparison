import { enableProdMode, ApplicationRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { elfDevTools } from './app/build-specifics';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then((moduleRef) => {
        elfDevTools({
            postTimelineUpdate: () => moduleRef.injector.get(ApplicationRef).tick(),
        });
    })
    .catch((err) => console.error(err));
