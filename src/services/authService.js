import axios from "axios";

// Safely get environment variable with fallback
const API_URL =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_API_URL) ||
  "https://workintech-fe-ecommerce.onrender.com/";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Consolidated interceptors
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post("/login", credentials);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login Error:', {
        error: error.response ? error.response.data : error.message,
        status: error.response?.status
      });
      throw error.response ? error.response.data : new Error("Login failed");
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/signup", userData);
      return response.data;
    } catch (error) {
      console.error('Register Error:', {
        error: error.response ? error.response.data : error.message,
        status: error.response?.status
      });
      throw error.response ? error.response.data : new Error("Registration failed");
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    } catch (error) {
      console.error('Logout Error:', error);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  },

  verifyToken: async () => {
    try {
      const response = await api.get("/verify-token");
      return response.data;
    } catch (error) {
      console.error('Verify Token Error:', {
        error: error.response ? error.response.data : error.message,
        status: error.response?.status
      });
      localStorage.removeItem("token");
      throw error;
    }
  },
};

export default authService;
