/*
  Warnings:

  - You are about to drop the `StagingOfApproving` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StagingOfApproving" DROP CONSTRAINT "StagingOfApproving_vacantionAppliationId_fkey";

-- DropTable
DROP TABLE "StagingOfApproving";

-- CreateTable
CREATE TABLE "StageOfApproving" (
    "id" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "vacantionAppliationId" TEXT NOT NULL,
    "approverId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StageOfApproving.vacantionAppliationId_unique" ON "StageOfApproving"("vacantionAppliationId");

-- CreateIndex
CREATE UNIQUE INDEX "StageOfApproving.approverId_unique" ON "StageOfApproving"("approverId");

-- AddForeignKey
ALTER TABLE "StageOfApproving" ADD FOREIGN KEY ("approverId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageOfApproving" ADD FOREIGN KEY ("vacantionAppliationId") REFERENCES "VacantionApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
