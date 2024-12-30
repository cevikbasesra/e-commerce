import * as types from './types/cartTypes';

export const addToCart = (product) => ({
  type: types.ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: types.REMOVE_FROM_CART,
  payload: productId,
});

export const updateCartItem = (productId, quantity) => ({
  type: types.UPDATE_CART_ITEM,
  payload: { productId, quantity },
});

export const setCart = (cart) => ({
  type: types.SET_CART,
  payload: cart,
});

export const clearCart = () => ({
  type: types.CLEAR_CART,
});

export const setPayment = (payment) => ({
  type: types.SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: types.SET_ADDRESS,
  payload: address,
});
