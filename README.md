## State Management Bundle Size Comparison Angular

Checking the bundle sizes of different state management solutions with source-map-explorer.

The project is based on https://github.com/DeborahK/Angular-NgRx-GettingStarted and uses Angular 14.2

See the branches for the different setups.

Run `npm run build:stats` to let source-map-explorer calculate the bundle size.

## Results:

### [DIY State Service with RxJS BehaviorSubject](https://dev.to/angular/simple-yet-powerful-state-management-in-angular-with-rxjs-4f8g)

[combined] (376.16 KB)

### [MiniRx Store (Feature Store API)](https://mini-rx.io/) (4.0.0-rc.0)

[combined] (383.24 KB)

### [NgRx Component Store](https://ngrx.io/guide/component-store) (14.3.1)

[combined] (384.58 KB)

### [MiniRx Store (Redux API)](https://mini-rx.io/) (4.0.0-rc.0)

[combined] (388.03 KB)

Uses [ts-action](https://github.com/cartant/ts-action) for actions

### [Elf](https://ngneat.github.io/elf/) (2.1.0)

[combined] (389.72 KB)

Uses [ngneat/effects](https://github.com/ngneat/effects) for effects

### [NGXS](https://www.ngxs.io/) (3.7.5)

[combined] (399.25 KB)

FYI: currently no effects with RxJS flattening operators implemented.

### [NgRx Store, Effects](https://ngrx.io/) (14.3.1)

[combined] (403.82 KB)

Uses [@ngrx/effects](https://ngrx.io/guide/effects) for effects

### [Akita](https://datorama.github.io/akita/) (7.1.1)

[combined] (413.01 KB)

Uses [ngneat/effects](https://github.com/ngneat/effects) for effects
