import { userRepository } from "../repositories/userRepository.js";

export const userService = {

  async getProfile(userId) {
    return userRepository.findById(userId);
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