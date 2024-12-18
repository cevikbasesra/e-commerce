import * as types from '../actions/types/authTypes';

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                error: null
            };
        case types.AUTH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: action.payload,
                user: null
            };
        case types.LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
