import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:8000", // Replace with your backend URL
  timeout: 5000, // Set a timeout for requests
});

export default api;
