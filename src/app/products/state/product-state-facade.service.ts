import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { Product } from '../product';
import { Query, Store, StoreConfig } from '@datorama/akita';
import { ProductService } from '../product.service';

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

@StoreConfig({ name: 'products' })
@Injectable({
    providedIn: 'root',
})
export class ProductStateFacadeService extends Store<ProductState> {
    constructor(private productService: ProductService) {
        super(initialState);
    }

    loadProducts(): void {
        this.productService
            .getProducts()
            .pipe(
                tap((products) => {
                    this.update({
                        products,
                        error: '',
                    });
                }),
                catchError((error) => {
                    this.update({
                        products: [],
                        error,
                    });
                    return EMPTY;
                })
            )
            .subscribe();
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

    deleteProduct(productToDelete: Product): void {
        this.productService
            .deleteProduct(productToDelete.id!)
            .pipe(
                tap((products) => {
                    this.update((state) => ({
                        ...state,
                        products: state.products.filter(
                            (product) => product.id !== productToDelete.id
                        ),
                        currentProductId: null,
                        error: '',
                    }));
                }),
                catchError((error) => {
                    this.update({
                        error,
                    });
                    return EMPTY;
                })
            )
            .subscribe();
    }

    clearCurrentProduct(): void {
        this.update({ currentProductId: null });
    }

    createProduct(productToCreate: Product): void {
        this.productService
            .createProduct(productToCreate)
            .pipe(
                tap((createdProduct) => {
                    this.update((state) => ({
                        ...state,
                        products: [...state.products, createdProduct],
                        currentProductId: createdProduct.id,
                        error: '',
                    }));
                }),
                catchError((error) => {
                    this.update({
                        error,
                    });
                    return EMPTY;
                })
            )
            .subscribe();
    }

    updateProduct(productToUpdate: Product): void {
        this.productService
            .updateProduct(productToUpdate)
            .pipe(
                tap((updatedProduct) => {
                    this.update((state) => {
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
                    this.update({
                        error,
                    });
                    return EMPTY;
                })
            )
            .subscribe();
    }
}
