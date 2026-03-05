import { collectionService } from "../services/collectionService.js";

export const collectionController = {

  async create(req, res) {
    try {
      const collection = await collectionService.create(req.user.id, req.body);
      res.status(201).json(collection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async list(req, res) {
    try {
      const collections = await collectionService.list(req.user.id);
      res.json(collections);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const collectionId = Number(req.params.id);

      const collection = await collectionService.update(
        collectionId,
        req.user.id,
        req.body
      );

      res.json(collection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const collectionId = Number(req.params.id);

      await collectionService.delete(collectionId, req.user.id);

      res.json({ message: "Collection deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async addGame(req, res) {
    try {
      const collectionId = Number(req.params.collectionId);
      const gameId = Number(req.params.gameId);

      const result = await collectionService.addGame(
        req.user.id,
        collectionId,
        gameId
      );

      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async removeGame(req, res) {
    try {
      const collectionId = Number(req.params.collectionId);
      const gameId = Number(req.params.gameId);

      await collectionService.removeGame(
        req.user.id,
        collectionId,
        gameId
      );

      res.json({ message: "Game removed from collection successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

};