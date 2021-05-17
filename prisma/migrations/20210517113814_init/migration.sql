/*
  Warnings:

  - You are about to drop the column `approvalTeamItLeaderId` on the `VacantionApplication` table. All the data in the column will be lost.
  - You are about to drop the column `approvalHeadOfDepartmentId` on the `VacantionApplication` table. All the data in the column will be lost.
  - You are about to drop the column `approvalStreamLeaderId` on the `VacantionApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VacantionApplication" DROP COLUMN "approvalTeamItLeaderId",
DROP COLUMN "approvalHeadOfDepartmentId",
DROP COLUMN "approvalStreamLeaderId";

-- AlterIndex
ALTER INDEX "Stream.streamLeaderId_unique" RENAME TO "Stream_streamLeaderId_unique";
