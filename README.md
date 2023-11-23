## State Management Bundle Size Comparison Angular

Checking the bundle sizes of different state management solutions with [source-map-explorer](https://www.npmjs.com/package/source-map-explorer).

The project is based on https://github.com/DeborahK/Angular-NgRx-GettingStarted.

See the branches for the different setups.

Run `npm run build:stats` to let source-map-explorer calculate the bundle size.

## Results

### Angular 17.0.3

| Library                                   | Version     | Bundle Size | Comments                                                             | Branch                                                                                                                                                                                              |
|-------------------------------------------|-------------|-------------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DIY RxJS State Service                    | -           | 377.05 KB   |                                                                      | [ng@17.0.3--diy-rxjs-state-service](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--diy-rxjs-state-service)                                                       |
| DIY Signal State Service                  | -           | 377.20 KB   |                                                                      | [ng@17.0.3--diy-signal-state-service](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--diy-signal-state-service)                                                   |
| Elf                                       | 2.4.0       | 379.48 KB   | Uses [ngneat/effects](https://github.com/ngneat/effects) for effects | [ng@17.0.3--elf@2.4](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--elf%402.4)                                                                                   |
| MiniRx Store (Component Store API)        | 5.1.0       | 380.53 KB   |                                                                      | [ng@17.0.3--mini-rx-store@5.1--component-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--mini-rx-store%405.1--component-store-api)                     |
| MiniRx Store (Feature Store API)          | 5.1.0       | 383.53 KB   |                                                                      | [ng@17.0.3--mini-rx-store@5.1--feature-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--mini-rx-store%405.1--feature-store-api)                         |
| MiniRx Signal Store (Component Store API) | 0.0.21      | 386.69 KB   |                                                                      | [ng@17.0.3--mini-rx-signal-store@0.0.21--component-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--mini-rx-signal-store%400.0.21--component-store-api) |
| MiniRx Signal Store (Feature Store API)   | 0.0.21      | 387.11 KB   |                                                                      | [ng@17.0.3--mini-rx-signal-store@0.0.21--feature-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--mini-rx-signal-store%400.0.21--feature-store-api)     |
| MiniRx Signal Store (Redux Store API)     | 0.0.21      | 388.06 KB   | Uses [ts-action](https://github.com/cartant/ts-action) for actions   | [ng@17.0.3--mini-rx-signal-store@0.0.21--redux-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--mini-rx-signal-store%400.0.21--redux-store-api)         |
| NgRx Component Store                      | 17.0.0-rc.0 | 388.93 KB   |                                                                      | [ng@17.0.3--ngrx-component-store@17.0.0-rc.0](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--ngrx-component-store%4017.0.0-rc.0)                                 |
| MiniRx Store (Redux Store API)            | 5.1.0       | 390.55 KB   | Uses [ts-action](https://github.com/cartant/ts-action) for actions   | [ng@17.0.3--mini-rx-store@5.1--redux-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--mini-rx-store%405.1--redux-store-api)                             |
| Akita                                     | 8.0.1       | 401.79 KB   |                                                                      | [ng@17.0.3--akita@8.0.1 ](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--akita%408.0.1)                                                                          |
| NgRx Store                                | 17.0.0-rc.0 | 408.18 KB   | Uses [ngrx/effects](https://ngrx.io/guide/effects) for effects       | [ng@17.0.3--ngrx-store@17.0.0-rc.0](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--ngrx-store%4017.0.0-rc.0)                                                     |

### Angular 16.1

| Library                                   | Version | Bundle Size | Comments                                                             | Branch                                                                                                                                                                                        |
|-------------------------------------------|---------|-------------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DIY Signal State Service                  | -       | 371.98 KB   |                                                                      | [ng@16.1--diy-signal-state-service](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--diy-signal-state-service)                                                 |
| DIY RxJS State Service                    | -       | 372.08 KB   |                                                                      | [ng@16.1--diy-rxjs-state-service](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--diy-rxjs-state-service)                                                     |
| Elf                                       | 2.3.2   | 374.59 KB   | Uses [ngneat/effects](https://github.com/ngneat/effects) for effects | [ng@16.1--elf@2.3](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--elf%402.3)                                                                                 |
| MiniRx Store (Component Store API)        | 5.1.0   | 378.08 KB   |                                                                      | [ng@16.1--mini-rx-store@5.1--component-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-store%405.1--component-store-api)                   |
| MiniRx Store (Feature Store API)          | 5.1.0   | 378.72 KB   |                                                                      | [ng@16.1--mini-rx-store@5.1--feature-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-store%405.1--feature-store-api)                       |
| MiniRx Signal Store (Component Store API) | 0.0.5   | 380.53 KB   |                                                                      | [ng@16.1--mini-rx-signal-store@0.0.5--component-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-signal-store%400.0.5--component-store-api) |
| MiniRx Signal Store (Feature Store API)   | 0.0.5   | 380.97 KB   |                                                                      | [ng@16.1--mini-rx-signal-store@0.0.5--feature-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-signal-store%400.0.5--feature-store-api)     |
| MiniRx Signal Store (Redux Store API)     | 0.0.5   | 382.54 KB   | Uses [ts-action](https://github.com/cartant/ts-action) for actions   | [ng@16.1--mini-rx-signal-store@0.0.5--redux-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-signal-store%400.0.5--redux-store-api)         |
| NgRx Component Store (select API)         | 16.1.0  | 383.98 KB   |                                                                      | [ng@16.1--ngrx-component-store@16.1](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--ngrx-component-store%4016.1)                                             |
| MiniRx Store (Redux Store API)            | 5.1.0   | 385.49 KB   | Uses [ts-action](https://github.com/cartant/ts-action) for actions   | [ng@16.1--mini-rx-store@5.1--redux-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-store%405.1--redux-store-api)                           |
| Akita                                     | 8.0.1   | 396.68 KB   |                                                                      | [ng@16.1--akita@8.0](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--akita%408.0)                                                                             |
| NgRx Store                                | 16.1.0  | 402.90 KB   | Uses [ngrx/effects](https://ngrx.io/guide/effects) for effects       | [ng@16.1--ngrx-store@16.1](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--ngrx-store%4016.1)                                                                 |

## Contributing

You are welcome to add your favourite state management library as well!

1. Fork and clone the repo
2. Create a branch based on master (or based on another branch with a familiar state management lib (e.g. "ng@16.1--akita@8.0")
3. specify the Angular version and the state management lib version in the branch name: e.g. "ng@16.1--ngrx-store@16.1")
4. Refactor to your favourite state management solution (to have equal conditions: try to follow the facade pattern for the state management code, pls use something for effects)
5. Run `npm run build:stats` to check the bundle size
6. Create a PR and add the bundle size in the PR description
7. I will review your PR and add your results to the README on master
8. The MR will be merged to a branch for reference in this repo. The branch will be linked in this README
