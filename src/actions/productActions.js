import * as types from './types/productTypes';

export const setCategories = (categories) => ({
    type: types.SET_CATEGORIES,
    payload: categories
});

export const setProductList = (products) => ({
    type: types.SET_PRODUCT_LIST,
    payload: products
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
