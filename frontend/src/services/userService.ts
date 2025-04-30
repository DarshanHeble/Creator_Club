import { User } from "src/types";
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

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    try {
      const response = await api.put<User>(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update user");
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

// Use like this
// import { userService } from '@/services/userService';

// // Create user
// try {
//   const newUser = await userService.createUser({
//     walletAddress: '0x...',
//     userName: 'john_doe',
//     isCreator: false
//   });
//   console.log('User created:', newUser);
// } catch (error) {
//   console.error('Failed to create user:', error.message);
// }

// // Check username
// try {
//   const isTaken = await userService.isUsernameTaken('john_doe');
//   console.log('Username is taken:', isTaken);
// } catch (error) {
//   console.error('Failed to check username:', error.message);
// }
