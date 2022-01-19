import { Injectable } from '@angular/core';
import { AdaptCommon, getHttpSources, Source, toSource } from '@state-adapt/core';
import { concatMap, mergeMap, Subject } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { initialState, productAdapter } from './product.adapter';

@Injectable({
    providedIn: 'root',
})
export class ProductStoreService {
    productCodeToggle$ = new Source<void>('productCodeToggle$');
    newProductInit$ = new Source<void>('newProductInit$');
    currentProductCleared$ = new Source<void>('currentProductCleared$');
    currentProductSelected$ = new Source<number>('currentProductSelected$');
    productsReceived$ = this.productService.getProducts().pipe(toSource('[Products] received'));

    deleteProduct$ = new Subject<Product>();
    productDeleteSources = getHttpSources(
        'Product',
        this.deleteProduct$.pipe(mergeMap(({ id }) => this.productService.deleteProduct(id!))),
        (res) => [true, res, res as unknown as string]
    );

    createProduct$ = new Subject<Product>();
    productCreateSources = getHttpSources(
        'Product',
        this.deleteProduct$.pipe(
            concatMap((product) => this.productService.updateProduct(product))
        ),
        (res) => [true, res, res as unknown as string]
    );

    updateProduct$ = new Subject<Product>();
    productUpdateSources = getHttpSources(
        'Product',
        this.deleteProduct$.pipe(
            concatMap((product) => this.productService.createProduct(product))
        ),
        (res) => [true, res, res as unknown as string]
    );

    productStore = this.adapt.init(['products', productAdapter, initialState], {
        toggleProductCode: this.productCodeToggle$,
        setCurrentProduct: [
            this.newProductInit$,
            this.currentProductCleared$,
            this.currentProductSelected$,
        ],
        receiveProducts: this.productsReceived$,
        deleteProduct: this.productDeleteSources.success$,
        createProduct: this.productCreateSources.success$,
        udpateProduct: this.productUpdateSources.success$,
        setError: [
            this.productDeleteSources.error$,
            this.productCreateSources.error$,
            this.productUpdateSources.error$,
        ],
    });

    displayCode$ = this.productStore.displayCode$;
    products$ = this.productStore.products$;
    selectedProduct$ = this.productStore.selectedProduct$;
    errorMessage$ = this.productStore.errorMessage$;

    constructor(private productService: ProductService, private adapt: AdaptCommon<any>) {}
}
