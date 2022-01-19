import { ChangeDetectorRef, Injectable } from '@angular/core';
import { snapshot, State } from 'ngx-bang';
import { asyncEffect } from 'ngx-bang/async';
import { catchError, concatMap, EMPTY, mergeMap, of, Subject, tap } from 'rxjs';
import { map } from 'rxjs/operators';
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

@Injectable()
export class ProductStateFacadeService extends State<ProductState> {
    private $loadProducts = new Subject<void>();
    private $deleteProduct = new Subject<Product>();
    private $createProduct = new Subject<Product>();
    private $updateProduct = new Subject<Product>();

    readonly deleteProduct = this.$deleteProduct.next.bind(this.$deleteProduct);
    readonly createProduct = this.$createProduct.next.bind(this.$createProduct);
    readonly updateProduct = this.$updateProduct.next.bind(this.$updateProduct);

    derive = this.createDerive<{ selectedProduct: Product | null }>({
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

    constructor(cdr: ChangeDetectorRef, private productService: ProductService) {
        super(cdr, initialState);
    }

    init() {
        this.setupEffects();
        this.$loadProducts.next();
    }

    toggleProductCode(): void {
        this.state.showProductCode = !this.snapshot.showProductCode;
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

    private setupEffects() {
        asyncEffect(
            this.state,
            this.$loadProducts.pipe(
                mergeMap(() =>
                    this.productService.getProducts().pipe(
                        map((products) => ({ products, error: '' })),
                        catchError((error) => of({ products: [] as Product[], error }))
                    )
                )
            ),
            ({ products, error }) => {
                this.state.products = products;
                this.state.error = error;
            }
        );

        asyncEffect(
            this.state,
            this.$deleteProduct.pipe(
                mergeMap((productToDelete: Product) =>
                    this.productService.deleteProduct(productToDelete.id!).pipe(
                        tap(() => {
                            const productToDeleteIndex = this.snapshot.products.findIndex(
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
            this.$createProduct.pipe(
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
            this.$updateProduct.pipe(
                concatMap((productToUpdate) =>
                    this.productService.updateProduct(productToUpdate).pipe(
                        tap((updatedProduct) => {
                            const updatedProductIndex = this.snapshot.products.findIndex(
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
}
