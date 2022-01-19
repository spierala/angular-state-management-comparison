import { Component } from '@angular/core';
import { ProductStoreService } from '../state/product.store.service';

@Component({
    templateUrl: './product-shell.component.html',
})
export class ProductShellComponent {
    constructor(public productStoreService: ProductStoreService) {}
}
