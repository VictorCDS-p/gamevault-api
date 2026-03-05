import { categoryRepository } from "../repositories/categoryRepository.js";

export const categoryService = {

  async createCategory({ name }) {

    const categoryExists = await categoryRepository.findByName(name);

    if (categoryExists) {
      throw new Error("Category already exists");
    }

    const category = await categoryRepository.create({
      name
    });

    return category;
  },

  async getAllCategories() {

    return categoryRepository.findAll();

  },

  async getAllCategoriesWithGames() {

    return categoryRepository.findAllWithGames();

  },

  async getCategoryById(id) {

    const category = await categoryRepository.findById(Number(id));

    if (!category) {
      throw new Error("Category not found");
    }

    return category;

  }

};