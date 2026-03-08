import { gameService } from "../services/gameService.js";

export const gameController = {

  async create(req, res) {

    try {

      const game = await gameService.create(req.body);

      res.status(201).json(game);

    } catch (error) {

      res.status(400).json({
        message: error.message
      });

    }

  },

async list(req, res) {
  try {
    const { category } = req.query;
    const games = await gameService.list(category);

    const sortedGames = games.sort((a, b) => a.title.localeCompare(b.title, "pt", { sensitivity: "base" }));

    res.json(sortedGames);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
},

  async findById(req, res) {

    try {

      const game = await gameService.findById(req.params.id);

      res.json(game);

    } catch (error) {

      res.status(404).json({
        message: error.message
      });

    }

  },

  async update(req, res) {

    try {

      const game = await gameService.update(req.params.id, req.body);

      res.json(game);

    } catch (error) {

      res.status(400).json({
        message: error.message
      });

    }

  },

  async delete(req, res) {

    try {

      await gameService.delete(req.params.id);

      res.json({
        message: "Game deleted"
      });

    } catch (error) {

      res.status(400).json({
        message: error.message
      });

    }

  }

};