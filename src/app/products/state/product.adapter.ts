import { createAdapter, createSelectors } from '@state-adapt/core';
import { Product } from '../product';

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

export const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: '',
};

const productSelectors = createSelectors<ProductState>()({
    displayCode: (s) => s.showProductCode,
    currentProductId: (s) => s.currentProductId,
    products: (s) => s.products,
    errorMessage: (s) => s.error,
});

export const productAdapter = createAdapter<ProductState>()({
    toggleProductCode: (state) => ({ ...state, showProductCode: !state.showProductCode }),
    receiveProducts: (state, products: Product[]) => ({ ...state, products, error: '' }),
    deleteProduct: (state, id: number) => ({
        ...state,
        products: state.products.filter((product) => product.id !== id),
        error: '',
    }),
    createProduct: (state, product: Product) => ({
        ...state,
        products: [...state.products, product],
        error: '',
    }),
    udpateProduct: (state, updatedProduct: Product) => ({
        ...state,
        products: state.products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
        ),
        error: '',
    }),
    setCurrentProduct: (state, currentProductId: number | void) => ({
        ...state,
        currentProductId: currentProductId || 0,
    }),
    setError: (state, error: string) => ({ ...state, error }),
    selectors: createSelectors<ProductState>()(productSelectors, {
        selectedProduct: (s) => {
            if (s.currentProductId === 0) {
                return {
                    id: 0,
                    productName: '',
                    productCode: 'New',
                    description: '',
                    starRating: 0,
                };
            } else {
                return s.currentProductId
                    ? s.products.find((p) => p.id === s.currentProductId)
                    : null;
            }
        },
    }),
});
