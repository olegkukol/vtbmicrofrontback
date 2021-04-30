/*
  Warnings:

  - You are about to drop the column `numberOfDays` on the `VacantionApplication` table. All the data in the column will be lost.
  - You are about to drop the column `headOfDepartmentId` on the `VacantionApplication` table. All the data in the column will be lost.
  - You are about to drop the column `approved` on the `VacantionApplication` table. All the data in the column will be lost.
  - You are about to drop the `OvertimeApplication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OvertimeApplication" DROP CONSTRAINT "OvertimeApplication_streamId_fkey";

-- DropForeignKey
ALTER TABLE "OvertimeApplication" DROP CONSTRAINT "OvertimeApplication_teamId_fkey";

-- DropForeignKey
ALTER TABLE "VacantionApplication" DROP CONSTRAINT "VacantionApplication_headOfDepartmentId_fkey";

-- DropIndex
DROP INDEX "VacantionApplication_headOfDepartmentId_unique";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "vacantionApplicationId" TEXT;

-- AlterTable
ALTER TABLE "VacantionApplication" DROP COLUMN "numberOfDays",
DROP COLUMN "headOfDepartmentId",
DROP COLUMN "approved",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "OvertimeApplication";

-- AddForeignKey
ALTER TABLE "Employee" ADD FOREIGN KEY ("vacantionApplicationId") REFERENCES "VacantionApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
