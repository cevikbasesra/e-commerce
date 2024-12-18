// HomePage.js
import React from "react";
import ProductCard from "../components/ProductCard.jsx";

const HomePage = () => {
  // Mock product data
  const products = [
    {
      id: 1,
      name: "Elegant Dress",
      price: 129.99,
      image: "https://via.placeholder.com/300x400?text=Dress",
      description: "Beautiful evening dress for special occasions",
    },
    {
      id: 2,
      name: "Casual Sneakers",
      price: 79.99,
      image: "https://via.placeholder.com/300x400?text=Sneakers",
      description: "Comfortable everyday sneakers",
    },
    {
      id: 3,
      name: "Leather Jacket",
      price: 199.99,
      image: "https://via.placeholder.com/300x400?text=Jacket",
      description: "Classic leather jacket for all seasons",
    },
    {
      id: 4,
      name: "Stylish Sunglasses",
      price: 49.99,
      image: "https://via.placeholder.com/300x400?text=Sunglasses",
      description: "Trendy sunglasses to complete your look",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 text-center">
      <div className="flex flex-col items-center">
        <p className="text-l mb-0">Featured Products</p>
        <h2 className="text-2xl text-gray-600 font-bold leading-tight whitespace-pre-line">
          {"BESTSELLER\nPRODUCTS"}
        </h2>
        <p className="text-xs text-gray-500 mb-4 whitespace-pre-line">
          {"Problems trying to resolve the\nconflict between"}
        </p>
      </div>

      <section>
        <div className="flex flex-col space-y-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="w-full"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
