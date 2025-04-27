import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:8000", // Replace with your backend URL
  timeout: 5000, // Set a timeout for requests
});

// Example: Fetch user data
export const fetchUsers = async () => {
  try {
    const response = await api.get("/users"); // Replace with your actual endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Example: Create a new user
export const createUser = async (userData: {
  walletAddress: string;
  userName?: string;
  email?: string;
  password: string;
  isCreator: boolean;
}) => {
  try {
    const response = await api.post("/users", userData); // Replace with your actual endpoint
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Example: Fetch a single user by ID
export const fetchUserById = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`); // Replace with your actual endpoint
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

// Example: Update a user
export const updateUser = async (userId: string, updatedData: Partial<{ userName: string; email: string }>) => {
  try {
    const response = await api.put(`/users/${userId}`, updatedData); // Replace with your actual endpoint
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

// Example: Delete a user
export const deleteUser = async (userId: string) => {
  try {
    const response = await api.delete(`/users/${userId}`); // Replace with your actual endpoint
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};

export default api;