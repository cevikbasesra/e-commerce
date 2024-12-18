import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    client: clientReducer,
    products: productReducer,
    cart: cartReducer
});

export default rootReducer;
