import { Injectable } from '@angular/core';
import { catchError, concatMap, EMPTY, mergeMap, Observable, tap } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { createFeatureSelector, createSelector, FeatureStore } from 'mini-rx-store';

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

const getProductFeatureState = createFeatureSelector<ProductState>();
export const getShowProductCode = createSelector(
    getProductFeatureState,
    (state) => state.showProductCode
);
export const getCurrentProductId = createSelector(
    getProductFeatureState,
    (state) => state.currentProductId
);
export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0,
            };
        } else {
            return currentProductId ? state.products.find((p) => p.id === currentProductId) : null;
        }
    }
);
export const getProducts = createSelector(getProductFeatureState, (state) => state.products);
export const getError = createSelector(getProductFeatureState, (state) => state.error);

@Injectable({
    providedIn: 'root',
})
export class ProductStateFacadeService extends FeatureStore<ProductState> {
    displayCode$: Observable<boolean> = this.select(getShowProductCode);
    selectedProduct$: Observable<Product | undefined | null> = this.select(getCurrentProduct);
    products$: Observable<Product[]> = this.select(getProducts);
    errorMessage$: Observable<string> = this.select(getError);

    constructor(private productService: ProductService) {
        super('products', initialState);
    }

    toggleProductCode(): void {
        this.setState((state) => ({ showProductCode: !state.showProductCode }));
    }

    initializeCurrentProduct(): void {
        this.setState({ currentProductId: 0 });
    }

    setCurrentProduct(product: Product): void {
        this.setState({ currentProductId: product.id });
    }

    clearCurrentProduct(): void {
        this.setState({ currentProductId: null });
    }

    loadProducts = this.effect<void>(
        mergeMap(() =>
            this.productService.getProducts().pipe(
                tap((products) => {
                    this.setState({
                        products,
                        error: '',
                    });
                }),
                catchError((error) => {
                    this.setState({
                        products: [],
                        error,
                    });
                    return EMPTY;
                })
            )
        )
    );

    deleteProduct = this.effect<Product>(
        mergeMap((productToDelete: Product) =>
            this.productService.deleteProduct(productToDelete.id!).pipe(
                tap((products) => {
                    this.setState((state) => ({
                        products: state.products.filter(
                            (product) => product.id !== productToDelete.id
                        ),
                        currentProductId: null,
                        error: '',
                    }));
                }),
                catchError((error) => {
                    this.setState({
                        error,
                    });
                    return EMPTY;
                })
            )
        )
    );

    createProduct = this.effect<Product>(
        concatMap((productToCreate) =>
            this.productService.createProduct(productToCreate).pipe(
                tap((createdProduct) => {
                    this.setState((state) => ({
                        products: [...state.products, createdProduct],
                        currentProductId: createdProduct.id,
                        error: '',
                    }));
                }),
                catchError((error) => {
                    this.setState({
                        error,
                    });
                    return EMPTY;
                })
            )
        )
    );

    updateProduct = this.effect<Product>(
        concatMap((productToUpdate) =>
            this.productService.updateProduct(productToUpdate).pipe(
                tap((updatedProduct) => {
                    this.setState((state) => {
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
                    this.setState({
                        error,
                    });
                    return EMPTY;
                })
            )
        )
    );
}
