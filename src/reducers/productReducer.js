import * as types from '../actions/types/productTypes';

const initialState = {
    products: [],
    currentProduct: null,
    total: 0,
    fetchState: 'idle', // 'idle' | 'loading' | 'success' | 'error'
    limit: 10,
    offset: 0,
    filter: {}
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_PRODUCT_LIST:
            return {
                ...state,
                products: action.payload
            };
        case types.SET_CURRENT_PRODUCT:
            return {
                ...state,
                currentProduct: action.payload
            };
        case types.SET_TOTAL:
            return {
                ...state,
                total: action.payload
            };
        case types.SET_FETCH_STATE:
            return {
                ...state,
                fetchState: action.payload
            };
        case types.SET_LIMIT:
            return {
                ...state,
                limit: action.payload
            };
        case types.SET_OFFSET:
            return {
                ...state,
                offset: action.payload
            };
        case types.SET_FILTER:
            return {
                ...state,
                filter: action.payload
            };
        default:
            return state;
    }
};

export default productReducer;
