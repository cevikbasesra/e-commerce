import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import api, { endpoints } from "../services/apiService";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useContext } from "react";
import { MenuContext } from "../context/MenuContext";
import Breadcrumb from "../components/Breadcrumb";

const ShopPage = () => {
  const { category, categoryId } = useParams();
  const { isMenuOpen } = useContext(MenuContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      // Set single view for mobile screens (less than 768px)
      return window.innerWidth < 768 ? "single" : "grid";
    }
    return "grid"; // Default for server-side rendering
  });
  const [sortOption, setSortOption] = useState("");
  const [filter, setFilter] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [categoryProducts, setCategoryProducts] = useState({});

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    // Update view mode when window is resized
    const handleResize = () => {
      if (window.innerWidth < 768 && viewMode !== "single") {
        setViewMode("single");
      } else if (window.innerWidth >= 768 && viewMode === "single") {
        setViewMode("grid");
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      fetchCategoryProductCounts();
      fetchProducts();
    }
  }, [categoryId, filter, sortOption, currentPage, categories]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (categoryId && categoryId !== "undefined") {
        params.append("category", categoryId);
      }
      if (filter) params.append("filter", filter);
      if (sortOption) params.append("sort", sortOption);
      params.append("limit", ITEMS_PER_PAGE.toString());
      params.append("offset", (currentPage * ITEMS_PER_PAGE).toString());

      const queryString = params.toString();
      const url = `${endpoints.products}${queryString ? `?${queryString}` : ""}`;

      const response = await api.get(url);
      if (response.data.products?.length === 0) {
        setError("No products found in this category.");
      } else {
        setError(null);
      }

      setProducts(response.data.products);
      setTotalProducts(response.data.total || response.data.products.length);
    } catch (error) {
      setError("Error loading products.");
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get(endpoints.categories);
      
      // Get unique categories by title and take top 5 by rating
      const uniqueCategories = response.data.reduce((acc, current) => {
        const x = acc.find(item => item.title === current.title);
        if (!x) {
          return acc.concat([current]);
        } else if (current.rating > x.rating) {
          // If we find a duplicate title with higher rating, replace the existing one
          return acc.map(item => item.title === current.title ? current : item);
        }
        return acc;
      }, []);

      const sortedCategories = uniqueCategories
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

      setCategories(sortedCategories);
      setTotalCategories(sortedCategories.length);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCategoryProductCounts = async () => {
    try {
      const counts = {};
      for (const category of categories) {
        const response = await api.get(
          `${endpoints.products}?category=${category.id}&limit=1`
        );
        counts[category.id] = response.data.total || 0;
      }
      setCategoryProducts(counts);
    } catch (error) {
      console.error("Error fetching category counts:", error);
    }
  };

  const sortOptions = [
    { value: "", label: "Sort by" },
    { value: "price:asc", label: "Price: Low to High" },
    { value: "price:desc", label: "Price: High to Low" },
    { value: "rating:asc", label: "Rating: Low to High" },
    { value: "rating:desc", label: "Rating: High to Low" },
  ];

  const getGridClass = () => {
    switch (viewMode) {
      case "single": return "grid-cols-1 max-w-2xl mx-auto";
      case "double": return "grid-cols-2 max-w-4xl mx-auto";
      case "grid": return "grid-cols-4 max-w-7xl mx-auto";
      case "list": return "grid-cols-1 max-w-4xl mx-auto";
      default: return "grid-cols-4 max-w-7xl mx-auto";
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setFilter(filterInput);
    setCurrentPage(0);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageCount = Math.max(Math.ceil(totalProducts / ITEMS_PER_PAGE), 1);

  const handleCategoryClick = (cat) => {
    navigate(`/shop/${cat.name.toLowerCase()}/${cat.id}`);
  };

  return (
    <div className="container mx-auto">
      {/* Categories Section */}
      <div className="w-screen relative left-[50%] right-[50%] -mx-[50vw] bg-[#F9F9F9]">
        <div className="container mx-auto">
          <div className={`px-4 md:px-8 py-20 ${isMenuOpen ? 'pt-24' : ''}`}>
            <Breadcrumb 
              items={[
                { label: 'Home', link: '/' },
                { label: 'Shop' }
              ]} 
            />
            <div className="flex justify-center mb-12">
              <h2 className="text-3xl font-semibold">Shop</h2>
            </div>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-4">TOP CATEGORIES</h2>
              <p className="text-gray-600">
                Discover our highest-rated and most popular shopping categories
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="relative cursor-pointer group overflow-hidden h-[300px] shadow-md hover:shadow-xl transition-all duration-300"
                  onClick={() => navigate(`/shop/${category.title.toLowerCase()}/${category.id}`)}
                >
                  <img
                    src={category.img || `https://via.placeholder.com/400x300?text=${category.title}`}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-10 flex flex-col items-center justify-center text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      {category.title ? category.title.toUpperCase() : 'CATEGORY'}
                    </h3>
                    <div className="text-sm">
                      {category.rating.toFixed(1)}★
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results and Products Container */}
      <div className="mt-16">
        {/* Top Section */}
        <div className="hidden md:grid md:grid-cols-3 md:items-center mb-6 max-w-7xl mx-auto px-8">
          {/* Results Count - Left */}
          <p className="text-gray-600">
            Showing {currentPage * ITEMS_PER_PAGE + 1}-{Math.min((currentPage + 1) * ITEMS_PER_PAGE, totalProducts)} of {totalProducts}{" "}
            {totalProducts === 1 ? "result" : "results"}
          </p>

          {/* View Options - Center */}
          <div className="flex justify-center items-center">
            <div className="flex items-center gap-6 p-3">
              <span className="text-gray-600 font-medium">Views:</span>
              <div className="flex gap-3">
                <button
                  onClick={() => setViewMode("single")}
                  className={`p-2.5 rounded-md border ${
                    viewMode === "single"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                  aria-label="Single column view"
                  title="Single column"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <rect x="4" y="5" width="16" height="14" rx="1" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("double")}
                  className={`p-2.5 rounded-md border ${
                    viewMode === "double"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                  aria-label="Double column view"
                  title="Double column"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h8v14H3V5zm10 0h8v14h-8V5z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-md border ${
                    viewMode === "grid"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h4v4H4V6zm6 0h4v4h-4V6zm6 0h4v4h-4V6zm-12 6h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-md border ${
                    viewMode === "list"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                  aria-label="List view"
                  title="List view"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Filter and Sort - Right */}
          <div className="flex justify-end items-center gap-4">
            <form onSubmit={handleFilterSubmit} className="flex gap-2">
              <input
                type="text"
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
                placeholder="Filter products..."
                className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary whitespace-nowrap"
              >
                Filter
              </button>
            </form>

            <select
              value={sortOption}
              onChange={handleSortChange}
              className="w-28 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden mb-6">
          {/* Results Count */}
          <div className="mb-4 flex justify-center">
            <p className="text-gray-600">
              Showing {currentPage * ITEMS_PER_PAGE + 1}-{Math.min((currentPage + 1) * ITEMS_PER_PAGE, totalProducts)} of {totalProducts}{" "}
              {totalProducts === 1 ? "result" : "results"}
            </p>
          </div>

          {/* View Options */}
          <div className="mb-4 flex justify-center items-center">
            <div className="flex items-center gap-6 p-3">
              <span className="text-gray-600 font-medium">Views:</span>
              <div className="flex gap-3">
                <button
                  onClick={() => setViewMode("single")}
                  className={`p-2.5 rounded-md border ${
                    viewMode === "single"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                  aria-label="Single column view"
                  title="Single column"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <rect x="4" y="5" width="16" height="14" rx="1" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("double")}
                  className={`p-2.5 rounded-md border ${
                    viewMode === "double"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                  aria-label="Double column view"
                  title="Double column"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h8v14H3V5zm10 0h8v14h-8V5z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-md border ${
                    viewMode === "grid"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h4v4H4V6zm6 0h4v4h-4V6zm6 0h4v4h-4V6zm-12 6h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-md border ${
                    viewMode === "list"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                  aria-label="List view"
                  title="List view"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Filter and Sort Section */}
          <div className="mb-4 flex justify-center">
            <div className="flex gap-4 items-center">
              <form onSubmit={handleFilterSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={filterInput}
                  onChange={(e) => setFilterInput(e.target.value)}
                  placeholder="Filter products..."
                  className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary whitespace-nowrap"
                >
                  Filter
                </button>
              </form>

              <select
                value={sortOption}
                onChange={handleSortChange}
                className="w-28 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center py-4 px-6 bg-gray-100 rounded-lg mb-6 max-w-2xl mx-auto">
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className={`grid ${getGridClass()} gap-4 md:gap-6 px-8 pb-20`}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                routeParams={{
                  category: category || product.category_code?.split(":")[0] || "unisex",
                  categoryName: category || product.category_code?.split(":")[1] || "all",
                  categoryId: categoryId || product.category_id || "1",
                }}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="border border-[#BDBDBD] rounded-lg overflow-hidden">
              <ReactPaginate
                previousLabel="First"
                nextLabel="Next"
                pageCount={pageCount}
                onPageChange={handlePageChange}
                forcePage={currentPage}
                pageRangeDisplayed={2}
                marginPagesDisplayed={0}
                containerClassName="flex items-center border border-[#BDBDBD]"
                pageClassName="border-x border-[#BDBDBD]"
                pageLinkClassName="px-4 py-6 block hover:bg-gray-50 cursor-pointer transition-colors duration-200 text-primary font-bold"
                previousClassName="border-r border-[#BDBDBD]"
                previousLinkClassName="px-6 py-6 block hover:bg-gray-50 cursor-pointer text-primary font-bold min-w-[100px] text-center"
                nextClassName="border-l border-[#BDBDBD]"
                nextLinkClassName="px-6 py-6 block hover:bg-gray-50 cursor-pointer text-primary font-bold min-w-[100px] text-center"
                activeClassName="bg-primary text-white"
                activeLinkClassName="bg-primary text-white !important"
                disabledClassName="text-gray-400 cursor-not-allowed"
                breakClassName="px-4 py-2"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
