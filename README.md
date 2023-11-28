## State Management Bundle Size Comparison Angular

Checking the **app** bundle sizes for different state management solutions with [source-map-explorer](https://www.npmjs.com/package/source-map-explorer).

The project is based on https://github.com/DeborahK/Angular-NgRx-GettingStarted.

See the branches for the different setups.

Run `npm run build:stats` to let source-map-explorer calculate the **prod** bundle size.

## Results

The measured size represents the **total size of the app**, which is build with **production** configuration.

### Angular 17.0.3

| Library                                     | Version     | Size (KB) | Comments                                                             | Branch                                                                                                                                                                                              |
|---------------------------------------------|-------------|-----------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DIY RxJS State Service                      | -           | 377.05    |                                                                      | [ng@17.0.3--diy-rxjs-state-service](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--diy-rxjs-state-service)                                                       |
| 🚦DIY Signal State Service                  | -           | 377.20    |                                                                      | [ng@17.0.3--diy-signal-state-service](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--diy-signal-state-service)                                                   |
| Elf                                         | 2.4.0       | 379.48    | Uses [ngneat/effects](https://github.com/ngneat/effects) for effects | [ng@17.0.3--elf@2.4](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--elf%402.4)                                                                                   |
| MiniRx Store (Component Store API)          | 5.1.0       | 382.91    |                                                                      | [ng@17.0.3--mini-rx-store@5.1--component-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--mini-rx-store%405.1--component-store-api)                     |
| MiniRx Store (Feature Store API)            | 5.1.0       | 383.53    |                                                                      | [ng@17.0.3--mini-rx-store@5.1--feature-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--mini-rx-store%405.1--feature-store-api)                         |
| 🚦MiniRx Signal Store (Component Store API) | 0.0.21      | 386.69    |                                                                      | [ng@17.0.3--mini-rx-signal-store@0.0.21--component-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--mini-rx-signal-store%400.0.21--component-store-api) |
| 🚦MiniRx Signal Store (Feature Store API)   | 0.0.21      | 387.09    |                                                                      | [ng@17.0.3--mini-rx-signal-store@0.0.21--feature-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--mini-rx-signal-store%400.0.21--feature-store-api)     |
| 🚦MiniRx Signal Store (Redux Store API)     | 0.0.21      | 388.04    | Uses [ts-action](https://github.com/cartant/ts-action) for actions   | [ng@17.0.3--mini-rx-signal-store@0.0.21--redux-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--mini-rx-signal-store%400.0.21--redux-store-api)         |
| NgRx Component Store                        | 17.0.0-rc.0 | 388.93    |                                                                      | [ng@17.0.3--ngrx-component-store@17.0.0-rc.0](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--ngrx-component-store%4017.0.0-rc.0)                                 |
| MiniRx Store (Redux Store API)              | 5.1.0       | 390.55    | Uses [ts-action](https://github.com/cartant/ts-action) for actions   | [ng@17.0.3--mini-rx-store@5.1--redux-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--mini-rx-store%405.1--redux-store-api)                             |
| Akita                                       | 8.0.1       | 401.79    |                                                                      | [ng@17.0.3--akita@8.0.1 ](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--akita%408.0.1)                                                                          |
| NgRx Store                                  | 17.0.0-rc.0 | 408.18    | Uses [ngrx/effects](https://ngrx.io/guide/effects) for effects       | [ng@17.0.3--ngrx-store@17.0.0-rc.0](https://github.com/spierala/angular-state-management-comparison/tree/ng%4017.0.3--ngrx-store%4017.0.0-rc.0)                                                     |

### Angular 16.1

| Library                                     | Version | Size (KB) | Comments                                                             | Branch                                                                                                                                                                                        |
|---------------------------------------------|---------|-----------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 🚦DIY Signal State Service                  | -       | 371.98    |                                                                      | [ng@16.1--diy-signal-state-service](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--diy-signal-state-service)                                                 |
| DIY RxJS State Service                      | -       | 372.08    |                                                                      | [ng@16.1--diy-rxjs-state-service](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--diy-rxjs-state-service)                                                     |
| Elf                                         | 2.3.2   | 374.59    | Uses [ngneat/effects](https://github.com/ngneat/effects) for effects | [ng@16.1--elf@2.3](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--elf%402.3)                                                                                 |
| MiniRx Store (Component Store API)          | 5.1.0   | 378.08    |                                                                      | [ng@16.1--mini-rx-store@5.1--component-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-store%405.1--component-store-api)                   |
| MiniRx Store (Feature Store API)            | 5.1.0   | 378.72    |                                                                      | [ng@16.1--mini-rx-store@5.1--feature-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-store%405.1--feature-store-api)                       |
| 🚦MiniRx Signal Store (Component Store API) | 0.0.5   | 380.53    |                                                                      | [ng@16.1--mini-rx-signal-store@0.0.5--component-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-signal-store%400.0.5--component-store-api) |
| 🚦MiniRx Signal Store (Feature Store API)   | 0.0.5   | 380.97    |                                                                      | [ng@16.1--mini-rx-signal-store@0.0.5--feature-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-signal-store%400.0.5--feature-store-api)     |
| 🚦MiniRx Signal Store (Redux Store API)     | 0.0.5   | 382.54    | Uses [ts-action](https://github.com/cartant/ts-action) for actions   | [ng@16.1--mini-rx-signal-store@0.0.5--redux-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-signal-store%400.0.5--redux-store-api)         |
| NgRx Component Store                        | 16.1.0  | 383.98    |                                                                      | [ng@16.1--ngrx-component-store@16.1](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--ngrx-component-store%4016.1)                                             |
| MiniRx Store (Redux Store API)              | 5.1.0   | 385.49    | Uses [ts-action](https://github.com/cartant/ts-action) for actions   | [ng@16.1--mini-rx-store@5.1--redux-store-api](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--mini-rx-store%405.1--redux-store-api)                           |
| Akita                                       | 8.0.1   | 396.68    |                                                                      | [ng@16.1--akita@8.0](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--akita%408.0)                                                                             |
| NgRx Store                                  | 16.1.0  | 402.90    | Uses [ngrx/effects](https://ngrx.io/guide/effects) for effects       | [ng@16.1--ngrx-store@16.1](https://github.com/spierala/angular-state-management-comparison/tree/ng%4016.1--ngrx-store%4016.1)                                                                 |

## Contributing

You are welcome to add your favourite state management library as well!

You can follow these steps:

1. Fork and clone the repo
2. Create a branch based on master (or based on another branch with a familiar state management lib (e.g. "ng@17.0.3--diy-signal-state-service")
3. Specify the Angular version and the state management library (and version) in the branch name: e.g. "ng@17.0.3--ngrx-signals@17.0.0")
4. Now refactor to your favourite state management solution (to have equal conditions: try to follow the facade pattern for the state management code, and use something for effects)
5. Run `npm run build:stats` to check the bundle size
6. Create the PR
   - add the bundle size in the PR description
   - target of the PR is this repo and the branch which you initially used as the base for your refactor-branch (e.g. "ng@17.0.3--diy-signal-state-service")
7. I will review your PR and add your results to the README on the master branch
8. Finally, I will merge your work to another branch which I will create (e.g. "ng@17.0.3--ngrx-signals@17.0.0") and link that branch in the README
