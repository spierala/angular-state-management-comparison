import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import {
    ProductEffects,
    ProductsQuery,
    ProductStateFacadeService,
} from '../state/product-state-facade.service';

@Component({
    templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit {
    constructor(
        public productState: ProductStateFacadeService,
        public productsQuery: ProductsQuery,
        public productEffects: ProductEffects
    ) {}

    ngOnInit(): void {
        this.productEffects.loadProducts();
    }

    checkChanged(): void {
        this.productState.toggleProductCode();
    }

    newProduct(): void {
        this.productState.initializeCurrentProduct();
    }

    productSelected(product: Product): void {
        this.productState.setCurrentProduct(product);
    }

    deleteProduct(product: Product): void {
        this.productEffects.deleteProduct(product);
    }

    clearProduct(): void {
        this.productState.clearCurrentProduct();
    }

    saveProduct(product: Product): void {
        this.productEffects.createProduct(product);
    }

    updateProduct(product: Product): void {
        this.productEffects.updateProduct(product);
    }
}
