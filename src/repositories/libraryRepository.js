import prisma from "../config/database.js";

export const libraryRepository = {
  async addGame(userId, gameId) {
    return prisma.library.create({
      data: { userId: Number(userId), gameId: Number(gameId) },
      include: { game: true },
    });
  },

  async removeGame(userId, gameId) {
    return prisma.library.deleteMany({
      where: {
        userId: Number(userId),
        gameId: Number(gameId),
      },
    });
  },

  async updateStatus(userId, gameId, status) {
    const updated = await prisma.library.updateMany({
      where: {
        userId: Number(userId),
        gameId: Number(gameId),
      },
      data: { status },
    });

    return {
      message: "Game status updated",
      data: updated,
    };
  },

  async listUserLibrary(userId) {
    return prisma.library.findMany({
      where: { userId: Number(userId) },
      include: { game: true },
      orderBy: { addedAt: "desc" },
    });
  },

  async findGameInLibrary(userId, gameId) {
    return prisma.library.findFirst({
      where: {
        userId: Number(userId),
        gameId: Number(gameId),
      },
    });
  },
};