import prisma from "../config/database.js";

export const libraryRepository = {

  async addGame(userId, gameId) {
    const libraryEntry = await prisma.library.create({
      data: {
        userId,
        gameId
      },
      include: {
        game: true
      }
    });

    return libraryEntry;
  },

  async removeGame(userId, gameId) {
    const deleted = await prisma.library.delete({
      where: {
        userId_gameId: {
          userId,
          gameId
        }
      }
    });

    return {
      message: "Game removed from library",
      data: deleted
    };
  },

  async updateStatus(userId, gameId, status) {
    const updated = await prisma.library.update({
      where: {
        userId_gameId: {
          userId,
          gameId
        }
      },
      data: {
        status
      },
      include: {
        game: true
      }
    });

    return {
      message: "Game status updated",
      data: updated
    };
  },

  async listUserLibrary(userId) {
    return prisma.library.findMany({
      where: {
        userId
      },
      include: {
        game: true
      },
      orderBy: {
        addedAt: "desc"
      }
    });
  },

  async findGameInLibrary(userId, gameId) {
    return prisma.library.findUnique({
      where: {
        userId_gameId: {
          userId,
          gameId
        }
      }
    });
  }

};