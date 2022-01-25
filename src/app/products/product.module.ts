import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatefulDirectiveModule } from 'ngx-bang/stateful';

import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';

import { ProductShellComponent } from './product-shell/product-shell.component';

const productRoutes: Routes = [{ path: '', component: ProductShellComponent }];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(productRoutes),
        StatefulDirectiveModule,
        StatefulDirectiveModule,
    ],
    declarations: [ProductShellComponent, ProductListComponent, ProductEditComponent],
})
export class ProductModule {}
