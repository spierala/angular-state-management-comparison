import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

export const extModules = [
    NgxsReduxDevtoolsPluginModule.forRoot({
        maxAge: 25,
    }),
];
