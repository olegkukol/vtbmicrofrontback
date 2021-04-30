/*
  Warnings:

  - You are about to drop the column `TeamItLeaderFio` on the `StagingOfApproving` table. All the data in the column will be lost.
  - You are about to drop the column `StreamItLeaderFio` on the `StagingOfApproving` table. All the data in the column will be lost.
  - You are about to drop the column `HeadOfDepartmentFio` on the `StagingOfApproving` table. All the data in the column will be lost.
  - Added the required column `teamItLeaderFio` to the `StagingOfApproving` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streamItLeaderFio` to the `StagingOfApproving` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headOfDepartmentFio` to the `StagingOfApproving` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StagingOfApproving" DROP CONSTRAINT "StagingOfApproving_vacantionAppliationId_fkey";

-- AlterTable
ALTER TABLE "StagingOfApproving" DROP COLUMN "TeamItLeaderFio",
DROP COLUMN "StreamItLeaderFio",
DROP COLUMN "HeadOfDepartmentFio",
ADD COLUMN     "teamItLeaderFio" TEXT NOT NULL,
ADD COLUMN     "streamItLeaderFio" TEXT NOT NULL,
ADD COLUMN     "headOfDepartmentFio" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VacantionApplication" ADD COLUMN     "stagingOfApprovingId" TEXT;

-- AddForeignKey
ALTER TABLE "VacantionApplication" ADD FOREIGN KEY ("stagingOfApprovingId") REFERENCES "StagingOfApproving"("id") ON DELETE SET NULL ON UPDATE CASCADE;
