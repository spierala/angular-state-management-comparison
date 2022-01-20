import { Injectable } from '@angular/core';
import { catchError, concatMap, EMPTY, mergeMap, Observable, Subject, tap } from 'rxjs';
import { StateService } from 'src/app/state.service';
import { Product } from '../product';
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

@Injectable({
    providedIn: 'root',
})
export class ProductStateFacadeService extends StateService<ProductState> {
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

    loadProductsSource: Subject<void> = new Subject();
    deleteProductSource: Subject<Product> = new Subject();
    createProductSource: Subject<Product> = new Subject();
    updateProductSource: Subject<Product> = new Subject();

    constructor(private productService: ProductService) {
        super(initialState);

        this.loadProductsSource
            .pipe(
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
            )
            .subscribe();

        this.deleteProductSource
            .pipe(
                mergeMap((productToDelete: Product) =>
                    this.productService.deleteProduct(productToDelete.id!).pipe(
                        tap((products) => {
                            this.setState({
                                products: this.state.products.filter(
                                    (product) => product.id !== productToDelete.id
                                ),
                                currentProductId: null,
                                error: '',
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
            )
            .subscribe();

        this.createProductSource
            .pipe(
                concatMap((productToCreate) =>
                    this.productService.createProduct(productToCreate).pipe(
                        tap((createdProduct) => {
                            this.setState({
                                products: [...this.state.products, createdProduct],
                                currentProductId: createdProduct.id,
                                error: '',
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
            )
            .subscribe();

        this.updateProductSource
            .pipe(
                concatMap((productToUpdate) =>
                    this.productService.updateProduct(productToUpdate).pipe(
                        tap((updatedProduct) => {
                            const updatedProducts = this.state.products.map((item) =>
                                productToUpdate.id === item.id ? productToUpdate : item
                            );

                            this.setState({
                                products: updatedProducts,
                                currentProductId: updatedProduct.id,
                                error: '',
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
            )
            .subscribe();
    }

    toggleProductCode(): void {
        this.setState({ showProductCode: !this.state.showProductCode });
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
}
