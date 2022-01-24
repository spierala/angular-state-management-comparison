import { Injectable } from '@angular/core';
import { catchError, concatMap, EMPTY, mergeMap, Observable, tap } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { createEffectFn } from '@ngneat/effects';
import { EffectFn } from '@ngneat/effects-ng';
import { createState, select, Store, withProps } from '@ngneat/elf';

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

const { state, config } = createState(withProps<ProductState>(initialState));
const productStore = new Store({ state, name: 'products', config });

@Injectable({
    providedIn: 'root',
})
export class ProductStateFacadeService extends EffectFn {
    displayCode$: Observable<boolean> = productStore.pipe(select((state) => state.showProductCode));
    selectedProduct$: Observable<Product | undefined | null> = productStore.pipe(
        select((state) => {
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
        })
    );
    products$: Observable<Product[]> = productStore.pipe(select((state) => state.products));
    errorMessage$: Observable<string> = productStore.pipe(select((state) => state.error));

    constructor(private productService: ProductService) {
        super();
    }

    toggleProductCode(): void {
        productStore.update((state) => ({ ...state, showProductCode: !state.showProductCode }));
    }

    initializeCurrentProduct(): void {
        productStore.update((state) => ({ ...state, currentProductId: 0 }));
    }

    setCurrentProduct(product: Product): void {
        productStore.update((state) => ({ ...state, currentProductId: product.id }));
    }

    clearCurrentProduct(): void {
        productStore.update((state) => ({ ...state, currentProductId: null }));
    }

    // Effects
    loadProducts = this.createEffectFn<void>(
        mergeMap(() =>
            this.productService.getProducts().pipe(
                tap((products) => {
                    productStore.update((state) => ({
                        ...state,
                        products,
                        error: '',
                    }));
                }),
                catchError((error) => {
                    productStore.update((state) => ({
                        ...state,
                        products: [],
                        error,
                    }));
                    return EMPTY;
                })
            )
        )
    );

    deleteProduct = this.createEffectFn<Product>(
        mergeMap((productToDelete: Product) =>
            this.productService.deleteProduct(productToDelete.id!).pipe(
                tap((products) => {
                    productStore.update((state) => ({
                        ...state,
                        products: state.products.filter(
                            (product) => product.id !== productToDelete.id
                        ),
                        currentProductId: null,
                        error: '',
                    }));
                }),
                catchError((error) => {
                    productStore.update((state) => ({
                        ...state,
                        error,
                    }));
                    return EMPTY;
                })
            )
        )
    );

    createProduct = this.createEffectFn<Product>(
        concatMap((productToCreate) =>
            this.productService.createProduct(productToCreate).pipe(
                tap((createdProduct) => {
                    productStore.update((state) => ({
                        ...state,
                        products: [...state.products, createdProduct],
                        currentProductId: createdProduct.id,
                        error: '',
                    }));
                }),
                catchError((error) => {
                    productStore.update((state) => ({
                        ...state,
                        error,
                    }));
                    return EMPTY;
                })
            )
        )
    );

    updateProduct = this.createEffectFn<Product>(
        concatMap((productToUpdate) =>
            this.productService.updateProduct(productToUpdate).pipe(
                tap((updatedProduct) => {
                    productStore.update((state) => {
                        const updatedProducts = state.products.map((item) =>
                            productToUpdate.id === item.id ? productToUpdate : item
                        );

                        return {
                            ...state,
                            products: updatedProducts,
                            currentProductId: updatedProduct.id,
                            error: '',
                        };
                    });
                }),
                catchError((error) => {
                    productStore.update((state) => ({
                        ...state,
                        error,
                    }));
                    return EMPTY;
                })
            )
        )
    );
}
