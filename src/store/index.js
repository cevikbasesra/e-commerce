import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import clientReducer from '../reducers/clientReducer';
import productReducer from '../reducers/productReducer';
import cartReducer from '../reducers/cartReducer';
import authReducer from '../reducers/authReducer';

const rootReducer = combineReducers({
    client: clientReducer,
    product: productReducer,
    cart: cartReducer,
    auth: authReducer
});

const logger = createLogger({
    collapsed: true,
    diff: true
});

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;
