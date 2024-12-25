import axios from "axios";

// Base URL for all API calls
const BASE_URL = "https://workintech-fe-ecommerce.onrender.com";

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API endpoints
export const endpoints = {
  products: "/products",
  categories: "/categories",
  product: (id) => `/products/${id}`,
};

export default api;
