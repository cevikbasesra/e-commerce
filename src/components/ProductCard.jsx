import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, routeParams, viewMode = "single" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (routeParams) {
      const { category, categoryId } = routeParams;
      const nameSlug = product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      navigate(`/shop/${category}/${categoryId}/${nameSlug}/${product.id}`);
    } else {
      // Default category handling
      const category = product.category_title?.toLowerCase() || 'all';
      const categoryId = product.category_id || '1';
      const nameSlug = product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      navigate(`/shop/${category}/${categoryId}/${nameSlug}/${product.id}`);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url,
      quantity: 1
    }));
  };

  if (viewMode === "single") {
    return (
      <div 
        onClick={handleClick}
        className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg flex flex-col p-4 items-center text-center max-w-xl mx-auto"
      >
        <div className="w-full relative max-w-md aspect-[4/3] rounded-lg overflow-hidden">
          <img
            src={product.images[0]?.url || 'https://via.placeholder.com/300x400?text=No+Image'}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="mt-4 max-w-lg">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {product.name}
            </h3>
            
            <p className="text-gray-500 text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-4 flex flex-col items-center space-y-3">
            <div className="flex items-center space-x-3">
              {product?.discount !== undefined && product.discount !== 0 ? (
                <>
                  <span className="text-base text-[#BDBDBD] line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xl font-bold text-[#23856D]">
                    ${(product.price - (product.price * product.discount / 100)).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-[#23856D]">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#23A6F0] cursor-pointer"></div>
              <div className="w-4 h-4 rounded-full bg-[#23856D] cursor-pointer"></div>
              <div className="w-4 h-4 rounded-full bg-[#E77C40] cursor-pointer"></div>
              <div className="w-4 h-4 rounded-full bg-[#252B42] cursor-pointer"></div>
            </div>
            <div className="flex items-center justify-center mt-3 space-x-2">
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a85c2] transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div 
        onClick={handleClick}
        className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg flex items-center gap-6 p-4"
      >
        <div className="w-32 h-32 rounded overflow-hidden">
          <img
            src={product.images[0]?.url || 'https://via.placeholder.com/300x400?text=No+Image'}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          
          <p className="mt-1 text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-right">
            {product?.discount !== undefined && product.discount !== 0 ? (
              <>
                <div className="text-sm text-[#BDBDBD] line-through">
                  ${product.price.toFixed(2)}
                </div>
                <div className="text-lg font-bold text-[#23856D]">
                  ${(product.price - (product.price * product.discount / 100)).toFixed(2)}
                </div>
              </>
            ) : (
              <div className="text-lg font-bold text-[#23856D]">
                ${product.price.toFixed(2)}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-[#23A6F0]"></div>
            <div className="w-3 h-3 rounded-full bg-[#23856D]"></div>
            <div className="w-3 h-3 rounded-full bg-[#E77C40]"></div>
            <div className="w-3 h-3 rounded-full bg-[#252B42]"></div>
          </div>
          <div className="flex items-center justify-center mt-3 space-x-2">
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a85c2] transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === "grid" || viewMode === "double") {
    return (
      <div 
        onClick={handleClick}
        className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg flex flex-col"
      >
        <div className="relative aspect-square">
          <img
            src={product.images[0]?.url || 'https://via.placeholder.com/300x400?text=No+Image'}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-3 md:p-4 text-center">
          <h3 className="text-sm md:text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          
          <p className="mt-1 text-xs md:text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-2 md:mt-4">
            <div className="flex items-center justify-center space-x-2 md:space-x-3">
              {product?.discount !== undefined && product.discount !== 0 ? (
                <>
                  <span className="text-xs md:text-sm text-[#BDBDBD] line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm md:text-lg font-bold text-[#23856D]">
                    ${(product.price - (product.price * product.discount / 100)).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-sm md:text-lg font-bold text-[#23856D]">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="mt-2 md:mt-3 flex justify-center items-center space-x-1.5 md:space-x-2">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#23A6F0] cursor-pointer"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#23856D] cursor-pointer"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#E77C40] cursor-pointer"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#252B42] cursor-pointer"></div>
            </div>
            <div className="flex items-center justify-center mt-3 space-x-2">
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a85c2] transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Double view (default)
  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-[3/4]">
        <img
          src={product.images[0]?.url || 'https://via.placeholder.com/300x400?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        
        <p className="mt-2 text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex justify-center items-center space-x-2">
          {product?.discount !== undefined && product.discount !== 0 ? (
            <>
              <span className="text-sm text-[#BDBDBD] line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-lg font-bold text-[#23856D]">
                ${(product.price - (product.price * product.discount / 100)).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-[#23856D]">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="mt-3 flex justify-center items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-[#23A6F0] cursor-pointer"></div>
          <div className="w-4 h-4 rounded-full bg-[#23856D] cursor-pointer"></div>
          <div className="w-4 h-4 rounded-full bg-[#E77C40] cursor-pointer"></div>
          <div className="w-4 h-4 rounded-full bg-[#252B42] cursor-pointer"></div>
        </div>
        <div className="flex items-center justify-center mt-3 space-x-2">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a85c2] transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
