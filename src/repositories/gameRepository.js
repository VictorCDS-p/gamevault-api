import prisma from "../config/database.js";

export const gameRepository = {

  create(data) {
    return prisma.game.create({
      data
    });
  },

  findAll() {
    return prisma.game.findMany({
      include: {
        category: true
      }
    });
  },

  findById(id) {
    return prisma.game.findUnique({
      where: { id },
      include: {
        category: true
      }
    });
  },

  findByCategory(categoryName) {
    return prisma.game.findMany({
      where: {
        category: {
          name: categoryName
        }
      },
      include: {
        category: true
      }
    });
  },

  update(id, data) {
    return prisma.game.update({
      where: { id },
      data
    });
  },

  delete(id) {
    return prisma.game.delete({
      where: { id }
    });
  }

};