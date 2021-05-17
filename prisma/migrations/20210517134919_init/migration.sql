/*
  Warnings:

  - A unique constraint covering the columns `[currentApproverId]` on the table `VacantionApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_vacantionApplicationId_fkey";

-- DropIndex
DROP INDEX "Employee_vacantionApplicationId_unique";

-- CreateIndex
CREATE UNIQUE INDEX "VacantionApplication_currentApproverId_unique" ON "VacantionApplication"("currentApproverId");

-- AddForeignKey
ALTER TABLE "VacantionApplication" ADD FOREIGN KEY ("currentApproverId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
