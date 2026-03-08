import { libraryService } from "../services/libraryService.js";

const ALLOWED_STATUSES = ["PLAYING", "COMPLETED", "BACKLOG", "DROPPED"];

export const libraryController = {
  async addGame(req, res) {
    try {
      const game = await libraryService.addGame(
        req.user.id,
        Number(req.params.gameId)
      );
      res.status(201).json(game);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async removeGame(req, res) {
    try {
      await libraryService.removeGame(req.user.id, Number(req.params.gameId));
      res.json({ message: "Game removed from library" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async updateStatus(req, res) {
    try {
      const { status } = req.body;

      if (!status || !ALLOWED_STATUSES.includes(status)) {
        return res.status(400).json({
          message: `Status inválido. Deve ser um dos: ${ALLOWED_STATUSES.join(
            ", "
          )}`,
        });
      }

      const updated = await libraryService.updateStatus(
        req.user.id,
        Number(req.params.gameId),
        status
      );

      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async list(req, res) {
    try {
      const library = await libraryService.listLibrary(req.user.id);
      res.json(library);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};