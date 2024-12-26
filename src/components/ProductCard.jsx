import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, routeParams }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (routeParams) {
      // If routeParams is provided (from ShopPage), use them for navigation
      const { gender, categoryName, categoryId } = routeParams;
      const nameSlug = product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      navigate(`/shop/${gender}/${categoryName}/${categoryId}/${nameSlug}/${product.id}`);
    } else {
      // If routeParams is not provided (from HomePage), navigate to product directly
      // Extract gender and category from product data
      const categoryCode = product.category_code || 'unisex'; // Default to unisex if not provided
      const [gender = 'unisex', category = 'all'] = categoryCode.split(':');
      
      navigate(`/shop/${gender}/${category}/${product.category_id || 1}/product-${product.id}/${product.id}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      <div className="relative aspect-w-3 aspect-h-4">
        <img
          src={product.images[0]?.url || 'https://via.placeholder.com/300x400?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            -{product.discount}%
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${(product.price * (1 + product.discount/100)).toFixed(2)}
              </span>
            )}
          </div>
          
          {product.stock > 0 ? (
            <span className="text-green-500 text-sm">In Stock</span>
          ) : (
            <span className="text-red-500 text-sm">Out of Stock</span>
          )}
        </div>

        <div className="mt-2 flex items-center space-x-1">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${
                index < Math.round(product.rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm text-gray-600 ml-1">
            ({product.rating.toFixed(1)})
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
