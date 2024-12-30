import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, SET_CART, CLEAR_CART, SET_PAYMENT, SET_ADDRESS } from '../actions/types/cartTypes';

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
    case ADD_TO_CART:
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

    case REMOVE_FROM_CART:
      newCart = state.cart.filter(item => item.id !== action.payload);
      saveCartToStorage(newCart);
      return { ...state, cart: newCart };

    case UPDATE_CART_ITEM:
      newCart = state.cart.map(item =>
        item.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      saveCartToStorage(newCart);
      return { ...state, cart: newCart };

    case SET_CART:
      saveCartToStorage(action.payload);
      return {
        ...state,
        cart: action.payload,
      };

    case CLEAR_CART:
      clearCartFromStorage();
      return {
        ...state,
        cart: [],
      };

    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
