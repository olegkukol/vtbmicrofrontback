/*
  Warnings:

  - A unique constraint covering the columns `[vacantionAppliationId]` on the table `StagingOfApproving` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StagingOfApproving.vacantionAppliationId_unique" ON "StagingOfApproving"("vacantionAppliationId");
