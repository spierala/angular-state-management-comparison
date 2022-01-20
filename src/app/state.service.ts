// Copy pasted from here: https://dev.to/angular/simple-yet-powerful-state-management-in-angular-with-rxjs-4f8g

import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export class StateService<T> {
    private state$: BehaviorSubject<T>;
    protected get state(): T {
        return this.state$.getValue();
    }

    constructor(initialState: T) {
        this.state$ = new BehaviorSubject<T>(initialState);
    }

    protected select<K>(mapFn: (state: T) => K): Observable<K> {
        return this.state$.asObservable().pipe(
            map((state: T) => mapFn(state)),
            distinctUntilChanged()
        );
    }

    protected setState(newState: Partial<T>) {
        this.state$.next({
            ...this.state,
            ...newState,
        });
    }
}
