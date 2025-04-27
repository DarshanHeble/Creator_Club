import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens or other headers here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with an error status
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error:", error.request);
    } else {
      // Error in request configuration
      console.error("Request Error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
