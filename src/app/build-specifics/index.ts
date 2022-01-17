import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

export const extModules = [
    AkitaNgDevtools.forRoot({
        maxAge: 25,
    }),
];
