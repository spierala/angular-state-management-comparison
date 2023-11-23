// Signal variant of: https://dev.to/angular/simple-yet-powerful-state-management-in-angular-with-rxjs-4f8g
import { computed, Signal, signal, WritableSignal } from '@angular/core';

export class StateService<T> {
    private _state: WritableSignal<T>;
    protected get state(): T {
        return this._state();
    }

    constructor(initialState: T) {
        this._state = signal<T>(initialState);
    }

    protected select<K>(mapFn: (state: T) => K): Signal<K> {
        return computed(() => {
            return mapFn(this._state());
        });
    }

    protected setState(newState: Partial<T>) {
        this._state.update((state) => ({
            ...state,
            ...newState,
        }));
    }
}
