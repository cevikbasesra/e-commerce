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
      className="h-full bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg relative z-10 hover:z-20"
    >
      <div className="relative aspect-w-3 aspect-h-4">
        <img
          src={product.images[0]?.url || 'https://via.placeholder.com/300x400?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex justify-center items-center space-x-2">
          {console.log('Product:', product)}
          {product?.discount !== undefined && product.discount !== 0 ? (
            <>
              <span className="text-sm text-[#BDBDBD]">
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
      </div>
    </div>
  );
};

export default ProductCard;
