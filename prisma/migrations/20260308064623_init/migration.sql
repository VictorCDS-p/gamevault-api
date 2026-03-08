/*
  Warnings:

  - The primary key for the `Library` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Library` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Library_userId_gameId_key";

-- AlterTable
ALTER TABLE "Library" DROP CONSTRAINT "Library_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Library_pkey" PRIMARY KEY ("userId", "gameId");
