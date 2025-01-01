import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../actions/wishlistActions';
import { X } from 'lucide-react';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="relative">
                <img
                  src={item.images?.[0] || item.image || 'https://via.placeholder.com/300'}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-[#23A6F0] font-bold mt-2">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
