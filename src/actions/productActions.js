import * as types from './types/productTypes';
import api, { endpoints } from '../services/apiService';

// Action Creators
export const setCategories = (categories) => ({
    type: types.SET_CATEGORIES,
    payload: categories
});

export const setProductList = (products) => ({
    type: types.SET_PRODUCT_LIST,
    payload: products
});

export const setCurrentProduct = (product) => ({
    type: types.SET_CURRENT_PRODUCT,
    payload: product
});

export const setTotal = (total) => ({
    type: types.SET_TOTAL,
    payload: total
});

export const setFetchState = (state) => ({
    type: types.SET_FETCH_STATE,
    payload: state
});

export const setLimit = (limit) => ({
    type: types.SET_LIMIT,
    payload: limit
});

export const setOffset = (offset) => ({
    type: types.SET_OFFSET,
    payload: offset
});

export const setFilter = (filter) => ({
    type: types.SET_FILTER,
    payload: filter
});

// Thunk Actions
export const fetchProducts = (page = 1, limit = 10) => {
    return async (dispatch) => {
        try {
            dispatch(setFetchState('loading'));
            
            const response = await api.get(`/products?page=${page}&limit=${limit}`);
            const { products, total } = response.data;
            
            dispatch(setProductList(products));
            dispatch(setTotal(total));
            dispatch(setFetchState('success'));
        } catch (error) {
            dispatch(setFetchState('error'));
            throw error;
        }
    };
};

export const fetchProductById = (productId) => {
    return async (dispatch) => {
        try {
            dispatch(setFetchState('loading'));
            
            const response = await api.get(`/products/${productId}`);
            dispatch(setCurrentProduct(response.data));
            dispatch(setFetchState('success'));
        } catch (error) {
            dispatch(setFetchState('error'));
            throw error;
        }
    };
};

// Selectors
export const selectProducts = state => state.product.products;
export const selectCurrentProduct = state => state.product.currentProduct;
export const selectProductLoading = state => state.product.fetchState === 'loading';
export const selectProductError = state => state.product.fetchState === 'error';
