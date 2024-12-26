// HomePage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import Slider from "../components/Slider.jsx";
import api, { endpoints } from "../services/apiService";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const navigate = useNavigate();
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch products and categories in parallel
        const [productsResponse, categoriesResponse] = await Promise.all([
          api.get(endpoints.products),
          api.get(endpoints.categories),
        ]);

        // Sort products by sell_count
        const sortedProducts = productsResponse.data.products
          .sort((a, b) => b.sell_count - a.sell_count)
          .slice(0, 8);
        setBestsellerProducts(sortedProducts);

        // Get unique categories by title and take top 4 by rating
        const uniqueCategories = categoriesResponse.data.reduce(
          (acc, current) => {
            const x = acc.find((item) => item.title === current.title);
            if (!x) {
              return acc.concat([current]);
            } else if (current.rating > x.rating) {
              // If we find a duplicate title with higher rating, replace the existing one
              return acc.map((item) =>
                item.title === current.title ? current : item
              );
            }
            return acc;
          },
          []
        );

        const sortedCategories = uniqueCategories
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4);

        setTopCategories(sortedCategories);
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col space-y-8">
      {/* Hero Section with Slider */}
      <section className="w-full">
        <Slider />
      </section>

      {/* Editor's Pick Section */}
      <section className="w-full px-4 py-12 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">EDITOR'S PICK</h2>
          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topCategories.map((category) => (
                <div
                  key={category.id}
                  className="relative group cursor-pointer overflow-hidden"
                  onClick={() =>
                    navigate(
                      `/shop/${
                        category.gender
                      }/${category.title.toLowerCase()}/${category.id}`
                    )
                  }
                >
                  <img
                    src={
                      category.img ||
                      `https://via.placeholder.com/400x500?text=${category.title}`
                    }
                    alt={category.title}
                    className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-10">
                    <div className="absolute bottom-6 left-6 bg-white py-2 px-4">
                      <h3 className="text-gray-900 text-lg font-semibold">
                        {category.title
                          ? category.title.toUpperCase()
                          : "CATEGORY"}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full">
        <h2 className="text-xl md:text-2xl text-center text-gray-800 mb-4">
          Featured Products
        </h2>
        <h2 className="text-2xl font-bold text-center mb-8">
          BESTSELLER PRODUCTS
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestsellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Second Slider Section */}
      <section className="w-full">
        <Slider />
      </section>
    </div>
  );
};

export default HomePage;
