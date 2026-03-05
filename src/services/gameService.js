import { gameRepository } from "../repositories/gameRepository.js";

export const gameService = {

  async create(data) {

    const game = await gameRepository.create(data);

    return game;

  },

  async list(category) {

    if (category) {
      return gameRepository.findByCategory(category);
    }

    return gameRepository.findAll();

  },

  async findById(id) {

    const game = await gameRepository.findById(Number(id));

    if (!game) {
      throw new Error("Game not found");
    }

    return game;

  },

  async update(id, data) {

    return gameRepository.update(Number(id), data);

  },

  async delete(id) {

    return gameRepository.delete(Number(id));

  }

};