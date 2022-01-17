import { Injectable } from '@angular/core';
import { catchError, concatMap, EMPTY, mergeMap, Observable, tap } from 'rxjs';
import { Product } from '../product';
import { Query, Store, StoreConfig } from '@datorama/akita';
import { ProductService } from '../product.service';
import { createEffectFn } from '@ngneat/effects';
import { EffectFn } from '@ngneat/effects-ng';

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: '',
};

@Injectable({ providedIn: 'root' })
export class ProductsQuery extends Query<ProductState> {
    displayCode$: Observable<boolean> = this.select((state) => state.showProductCode);
    selectedProduct$: Observable<Product | undefined | null> = this.select((state) => {
        if (state.currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0,
            };
        } else {
            return state.currentProductId
                ? state.products.find((p) => p.id === state.currentProductId)
                : null;
        }
    });
    products$: Observable<Product[]> = this.select((state) => state.products);
    errorMessage$: Observable<string> = this.select((state) => state.error);

    constructor(store: ProductStateFacadeService) {
        super(store);
    }
}

@Injectable({
    providedIn: 'root',
})
export class ProductEffects extends EffectFn {
    constructor(
        private productService: ProductService,
        private productState: ProductStateFacadeService
    ) {
        super();
    }

    loadProducts = this.createEffectFn<void>(
        mergeMap(() =>
            this.productService.getProducts().pipe(
                tap((products) => {
                    this.productState.update({
                        products,
                        error: '',
                    });
                }),
                catchError((error) => {
                    this.productState.update({
                        products: [],
                        error,
                    });
                    return EMPTY;
                })
            )
        )
    );

    deleteProduct = this.createEffectFn<Product>(
        mergeMap((productToDelete: Product) =>
            this.productService.deleteProduct(productToDelete.id!).pipe(
                tap((products) => {
                    this.productState.update((state) => ({
                        ...state,
                        products: state.products.filter(
                            (product) => product.id !== productToDelete.id
                        ),
                        currentProductId: null,
                        error: '',
                    }));
                }),
                catchError((error) => {
                    this.productState.update({
                        error,
                    });
                    return EMPTY;
                })
            )
        )
    );

    createProduct = this.createEffectFn<Product>(
        concatMap((productToCreate) =>
            this.productService.createProduct(productToCreate).pipe(
                tap((createdProduct) => {
                    this.productState.update((state) => ({
                        ...state,
                        products: [...state.products, createdProduct],
                        currentProductId: createdProduct.id,
                        error: '',
                    }));
                }),
                catchError((error) => {
                    this.productState.update({
                        error,
                    });
                    return EMPTY;
                })
            )
        )
    );

    updateProduct = this.createEffectFn<Product>(
        concatMap((productToUpdate) =>
            this.productService.updateProduct(productToUpdate).pipe(
                tap((updatedProduct) => {
                    this.productState.update((state) => {
                        const updatedProducts = state.products.map((item) =>
                            productToUpdate.id === item.id ? productToUpdate : item
                        );

                        return {
                            products: updatedProducts,
                            currentProductId: updatedProduct.id,
                            error: '',
                        };
                    });
                }),
                catchError((error) => {
                    this.productState.update({
                        error,
                    });
                    return EMPTY;
                })
            )
        )
    );
}

@StoreConfig({ name: 'products' })
@Injectable({
    providedIn: 'root',
})
export class ProductStateFacadeService extends Store<ProductState> {
    constructor(private productService: ProductService) {
        super(initialState);
    }

    toggleProductCode(): void {
        this.update((state) => ({ showProductCode: !state.showProductCode }));
    }

    initializeCurrentProduct(): void {
        this.update({ currentProductId: 0 });
    }

    setCurrentProduct(product: Product): void {
        this.update({ currentProductId: product.id });
    }

    clearCurrentProduct(): void {
        this.update({ currentProductId: null });
    }
}
