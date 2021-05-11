/*
  Warnings:

  - You are about to drop the `_StagingOfApprovingToVacantionApplication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StagingOfApprovingToVacantionApplication" DROP CONSTRAINT "_StagingOfApprovingToVacantionApplication_A_fkey";

-- DropForeignKey
ALTER TABLE "_StagingOfApprovingToVacantionApplication" DROP CONSTRAINT "_StagingOfApprovingToVacantionApplication_B_fkey";

-- DropTable
DROP TABLE "_StagingOfApprovingToVacantionApplication";

-- AddForeignKey
ALTER TABLE "StagingOfApproving" ADD FOREIGN KEY ("vacantionAppliationId") REFERENCES "VacantionApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
