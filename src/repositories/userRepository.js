import prisma from "../config/database.js";

export const userRepository = {

  create(data) {
    return prisma.user.create({
      data
    });
  },

  findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
  },

  findByEmail(email) {
    return prisma.user.findUnique({
      where: { email }
    });
  },

  findById(id) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
  },

  async getLibraryStats(userId) {

    const totalGames = await prisma.library.count({
      where: { userId }
    });

    const completed = await prisma.library.count({
      where: {
        userId,
        status: "COMPLETED"
      }
    });

    const playing = await prisma.library.count({
      where: {
        userId,
        status: "PLAYING"
      }
    });

    const backlog = await prisma.library.count({
      where: {
        userId,
        status: "BACKLOG"
      }
    });

    return {
      totalGames,
      completed,
      playing,
      backlog
    };

  },

  update(id, data) {
    return prisma.user.update({
      where: { id },
      data
    });
  },

  remove(id) {
    return prisma.user.delete({
      where: { id }
    });
  }

};