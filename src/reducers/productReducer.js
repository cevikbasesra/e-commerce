import * as types from '../actions/types/productTypes';

const initialState = {
    categories: [],
    productList: [],
    total: 0,
    limit: 25,
    offset: 0,
    filter: '',
    fetchState: 'NOT_FETCHED'
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case types.SET_PRODUCT_LIST:
            return {
                ...state,
                productList: action.payload
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
