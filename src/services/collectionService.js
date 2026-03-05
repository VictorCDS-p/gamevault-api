import { collectionRepository } from "../repositories/collectionRepository.js";
import { gameRepository } from "../repositories/gameRepository.js";

export const collectionService = {

  async create(userId, data) {
    return collectionRepository.create(userId, data);
  },

  async list(userId) {
    return collectionRepository.findAllByUser(userId);
  },

  async update(id, userId, data) {
    const collection = await collectionRepository.findById(id);
    if (!collection || collection.userId !== userId) throw new Error("Collection not found or access denied");

    return collectionRepository.update(id, data);
  },

  async delete(id, userId) {
    const collection = await collectionRepository.findById(id);
    if (!collection || collection.userId !== userId) throw new Error("Collection not found or access denied");

    return collectionRepository.delete(id);
  },

  async addGame(userId, collectionId, gameId) {
    const collection = await collectionRepository.findById(collectionId);
    if (!collection || collection.userId !== userId) throw new Error("Collection not found or access denied");

    const game = await gameRepository.findById(gameId);
    if (!game) throw new Error("Game not found");

    const exists = await collectionRepository.findGame(collectionId, gameId);
    if (exists) throw new Error("Game already in collection");

    return collectionRepository.addGame(collectionId, gameId);
  },

  async removeGame(userId, collectionId, gameId) {
    const collection = await collectionRepository.findById(collectionId);
    if (!collection || collection.userId !== userId) throw new Error("Collection not found or access denied");

    return collectionRepository.removeGame(collectionId, gameId);
  }

};