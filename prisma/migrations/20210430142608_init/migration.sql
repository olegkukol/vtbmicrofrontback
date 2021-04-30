/*
  Warnings:

  - You are about to drop the column `stagingOfApprovingId` on the `VacantionApplication` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "VacantionApplication" DROP CONSTRAINT "VacantionApplication_stagingOfApprovingId_fkey";

-- AlterTable
ALTER TABLE "VacantionApplication" DROP COLUMN "stagingOfApprovingId";

-- CreateTable
CREATE TABLE "_StagingOfApprovingToVacantionApplication" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StagingOfApprovingToVacantionApplication_AB_unique" ON "_StagingOfApprovingToVacantionApplication"("A", "B");

-- CreateIndex
CREATE INDEX "_StagingOfApprovingToVacantionApplication_B_index" ON "_StagingOfApprovingToVacantionApplication"("B");

-- AddForeignKey
ALTER TABLE "_StagingOfApprovingToVacantionApplication" ADD FOREIGN KEY ("A") REFERENCES "StagingOfApproving"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StagingOfApprovingToVacantionApplication" ADD FOREIGN KEY ("B") REFERENCES "VacantionApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
