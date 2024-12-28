import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import productReducer from '../reducers/productReducer';
import cartReducer from '../reducers/cartReducer';
import clientReducer from '../reducers/clientReducer';

// Load state from storage based on Remember Me
const loadState = () => {
  try {
    // Check localStorage first (Remember Me)
    const persistedState = localStorage.getItem('reduxState');
    if (persistedState) {
      return JSON.parse(persistedState);
    }
    
    // Then check sessionStorage (current session only)
    const sessionState = sessionStorage.getItem('reduxState');
    if (sessionState) {
      return JSON.parse(sessionState);
    }

    return undefined;
  } catch (err) {
    return undefined;
  }
};

// Save state to appropriate storage
const saveState = (state) => {
  try {
    const stateToSave = {
      auth: state.auth
    };

    // If there's a token in localStorage, we're using Remember Me
    if (localStorage.getItem('token')) {
      localStorage.setItem('reduxState', JSON.stringify(stateToSave));
      sessionStorage.removeItem('reduxState');
    } else {
      // Otherwise, only save to session storage
      sessionStorage.setItem('reduxState', JSON.stringify(stateToSave));
      localStorage.removeItem('reduxState');
    }
  } catch {
    // Ignore write errors
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  client: clientReducer,
});

const persistedState = loadState();

// Redux DevTools setup
const composeEnhancers = 
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

// Subscribe to store changes
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
