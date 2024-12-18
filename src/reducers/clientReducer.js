import * as types from '../actions/types/clientTypes';
import * as authTypes from '../actions/types/authTypes';

const initialState = {
    user: null,
    addressList: [],
    creditCards: [],
    roles: [],
    theme: 'light',
    language: 'en',
    isAuthenticated: false,
    loading: false,
    error: null
};

const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case types.SET_ROLES:
            return {
                ...state,
                roles: action.payload
            };
        case types.SET_THEME:
            return {
                ...state,
                theme: action.payload
            };
        case types.SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
            };

        // Auth related cases
        case authTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case authTypes.AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                error: null
            };
        case authTypes.AUTH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: action.payload,
                user: null
            };
        case authTypes.LOGOUT:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default clientReducer;
