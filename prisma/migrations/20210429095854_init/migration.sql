/*
  Warnings:

  - The `role` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('HEAD_OF_DEPARTMENT', 'HEAD_OF_STREAM', 'HEAD_OF_TEAM', 'EMPLOYEE');

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'EMPLOYEE';

-- CreateTable
CREATE TABLE "OvertimeApplication" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "streamId" TEXT NOT NULL,
    "rationaleFoWork" TEXT NOT NULL,
    "numberOfHours" INTEGER NOT NULL,
    "checklist" TEXT NOT NULL,
    "approvalTeamItLeaderId" TEXT NOT NULL,
    "approvalStreamItLeaderId" TEXT NOT NULL,
    "approvalHeadOfDepartmentId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OvertimeApplication" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OvertimeApplication" ADD FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
