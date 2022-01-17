## State Management Bundle Size Comparison Angular

Checking the bundle sizes of different state management solutions with source-map-explorer.

The project is based on https://github.com/DeborahK/Angular-NgRx-GettingStarted and uses Angular 13.1

See the branches for the different setups.

Run `npm run build:stats` to let source-map-explorer calculate the bundle size.

## Results:

### [MiniRx Store](https://mini-rx.io/) (3.0.1)

[combined] (381.49 KB)

### [NgRx Store, Effects](https://ngrx.io/) (13.0.2)

[combined] (393.41 KB)

### [NGXS](https://www.ngxs.io/) (3.7.3)

[combined] (395.64 KB)

FYI: currently no effects with RxJS flattening operators implemented.

### [Akita](https://datorama.github.io/akita/) (7.1.1)

Uses [ngneat/effects](https://github.com/ngneat/effects) for effects

[combined] (402.6 KB)
