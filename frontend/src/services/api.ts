import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:8000", // Replace with your backend URL
  timeout: 5000, // Set a timeout for requests
});

// Example: Fetch data from an endpoint
export const fetchExampleData = async () => {
  try {
    const response = await api.get("/example-endpoint"); // Replace with your endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching example data:", error);
    throw error;
  }
};

export default api;
