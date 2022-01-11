import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { Product } from '../product';
import { ProductPageActions } from './actions';
import { Action, Select, Selector, State, StateContext, Store } from '@ngxs/store';
import { ProductService } from '../product.service';

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: '',
};

@State<ProductState>({
    name: 'products',
    defaults: initialState,
})
@Injectable({
    providedIn: 'root',
})
export class ProductStateFacadeService {
    @Select(ProductStateFacadeService.getShowProductCode) displayCode$: Observable<boolean>;
    @Select(ProductStateFacadeService.getCurrentProduct) selectedProduct$: Observable<
        Product | undefined | null
    >;
    @Select(ProductStateFacadeService.getProducts) products$: Observable<Product[]>;
    @Select(ProductStateFacadeService.getError) errorMessage$: Observable<string>;

    @Selector()
    static getProductFeatureState(state: ProductState) {
        return state;
    }

    @Selector()
    static getShowProductCode(state: ProductState) {
        return state.showProductCode;
    }

    @Selector()
    static getCurrentProductId(state: ProductState) {
        return state.currentProductId;
    }

    @Selector([ProductStateFacadeService.getCurrentProductId])
    static getCurrentProduct(state: ProductState, currentProductId: number) {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0,
            };
        } else {
            return currentProductId ? state.products.find((p) => p.id === currentProductId) : null;
        }
    }

    @Selector()
    static getProducts(state: ProductState) {
        return state.products;
    }

    @Selector()
    static getError(state: ProductState) {
        return state.error;
    }

    constructor(private productService: ProductService, private store: Store) {}

    @Action(ProductPageActions.ToggleProductCode)
    private _toggleProductCode(ctx: StateContext<ProductState>) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            showProductCode: !state.showProductCode,
        });
    }

    @Action(ProductPageActions.SetCurrentProduct)
    private _setCurrentProduct(
        ctx: StateContext<ProductState>,
        action: ProductPageActions.SetCurrentProduct
    ) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            currentProductId: action.currentProductId,
        });
    }

    @Action(ProductPageActions.ClearCurrentProduct)
    private _clearCurrentProduct(ctx: StateContext<ProductState>) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            currentProductId: null,
        });
    }

    @Action(ProductPageActions.InitializeCurrentProduct)
    private _initializeCurrentProduct(ctx: StateContext<ProductState>) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            currentProductId: 0,
        });
    }

    @Action(ProductPageActions.LoadProducts)
    private _loadProducts(ctx: StateContext<ProductState>) {
        return this.productService.getProducts().pipe(
            tap((products) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    products,
                    error: '',
                });
            }),
            catchError((error) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    products: [],
                    error,
                });
                return EMPTY;
            })
        );
    }

    @Action(ProductPageActions.CreateProduct)
    private _createProduct(
        ctx: StateContext<ProductState>,
        action: ProductPageActions.CreateProduct
    ) {
        return this.productService.createProduct(action.product).pipe(
            tap((products) => {
                const state = ctx.getState();

                ctx.setState({
                    ...state,
                    products: [...state.products, action.product],
                    currentProductId: action.product.id,
                    error: '',
                });
            }),
            catchError((error) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    error,
                });
                return EMPTY;
            })
        );
    }

    @Action(ProductPageActions.UpdateProduct)
    private _updateProduct(
        ctx: StateContext<ProductState>,
        action: ProductPageActions.UpdateProduct
    ) {
        return this.productService.updateProduct(action.product).pipe(
            tap((products) => {
                const state = ctx.getState();
                const updatedProducts = state.products.map((item) =>
                    action.product.id === item.id ? action.product : item
                );

                ctx.setState({
                    ...state,
                    products: updatedProducts,
                    currentProductId: action.product.id,
                    error: '',
                });
            }),
            catchError((error) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    error,
                });
                return EMPTY;
            })
        );
    }

    @Action(ProductPageActions.DeleteProduct)
    private _deleteProduct(
        ctx: StateContext<ProductState>,
        action: ProductPageActions.DeleteProduct
    ) {
        return this.productService.deleteProduct(action.productId).pipe(
            tap((products) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    products: state.products.filter((product) => product.id !== action.productId),
                    currentProductId: null,
                    error: '',
                });
            }),
            catchError((error) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    error,
                });
                return EMPTY;
            })
        );
    }

    loadProducts(): void {
        this.store.dispatch(new ProductPageActions.LoadProducts());
    }

    toggleProductCode(): void {
        this.store.dispatch(new ProductPageActions.ToggleProductCode());
    }

    initializeCurrentProduct(): void {
        this.store.dispatch(new ProductPageActions.InitializeCurrentProduct());
    }

    setCurrentProduct(product: Product): void {
        this.store.dispatch(new ProductPageActions.SetCurrentProduct(product.id!));
    }

    deleteProduct(product: Product): void {
        this.store.dispatch(new ProductPageActions.DeleteProduct(product.id!));
    }

    clearCurrentProduct(): void {
        this.store.dispatch(new ProductPageActions.ClearCurrentProduct());
    }

    createProduct(product: Product): void {
        this.store.dispatch(new ProductPageActions.CreateProduct(product));
    }

    updateProduct(product: Product): void {
        this.store.dispatch(new ProductPageActions.UpdateProduct(product));
    }
}
