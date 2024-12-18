import * as types from '../actions/types/clientTypes';

const initialState = {
    user: {},
    addressList: [],
    creditCards: [],
    roles: [],
    theme: 'light',
    language: 'en'
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
        default:
            return state;
    }
};

export default clientReducer;
