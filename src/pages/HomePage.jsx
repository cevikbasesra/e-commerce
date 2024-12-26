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
          .map((product) => ({
            ...product,
            discount: Math.floor(Math.random() * 30), // Adding random discount between 0-30%
          }))
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
      <section className="w-screen relative left-[50%] right-[50%] -mx-[50vw]">
        <Slider imageUrl="/homepage-slider.optimized.jpeg" />
      </section>

      {/* Editor's Pick Section */}
      <section className="w-full px-4 py-12">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">EDITOR'S PICK</h2>
            <p className="text-gray-600">
              Discover our carefully curated selection of trending styles and
              must-have pieces
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-2/3 flex flex-col lg:flex-row gap-6">
                {topCategories.slice(0, 2).map((category, index) => (
                  <div
                    key={category.id}
                    className={`w-full ${
                      index === 0 ? "lg:w-[60%]" : "lg:w-[40%]"
                    } relative cursor-pointer group overflow-hidden h-[500px] lg:h-[750px]`}
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
                        `https://via.placeholder.com/800x600?text=${category.title}`
                      }
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
              <div className="w-full lg:w-1/3 flex flex-col justify-between h-[750px]">
                {topCategories.slice(2, 4).map((category, index) => (
                  <div
                    key={category.id}
                    className="relative cursor-pointer group overflow-hidden h-[350px]"
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
                        `https://via.placeholder.com/400x350?text=${category.title}`
                      }
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h5 className="text-gray-600 text-xl mb-2">Featured Products</h5>
          <h2 className="text-gray-900 text-4xl font-bold mb-4">
            BESTSELLER PRODUCTS
          </h2>
          <p className="text-gray-600">
            Problems trying to resolve the conflict between
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {bestsellerProducts.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Second Slider Section */}
      <section className="w-screen relative left-[50%] right-[50%] -mx-[50vw]">
        <Slider imageUrl="/homepage-slider-2.optimized.jpg" />
      </section>
    </div>
  );
};

export default HomePage;
