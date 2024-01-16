import { computed, inject } from '@angular/core';
import { concatMap, mergeMap } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

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

export const ProductsStore = signalStore(
    withState(initialState),
    withComputed((state) => ({
        displayCode: computed(() => state.showProductCode()),
        selectedProduct: computed(() => {
            if (state.currentProductId() === 0) {
                return {
                    id: 0,
                    productName: '',
                    productCode: 'New',
                    description: '',
                    starRating: 0,
                };
            } else {
                return state.currentProductId
                    ? state.products().find((p) => p.id === state.currentProductId())
                    : null;
            }
        }),
    })),
    withMethods((store, productService = inject(ProductService)) => ({
        toggleProductCode(): void {
            patchState(store, (state) => ({ showProductCode: !state.showProductCode }));
        },
        initializeCurrentProduct(): void {
            patchState(store, { currentProductId: 0 });
        },
        setCurrentProduct(product: Product): void {
            patchState(store, { currentProductId: product.id });
        },
        clearCurrentProduct(): void {
            patchState(store, { currentProductId: null });
        },
        loadProducts: rxMethod<void>(
            mergeMap(() =>
                productService.getProducts().pipe(
                    tapResponse({
                        next: (products: Product[]) =>
                            patchState(store, {
                                products,
                                error: '',
                            }),
                        error: () => {},
                    })
                )
            )
        ),
        deleteProduct: rxMethod<Product>(
            mergeMap((productToDelete: Product) =>
                productService.deleteProduct(productToDelete.id!).pipe(
                    tapResponse({
                        next: (products) => {
                            patchState(store, (state) => ({
                                products: state.products.filter(
                                    (product) => product.id !== productToDelete.id
                                ),
                                currentProductId: null,
                                error: '',
                            }));
                        },
                        error: (error: string) => {
                            patchState(store, {
                                error,
                            });
                        },
                    })
                )
            )
        ),
        createProduct: rxMethod<Product>(
            concatMap((productToCreate) =>
                productService.createProduct(productToCreate).pipe(
                    tapResponse({
                        next: (createdProduct) => {
                            patchState(store, (state) => ({
                                products: [...state.products, createdProduct],
                                currentProductId: createdProduct.id,
                                error: '',
                            }));
                        },
                        error: (error: string) => {
                            patchState(store, {
                                error,
                            });
                        },
                    })
                )
            )
        ),
        updateProduct: rxMethod<Product>(
            concatMap((productToUpdate) =>
                productService.updateProduct(productToUpdate).pipe(
                    tapResponse({
                        next: (updatedProduct) => {
                            patchState(store, (state) => {
                                const updatedProducts = state.products.map((item) =>
                                    productToUpdate.id === item.id ? productToUpdate : item
                                );

                                return {
                                    products: updatedProducts,
                                    currentProductId: updatedProduct.id,
                                    error: '',
                                };
                            });
                        },
                        error: (error: string) => {
                            patchState(store, {
                                error,
                            });
                        },
                    })
                )
            )
        ),
    }))
);
