import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromWishlist } from '../actions/wishlistActions';
import { addToCart } from '../actions/cartActions';
import { X, ShoppingCart } from 'lucide-react';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const navigateToProduct = (item) => {
    const category = item.category_title?.toLowerCase() || 'all';
    const categoryId = item.category_id || '1';
    const nameSlug = item.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    navigate(`/shop/${category}/${categoryId}/${nameSlug}/${item.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold text-center mb-8">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => navigateToProduct(item)}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg flex flex-col p-4 items-center text-center"
            >
              <div className="relative w-full max-w-md aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={item.images?.[0]?.url || item.image || 'https://via.placeholder.com/300x400?text=No+Image'}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeFromWishlist(item.id));
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="mt-4 max-w-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.name}
                </h3>
                
                {item.description && (
                  <p className="text-gray-500 text-base leading-relaxed">
                    {item.description}
                  </p>
                )}

                <div className="mt-4 flex flex-col items-center space-y-3">
                  <div className="flex items-center space-x-3">
                    {item?.discount !== undefined && item.discount !== 0 ? (
                      <>
                        <span className="text-base text-[#BDBDBD] line-through">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-xl font-bold text-[#23856D]">
                          ${(item.price - (item.price * item.discount / 100)).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-[#23856D]">
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-[#23A6F0] cursor-pointer"></div>
                    <div className="w-4 h-4 rounded-full bg-[#23856D] cursor-pointer"></div>
                    <div className="w-4 h-4 rounded-full bg-[#E77C40] cursor-pointer"></div>
                    <div className="w-4 h-4 rounded-full bg-[#252B42] cursor-pointer"></div>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(item, e)}
                    className="px-4 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a85c2] transition-colors w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
