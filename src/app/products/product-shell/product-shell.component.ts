import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductStateFacadeService } from '../state/product-state-facade.service';

@Component({
    templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit {
    constructor(public productState: ProductStateFacadeService) {}

    ngOnInit(): void {
        this.productState.loadProductsSource.next();
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
        this.productState.deleteProductSource.next(product);
    }

    clearProduct(): void {
        this.productState.clearCurrentProduct();
    }

    saveProduct(product: Product): void {
        this.productState.createProductSource.next(product);
    }

    updateProduct(product: Product): void {
        this.productState.updateProductSource.next(product);
    }
}
