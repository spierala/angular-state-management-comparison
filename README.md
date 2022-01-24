## State Management Bundle Size Comparison Angular

Checking the bundle sizes of different state management solutions with source-map-explorer.

The project is based on https://github.com/DeborahK/Angular-NgRx-GettingStarted and uses Angular 13.1

See the branches for the different setups.

Run `npm run build:stats` to let source-map-explorer calculate the bundle size.

## Results:

### [DIY State Service with RxJS BehaviorSubject](https://dev.to/angular/simple-yet-powerful-state-management-in-angular-with-rxjs-4f8g)

[combined] (365.93 KB)

### [NgRx Component Store](https://ngrx.io/guide/component-store) (13.0.2)

[combined] (373.44 KB)

### [MiniRx Store (Feature Store API)](https://mini-rx.io/) (3.0.1)

[combined] (374.75 KB)

### [Elf](https://ngneat.github.io/elf/) (1.0.2)

[combined] (379.21 KB)

Uses [ngneat/effects](https://github.com/ngneat/effects) for effects

### [MiniRx Store (Redux API)](https://mini-rx.io/) (3.0.1)

[combined] (381.49 KB)

Uses [ts-action](https://github.com/cartant/ts-action) for actions

### [NgRx Store, Effects](https://ngrx.io/) (13.0.2)

[combined] (393.41 KB)

Uses [@ngrx/effects](https://ngrx.io/guide/effects) for effects

### [NGXS](https://www.ngxs.io/) (3.7.3)

[combined] (395.64 KB)

FYI: currently no effects with RxJS flattening operators implemented.

### [Akita](https://datorama.github.io/akita/) (7.1.1)

[combined] (402.6 KB)

Uses [ngneat/effects](https://github.com/ngneat/effects) for effects
