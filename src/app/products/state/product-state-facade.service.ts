import { Injectable } from '@angular/core';
import { derive, snapshot, state } from 'ngx-bang';
import { asyncActions, asyncEffect } from 'ngx-bang/async';
import { catchError, concatMap, EMPTY, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../product';
import { ProductService } from '../product.service';

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

@Injectable()
export class ProductStateFacadeService {
    readonly state = state<ProductState>({
        showProductCode: true,
        currentProductId: null,
        products: [],
        error: '',
    });

    readonly actions = asyncActions<{
        createProduct: Product;
        updateProduct: Product;
        deleteProduct: Product;
    }>();

    readonly derive = derive<{ selectedProduct: Product | null }>({
        selectedProduct: (get) => {
            const { currentProductId, products } = get(this.state);
            if (currentProductId === 0) {
                return {
                    id: currentProductId,
                    productName: '',
                    productCode: 'New',
                    description: '',
                    starRating: 0,
                };
            }

            return currentProductId
                ? products.find((product) => product.id === currentProductId)!
                : null;
        },
    });

    get derived() {
        return snapshot(this.derive);
    }

    constructor(private productService: ProductService) {}

    setup() {
        asyncEffect(
            this.state,
            this.productService.getProducts().pipe(
                map((products) => ({ products, error: '' })),
                catchError((error) => of({ products: [] as Product[], error }))
            ),
            ({ products, error }) => {
                this.state.products = products;
                this.state.error = error;
            }
        );

        asyncEffect(
            this.state,
            this.actions.deleteProduct$.pipe(
                mergeMap((productToDelete: Product) =>
                    this.productService.deleteProduct(productToDelete.id!).pipe(
                        tap(() => {
                            const productToDeleteIndex = snapshot(this.state).products.findIndex(
                                (product) => product.id === productToDelete.id
                            );
                            if (productToDeleteIndex >= 0) {
                                this.state.products.splice(productToDeleteIndex, 1);
                                this.state.currentProductId = null;
                                this.state.error = '';
                            }
                        }),
                        catchError((error) => {
                            this.state.error = error;
                            return EMPTY;
                        })
                    )
                )
            )
        );

        asyncEffect(
            this.state,
            this.actions.createProduct$.pipe(
                concatMap((productToCreate) =>
                    this.productService.createProduct(productToCreate).pipe(
                        tap((createdProduct) => {
                            this.state.products.push(createdProduct);
                            this.state.currentProductId = createdProduct.id;
                            this.state.error = '';
                        }),
                        catchError((error) => {
                            this.state.error = error;
                            return EMPTY;
                        })
                    )
                )
            )
        );

        asyncEffect(
            this.state,
            this.actions.updateProduct$.pipe(
                concatMap((productToUpdate) =>
                    this.productService.updateProduct(productToUpdate).pipe(
                        tap((updatedProduct) => {
                            const updatedProductIndex = snapshot(this.state).products.findIndex(
                                (product) => product.id === updatedProduct.id
                            );
                            if (updatedProductIndex >= 0) {
                                this.state.products[updatedProductIndex] = updatedProduct;
                                this.state.currentProductId = updatedProduct.id;
                                this.state.error = '';
                            }
                        }),
                        catchError((error) => {
                            this.state.error = error;
                            return EMPTY;
                        })
                    )
                )
            )
        );
    }

    toggleProductCode(): void {
        this.state.showProductCode = !snapshot(this.state).showProductCode;
    }

    initializeCurrentProduct(): void {
        this.state.currentProductId = 0;
    }

    setCurrentProduct(product: Product): void {
        this.state.currentProductId = product.id;
    }

    clearCurrentProduct(): void {
        this.state.currentProductId = null;
    }
}
