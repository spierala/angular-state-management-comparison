import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsStore } from '../state/product-state-facade.service';

@Component({
    templateUrl: './product-shell.component.html',
    providers: [ProductsStore],
})
export class ProductShellComponent implements OnInit {
    productState = inject(ProductsStore);

    ngOnInit(): void {
        this.productState.loadProducts();
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
        this.productState.deleteProduct(product);
    }

    clearProduct(): void {
        this.productState.clearCurrentProduct();
    }

    saveProduct(product: Product): void {
        this.productState.createProduct(product);
    }

    updateProduct(product: Product): void {
        this.productState.updateProduct(product);
    }
}
