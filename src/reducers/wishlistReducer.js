import * as types from '../actions/types/wishlistTypes';

// Load initial state from storage based on Remember Me
const loadInitialState = () => {
  try {
    // Check localStorage first (Remember Me)
    const persistedState = localStorage.getItem('reduxState');
    if (persistedState) {
      const state = JSON.parse(persistedState);
      return state.wishlist || { items: [] };
    }
    
    // Then check sessionStorage (current session only)
    const sessionState = sessionStorage.getItem('reduxState');
    if (sessionState) {
      const state = JSON.parse(sessionState);
      return state.wishlist || { items: [] };
    }

    return { items: [] };
  } catch (err) {
    return { items: [] };
  }
};

const initialState = loadInitialState();

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_WISHLIST:
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case types.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case types.CLEAR_WISHLIST:
      return { items: [] };

    default:
      return state;
  }
};

export default wishlistReducer;
