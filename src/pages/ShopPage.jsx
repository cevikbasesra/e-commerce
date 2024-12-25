import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import api, { endpoints } from '../services/apiService';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const ShopPage = () => {
  const { gender, categoryName, categoryId } = useParams();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  
  const ITEMS_PER_PAGE = 12; // Number of products per page
  
  // Filter states
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  
  const sortOptions = [
    { value: '', label: 'Select Sort Option' },
    { value: 'price:asc', label: 'Price: Low to High' },
    { value: 'price:desc', label: 'Price: High to Low' },
    { value: 'rating:asc', label: 'Rating: Low to High' },
    { value: 'rating:desc', label: 'Rating: High to Low' }
  ];

  const filterOptions = [
    'Siyah',
    'Beyaz',
    'Kırmızı',
    'Mavi',
    'Yeşil',
    'Pamuk',
    'Basic'
  ];

  useEffect(() => {
    fetchProducts();
  }, [categoryId, filter, sort, currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (categoryId) params.append('category', categoryId);
      if (filter) params.append('filter', filter);
      if (sort) params.append('sort', sort);
      params.append('limit', ITEMS_PER_PAGE.toString());
      params.append('offset', (currentPage * ITEMS_PER_PAGE).toString());
      
      const queryString = params.toString();
      const url = `${endpoints.products}${queryString ? `?${queryString}` : ''}`;
      
      const response = await api.get(url);
      setProducts(response.data.products);
      setTotalProducts(response.data.total || response.data.products.length);
      setError(null);
    } catch (error) {
      setError('Failed to fetch products');
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter === filter ? '' : selectedFilter);
    setShowFilters(false);
    setCurrentPage(0); // Reset to first page when filter changes
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(0); // Reset to first page when sort changes
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate pageCount
  const pageCount = Math.max(Math.ceil(totalProducts / ITEMS_PER_PAGE), 1);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter and Sort Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 w-full md:w-auto">
          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              {filter || 'Filter'}
            </button>

            {/* Filter Dropdown */}
            {showFilters && (
              <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg p-2">
                {filterOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange(option)}
                    className={`w-full text-left px-4 py-2 text-sm rounded-md ${
                      filter === option
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={handleSortChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                routeParams={{ gender, categoryName, categoryId }}
              />
            ))}
          </div>

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="mt-8 flex justify-center">
              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageCount={pageCount}
                onPageChange={handlePageChange}
                forcePage={currentPage}
                containerClassName="flex gap-2"
                pageClassName="px-3 py-2 rounded-md hover:bg-gray-100"
                previousClassName="px-3 py-2 rounded-md hover:bg-gray-100"
                nextClassName="px-3 py-2 rounded-md hover:bg-gray-100"
                activeClassName="bg-blue-500 text-white hover:bg-blue-600"
                disabledClassName="text-gray-400 cursor-not-allowed"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShopPage;
