import { categoryService } from "../services/categoryService.js";

export const categoryController = {

  async createCategory(req, res) {

    try {

      const category = await categoryService.createCategory(req.body);

      return res.status(201).json(category);

    } catch (error) {

      return res.status(400).json({
        message: error.message
      });

    }

  },

  async listCategories(req, res) {

    try {

      const categories = await categoryService.getAllCategories();

      return res.json(categories);

    } catch (error) {

      return res.status(400).json({
        message: error.message
      });

    }

  },

  async listCategoriesWithGames(req, res) {

    try {

      const categories = await categoryService.getAllCategoriesWithGames();

      return res.json(categories);

    } catch (error) {

      return res.status(400).json({
        message: error.message
      });

    }

  },

  async getCategory(req, res) {

    try {

      const category = await categoryService.getCategoryById(req.params.id);

      return res.json(category);

    } catch (error) {

      return res.status(404).json({
        message: error.message
      });

    }

  }

};