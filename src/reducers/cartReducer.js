import * as types from "../actions/types/cartTypes";

const initialState = {
  cart: [],
  payment: {},
  address: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case types.SET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };
    case types.SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
