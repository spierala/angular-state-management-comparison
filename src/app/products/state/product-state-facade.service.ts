import { Injectable } from '@angular/core';
import { catchError, concatMap, EMPTY, mergeMap, Observable, tap } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ComponentStore } from 'mini-rx-store';

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

@Injectable({
    providedIn: 'root',
})
export class ProductStateFacadeService extends ComponentStore<ProductState> {
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

    constructor(private productService: ProductService) {
        super(initialState);
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
