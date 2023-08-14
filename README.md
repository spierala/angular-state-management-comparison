## State Management Bundle Size Comparison Angular

Checking the bundle sizes of different state management solutions with [source-map-explorer](https://www.npmjs.com/package/source-map-explorer).

The project is based on https://github.com/DeborahK/Angular-NgRx-GettingStarted.

See the branches for the different setups.

Run `npm run build:stats` to let source-map-explorer calculate the bundle size.

## Results

### Angular 16.1

| Library                                   | Version | Bundle Size | Comments                                                             | Branch                                                                                                                                                                                        |
| ----------------------------------------- | ------- | ----------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DIY RxJS State Service                    | -       | 372.08 KB   |                                                                      | [ng@16.1--diy-rxjs-state-service](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--diy-rxjs-state-service)                                                     |
| Elf                                       | 2.3.2   | 374.59 KB   | Uses [ngneat/effects](https://github.com/ngneat/effects) for effects | [ng@16.1--elf@2.3](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--elf%402.3)                                                                                 |
| MiniRx Store (Component Store API)        | 5.1.0   | 378.08 KB   |                                                                      | [ng@16.1--mini-rx-store@5.1--component-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-store%405.1--component-store-api)                   |
| MiniRx Store (Feature Store API)          | 5.1.0   | 378.72 KB   |                                                                      | [ng@16.1--mini-rx-store@5.1--feature-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-store%405.1--feature-store-api)                       |
| MiniRx Signal Store (Component Store API) | 0.0.5   | 380.53 KB   |                                                                      | [ng@16.1--mini-rx-signal-store@0.0.5--component-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-signal-store%400.0.5--component-store-api) |
| MiniRx Signal Store (Feature Store API)   | 0.0.5   | 380.97 KB   |                                                                      | [ng@16.1--mini-rx-signal-store@0.0.5--feature-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-signal-store%400.0.5--feature-store-api)     |
| NgRx Component Store (selectSignal API)   | 16.1.0  | 382.34 KB   |                                                                      | [ng@16.1--ngrx-component-store@16.1--select-signal-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--ngrx-component-store%4016.1--select-signal-api)       |
| MiniRx Signal Store (Redux Store API)     | 0.0.5   | 382.54 KB   | Uses [ts-action](https://github.com/cartant/ts-action) for actions   | [ng@16.1--mini-rx-signal-store@0.0.5--redux-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-signal-store%400.0.5--redux-store-api)         |
| NgRx Component Store (select API)         | 16.1.0  | 383.98 KB   |                                                                      | [ng@16.1--ngrx-component-store@16.1](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--ngrx-component-store%4016.1)                                             |
| MiniRx Store (Redux Store API)            | 5.1.0   | 385.49 KB   | Uses [ts-action](https://github.com/cartant/ts-action) for actions   | [ng@16.1--mini-rx-store@5.1--redux-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-store%405.1--redux-store-api)                           |
| Akita                                     | 8.0.1   | 396.68 KB   |                                                                      | [ng@16.1--akita@8.0](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--akita%408.0)                                                                             |
| NgRx Store                                | 16.1.0  | 402.90 KB   | Uses [ngrx/effects](https://ngrx.io/guide/effects) for effects       | [ng@16.1--ngrx-store@16.1](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--ngrx-store%4016.1)                                                                 |

## Contributing

You are welcome to add your favourite state management library as well!

1. Fork and clone the repo
2. Create a branch based on master (specify the Angular version and the state management lib version in the branch name: e.g. "ng@16.1--ngrx-store@16.1")
3. Refactor to your favourite state management solution (to have equal conditions: try to follow the facade pattern for the state management code, pls use something for effects)
4. Run `npm run build:stats` to check the bundle size
5. Create a PR and add the bundle size in the PR description
6. I will review your PR and add your results to the README on master
7. The MR will be merged to a branch for reference in this repo. The branch will be linked in this README
