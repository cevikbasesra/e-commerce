import axios from "axios";

// Base URL for all API calls
const BASE_URL = "https://workintech-fe-ecommerce.onrender.com";

// Get token from appropriate storage
const getStoredToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
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

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login on auth error
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  products: "/products",
  categories: "/categories",
  product: (id) => `/products/${id}`,
  address: "/user/address",
};

export default api;
