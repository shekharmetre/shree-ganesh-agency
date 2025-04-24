/*
  Warnings:

  - A unique constraint covering the columns `[agentUsername]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Agent_agentUsername_key" ON "Agent"("agentUsername");
