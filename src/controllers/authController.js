import { authService } from "../services/authService.js";

export const authController = {

  async register(req, res) {

    try {

      const user = await authService.register(req.body);

      res.status(201).json(user);

    } catch (error) {

      res.status(400).json({
        message: error.message
      });

    }

  },

  async login(req, res) {

    try {

      const data = await authService.login(req.body);

      res.json(data);

    } catch (error) {

      res.status(400).json({
        message: error.message
      });

    }

  }

};