import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../product';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass, NgFor, NgIf],
})
export class ProductListComponent {
    pageTitle = 'Products';

    @Input() errorMessage: string;
    @Input() products: Product[];
    @Input() displayCode: boolean;
    @Input() selectedProduct: Product | undefined | null;
    @Output() displayCodeChanged = new EventEmitter<void>();
    @Output() initializeNewProduct = new EventEmitter<void>();
    @Output() productWasSelected = new EventEmitter<Product>();

    checkChanged(): void {
        this.displayCodeChanged.emit();
    }

    newProduct(): void {
        this.initializeNewProduct.emit();
    }

    productSelected(product: Product): void {
        this.productWasSelected.emit(product);
    }
}
