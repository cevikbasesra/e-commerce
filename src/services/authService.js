import axios from "axios";

// Safely get environment variable with fallback
const API_URL =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_API_URL) ||
  "https://workintech-fe-ecommerce.onrender.com/";

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get token from appropriate storage
const getStoredToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

// Consolidated interceptors
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
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
        if (credentials.rememberMe) {
          // Store in localStorage for "Remember Me"
          localStorage.setItem("token", response.data.token);
          sessionStorage.removeItem("token"); // Clean up any session token
        } else {
          // Store in sessionStorage if "Remember Me" is not checked
          sessionStorage.setItem("token", response.data.token);
          localStorage.removeItem("token"); // Clean up any persisted token
        }
        api.defaults.headers.common['Authorization'] = response.data.token;
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
    sessionStorage.removeItem("token");
    delete api.defaults.headers.common['Authorization'];
  },

  verifyToken: async () => {
    try {
      console.log('Making verify request');
      const token = getStoredToken();
      if (!token) {
        throw new Error('No token found');
      }

      const response = await api.get("/verify");
      console.log('Verify response:', response.status, response.data);
      
      if (response.status === 200) {
        console.log('Got successful response');
        if (response.data.token) {
          console.log('Updating token');
          // Keep the token in the same storage it was in
          if (localStorage.getItem("token")) {
            localStorage.setItem("token", response.data.token);
          } else {
            sessionStorage.setItem("token", response.data.token);
          }
          api.defaults.headers.common['Authorization'] = response.data.token;
        }
        return response.data;
      } else if (response.status === 204) {
        console.log('Token valid, but no data');
        return null;
      }
    } catch (error) {
      console.log('Verify error:', error);
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      delete api.defaults.headers.common['Authorization'];
      throw error;
    }
  },
};

export default authService;
