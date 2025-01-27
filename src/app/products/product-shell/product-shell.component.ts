import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsStore } from '../state/product-store';

@Component({
    templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit {
    productStore = inject(ProductsStore);

    ngOnInit(): void {
        this.productStore.loadProducts();
    }

    checkChanged(): void {
        this.productStore.toggleProductCode();
    }

    newProduct(): void {
        this.productStore.initializeCurrentProduct();
    }

    productSelected(product: Product): void {
        this.productStore.setCurrentProduct(product);
    }

    deleteProduct(product: Product): void {
        this.productStore.deleteProduct(product);
    }

    clearProduct(): void {
        this.productStore.clearCurrentProduct();
    }

    saveProduct(product: Product): void {
        this.productStore.createProduct(product);
    }

    updateProduct(product: Product): void {
        this.productStore.updateProduct(product);
    }
}
