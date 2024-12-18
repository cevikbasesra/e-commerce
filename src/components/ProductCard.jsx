import React from 'react';

const ProductCard = ({ product, className = '' }) => {
  // Default product structure if no product is passed
  const {
    name = 'Product Name',
    price = 99.99,
    image = 'https://via.placeholder.com/150',
    description = 'Default product description'
  } = product || {};

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 ${className}`}>
      <img 
        src={image} 
        alt={name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
        <div className="flex justify-center items-center mt-4">
          <span className="text-xl font-bold text-blue-600">${price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
