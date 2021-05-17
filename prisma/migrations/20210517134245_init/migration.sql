/*
  Warnings:

  - A unique constraint covering the columns `[vacantionApplicationId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "VacantionApplication" DROP CONSTRAINT "VacantionApplication_currentApproverId_fkey";

-- DropIndex
DROP INDEX "VacantionApplication_currentApproverId_unique";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "vacantionApplicationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_vacantionApplicationId_unique" ON "Employee"("vacantionApplicationId");

-- AddForeignKey
ALTER TABLE "Employee" ADD FOREIGN KEY ("vacantionApplicationId") REFERENCES "VacantionApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
