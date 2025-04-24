/*
  Warnings:

  - You are about to drop the column `agentName` on the `Agent` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Agent` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authId]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `agentUsername` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authId` to the `Agent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agent" DROP COLUMN "agentName",
DROP COLUMN "password",
ADD COLUMN     "agentUsername" TEXT NOT NULL,
ADD COLUMN     "authId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "qty";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";

-- CreateIndex
CREATE UNIQUE INDEX "Agent_authId_key" ON "Agent"("authId");
