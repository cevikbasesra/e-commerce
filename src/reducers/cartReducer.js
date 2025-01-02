import * as types from '../actions/types/cartTypes';

// Load cart from localStorage if it exists
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

const initialState = {
  cart: loadCartFromStorage(),
  payment: {},
  address: {},
  totalAmount: 0,
  totalItems: 0
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Clear cart from localStorage
const clearCartFromStorage = () => {
  try {
    localStorage.removeItem('cart');
  } catch (error) {
    console.error('Error clearing cart from localStorage:', error);
  }
};

const cartReducer = (state = initialState, action) => {
  let newCart;

  switch (action.type) {
    case types.ADD_TO_CART:
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex !== -1) {
        newCart = state.cart.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      saveCartToStorage(newCart);
      return { ...state, cart: newCart };

    case types.REMOVE_FROM_CART:
      newCart = state.cart.filter(item => item.id !== action.payload);
      saveCartToStorage(newCart);
      return { ...state, cart: newCart };

    case types.UPDATE_CART_ITEM:
      newCart = state.cart.map(item =>
        item.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      saveCartToStorage(newCart);
      return { ...state, cart: newCart };

    case types.SET_CART:
      saveCartToStorage(action.payload);
      return {
        ...state,
        cart: action.payload,
      };

    case types.CLEAR_CART:
      clearCartFromStorage();
      return {
        ...state,
        cart: [],
      };

    case types.RESET_CART:
      clearCartFromStorage();
      return {
        ...state,
        cart: [],
        totalAmount: 0,
        totalItems: 0
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
