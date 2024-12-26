import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, selectTopCategories } from '../actions/categoryActions';

const TopCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const topCategories = useSelector(selectTopCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    navigate(`/shop/${category.gender}/${category.name}/${category.id}`);
  };

  return (
    <div className="flex flex-wrap -mx-2 p-4">
      {topCategories.map((category) => (
        <div
          key={category.id}
          onClick={() => handleCategoryClick(category)}
          className="w-full md:w-1/5 px-2 mb-4 cursor-pointer transform transition-transform hover:scale-105"
        >
          <div className="relative aspect-square overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold text-center">
                {category.name}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopCategories;
