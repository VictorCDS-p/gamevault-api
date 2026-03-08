import prisma from "../config/database.js";

export const libraryRepository = {
  async addGame(userId, gameId) {
    return prisma.library.create({
      data: { userId, gameId },
      include: { game: true },
    });
  },

  async removeGame(userId, gameId) {
    await prisma.library.deleteMany({
      where: { userId, gameId },
    });
    return { message: "Game removed from library" };
  },

  async updateStatus(userId, gameId, status) {
    const updated = await prisma.library.update({
      where: { userId_gameId: { userId, gameId } },
      data: { status },
      include: { game: true },
    });

    return { message: "Game status updated", data: updated };
  },

  async listUserLibrary(userId) {
    return prisma.library.findMany({
      where: { userId },
      include: { game: true },
      orderBy: { addedAt: "desc" },
    });
  },

  async findGameInLibrary(userId, gameId) {
    return prisma.library.findUnique({
      where: { userId_gameId: { userId, gameId } },
    });
  },
};