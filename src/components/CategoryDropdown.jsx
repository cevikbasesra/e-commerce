import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectProducts } from '../actions/productActions';

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = useSelector(selectProducts);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/shop/${category.gender}/${category.name}/${category.id}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        Categories
      </button>

      {isOpen && (
        <div className="absolute z-50 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
