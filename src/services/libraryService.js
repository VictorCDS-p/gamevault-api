import { libraryRepository } from "../repositories/libraryRepository.js";
import { gameRepository } from "../repositories/gameRepository.js";

export const libraryService = {
  async addGame(userId, gameId) {
    const game = await gameRepository.findById(gameId);
    if (!game) throw new Error("Game not found");

    const exists = await libraryRepository.findGameInLibrary(userId, gameId);
    if (exists) throw new Error("Game already in library");

    return libraryRepository.addGame(userId, gameId);
  },

  async removeGame(userId, gameId) {
    return libraryRepository.removeGame(userId, gameId);
  },

  async updateStatus(userId, gameId, status) {
    const game = await libraryRepository.findGameInLibrary(userId, gameId);
    if (!game) throw new Error("Game not in library");

    return libraryRepository.updateStatus(userId, gameId, status);
  },

  async listLibrary(userId) {
    return libraryRepository.listUserLibrary(userId);
  },
};