import * as types from './types/cartTypes';

export const setCart = (cart) => ({
    type: types.SET_CART,
    payload: cart
});

export const setPayment = (payment) => ({
    type: types.SET_PAYMENT,
    payload: payment
});

export const setAddress = (address) => ({
    type: types.SET_ADDRESS,
    payload: address
});
