import * as types from './types/wishlistTypes';

export const addToWishlist = (product) => {
  return {
    type: types.ADD_TO_WISHLIST,
    payload: product,
  };
};

export const removeFromWishlist = (productId) => {
  return {
    type: types.REMOVE_FROM_WISHLIST,
    payload: productId,
  };
};

export const clearWishlist = () => {
  return {
    type: types.CLEAR_WISHLIST,
  };
};
