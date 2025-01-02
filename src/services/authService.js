import axios from "axios";

const API_URL = "https://workintech-fe-ecommerce.onrender.com/";

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get token from storage (only localStorage as per requirements)
const getStoredToken = () => {
  return localStorage.getItem("token");
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      delete api.defaults.headers.common['Authorization'];
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
        // Only store in localStorage if rememberMe is true
        if (credentials.rememberMe) {
          localStorage.setItem("token", response.data.token);
          api.defaults.headers.common['Authorization'] = response.data.token;
        }
      }
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || 'An error occurred during login',
        status: error.response?.status,
        data: error.response?.data
      };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common['Authorization'];
  },

  verifyToken: async () => {
    try {
      const token = getStoredToken();
      if (!token) {
        throw new Error('No token found');
      }

      const response = await api.get("/verify");
      
      if (response.status === 200 && response.data) {
        // Update token if a new one is provided
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          api.defaults.headers.common['Authorization'] = response.data.token;
        }
        return response.data;
      }
      
      return null;
    } catch (error) {
      localStorage.removeItem("token");
      delete api.defaults.headers.common['Authorization'];
      throw error;
    }
  }
};

export default authService;
