import { userService } from "../services/userService.js";

export const userController = {

  async getProfile(req, res) {

    try {

      const user = await userService.getProfile(req.user.id);

      res.json(user);

    } catch (error) {

      res.status(400).json({
        message: error.message
      });

    }

  },

  async updateProfile(req, res) {

    try {

      const user = await userService.updateProfile(req.user.id, req.body);

      res.json(user);

    } catch (error) {

      res.status(400).json({
        message: error.message
      });

    }

  },

async deleteProfile(req, res) {

  try {

    await userService.deleteUser(req.user.id);

    return res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (error) {

    return res.status(400).json({
      message: error.message
    });

  }

},

  async listUsers(req, res) {

    try {

      const users = await userService.getAllUsers();

      res.json(users);

    } catch (error) {

      res.status(400).json({
        message: error.message
      });

    }

  }

};