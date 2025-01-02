import axios from "axios";
import { toast } from 'react-toastify';

// Base URL for all API calls - using proxy for local development
const BASE_URL = "/api";  // This will be proxied to https://workintech-fe-ecommerce.onrender.com

// API endpoints
export const endpoints = {
  products: "/products",
  productsByCategory: (categoryId) => `/products?category=${categoryId}`,
  product: (id) => `/products/${id}`,
  categories: "/categories",
  address: "/user/address",
  order: "/order",        // Used for both creating and fetching orders
  cart: "/cart",
  auth: {
    login: "/login",
    register: "/register",
    verify: "/verify"
  }
};

// Get token from localStorage only
const getStoredToken = () => {
  return localStorage.getItem("token");
};

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors and server issues
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error
      toast.error('Unable to connect to the server. Please check your internet connection.');
      return Promise.reject(error);
    }

    switch (error.response.status) {
      case 401:
        localStorage.removeItem("token");
        delete api.defaults.headers.common['Authorization'];
        toast.error('Your session has expired. Please log in again.');
        window.location.href = '/login';
        break;
      case 502:
      case 503:
      case 504:
        toast.error('Our servers are temporarily unavailable. We are working to restore service as quickly as possible.');
        break;
      case 400:
        toast.error(error.response.data?.message || 'Invalid request. Please check your input.');
        break;
      default:
        toast.error('An unexpected error occurred. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);

export default api;
