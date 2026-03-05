import prisma from "../config/database.js";

export const categoryRepository = {

  create(data) {
    return prisma.category.create({
      data
    });
  },

  findByName(name) {
    return prisma.category.findUnique({
      where: { name }
    });
  },

  findAll() {
    return prisma.category.findMany({
      orderBy: {
        name: "asc"
      }
    });
  },

  findAllWithGames() {
    return prisma.category.findMany({
      include: {
        games: true
      },
      orderBy: {
        name: "asc"
      }
    });
  },

  findById(id) {
    return prisma.category.findUnique({
      where: { id },
      include: {
        games: true
      }
    });
  }

};