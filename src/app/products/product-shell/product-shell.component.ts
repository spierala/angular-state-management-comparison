import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductStateFacadeService } from '../state/product-state-facade.service';

@Component({
    templateUrl: './product-shell.component.html',
    imports: [AsyncPipe, ProductEditComponent, ProductListComponent],
})
export class ProductShellComponent implements OnInit {
    constructor(public productState: ProductStateFacadeService) {}

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
