import { userRepository } from "../repositories/userRepository.js";

export const userService = {

  async getProfile(userId) {
    return userRepository.findById(userId);
  },

  async getProfileWithStats(userId) {

    const user = await userRepository.findById(userId);

    const stats = await userRepository.getLibraryStats(userId);

    return {
      ...user,
      stats
    };

  },

  async getAllUsers() {
    return userRepository.findAll();
  },

  async updateProfile(userId, data) {
    return userRepository.update(userId, data);
  },

  async deleteUser(userId) {
    return userRepository.remove(userId);
  }

};