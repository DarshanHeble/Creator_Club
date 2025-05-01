import { UpdateUser, User, userRole } from "src/types";
import api from "./api";

export const userService = {
  async createUser(user: User): Promise<User> {
    try {
      const response = await api.post<User>("/users/", user);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create user");
    }
  },

  async getUser(userId: string): Promise<User> {
    try {
      const response = await api.get<User>(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch user");
    }
  },

  async updateUser(userId: string, userData: UpdateUser): Promise<User> {
    try {
      const response = await api.put<User>(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update user");
    }
  },

  async updateUserRole(userId: string, role: userRole): Promise<User> {
    try {
      const response = await api.put<User>(`/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update user role");
    }
  },

  async deleteUser(userId: string): Promise<void> {
    try {
      await api.delete(`/users/${userId}`);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete user");
    }
  },

  async isUsernameTaken(username: string): Promise<boolean> {
    try {
      const response = await api.get(`/users/check-username/${username}`);
      return response.data.is_taken;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to check username");
    }
  },
};

// Example usage:
// import { userService } from '@/services/userService';

// // Create user
// try {
//   const newUser = await userService.createUser({
//     id: "user123",
//     walletAddress: '0x...',
//     userName: 'john_doe',
//     role: 'fan',
//   });
//   console.log('User created:', newUser);
// } catch (error) {
//   console.error('Failed to create user:', error.message);
// }

// // Get user
// try {
//   const user = await userService.getUser('user123');
//   console.log('User fetched:', user);
// } catch (error) {
//   console.error('Failed to fetch user:', error.message);
// }

// // Check username
// try {
//   const isTaken = await userService.isUsernameTaken('john_doe');
//   console.log('Username is taken:', isTaken);
// } catch (error) {
//   console.error('Failed to check username:', error.message);
// }
