/*
  Warnings:

  - You are about to drop the column `isTeamItLeaderApproved` on the `StagingOfApproving` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StagingOfApproving" DROP COLUMN "isTeamItLeaderApproved",
ADD COLUMN     "isHeaderOfDepartmentApproved" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "isTeamLeaderApproved" SET DEFAULT false,
ALTER COLUMN "isStreamItLeaderApproved" SET DEFAULT false;
