import prisma from "../config/database.js";

export const collectionRepository = {

  create(userId, data) {
    return prisma.collection.create({
      data: {
        userId,
        ...data
      }
    });
  },

  findById(id) {
    return prisma.collection.findUnique({
      where: { id },
      include: {
        games: { include: { game: true } }
      }
    });
  },

  findAllByUser(userId) {
    return prisma.collection.findMany({
      where: { userId },
      include: {
        games: { include: { game: true } }
      }
    });
  },

  update(id, data) {
    return prisma.collection.update({
      where: { id },
      data
    });
  },

  delete(id) {
    return prisma.collection.delete({
      where: { id }
    });
  },

  addGame(collectionId, gameId) {
    return prisma.collectionGame.create({
      data: {
        collectionId,
        gameId
      }
    });
  },

  removeGame(collectionId, gameId) {
    return prisma.collectionGame.deleteMany({
      where: {
        collectionId,
        gameId
      }
    });
  },

  findGame(collectionId, gameId) {
    return prisma.collectionGame.findFirst({
      where: { collectionId, gameId }
    });
  }

};