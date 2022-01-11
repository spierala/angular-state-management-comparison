import { Product } from '../../product';

export class ToggleProductCode {
    static readonly type = '[Product Page] Toggle Product Code';
}

export class SetCurrentProduct {
    static readonly type = '[Product Page] Set Current Product';
    constructor(public currentProductId: number) {}
}

export class ClearCurrentProduct {
    static readonly type = '[Product Page] Clear Current Product';
}

export class InitializeCurrentProduct {
    static readonly type = '[Product Page] Initialize Current Product';
}

export class LoadProducts {
    static readonly type = '[Product Page] Load';
}

export class UpdateProduct {
    static readonly type = '[Product Page] Update Product';
    constructor(public product: Product) {}
}

export class CreateProduct {
    static readonly type = '[Product Page] Create Product';
    constructor(public product: Product) {}
}

export class DeleteProduct {
    static readonly type = '[Product Page] Delete Product';
    constructor(public productId: number) {}
}
