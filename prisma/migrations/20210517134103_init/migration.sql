/*
  Warnings:

  - You are about to drop the column `vacantionPlanId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `vacantionApplicationId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `daysRemaining` on the `VacantionApplication` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_vacantionPlanId_fkey";

-- DropIndex
DROP INDEX "VacantionApplication.employeeId_unique";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "vacantionPlanId",
DROP COLUMN "vacantionApplicationId";

-- AlterTable
ALTER TABLE "VacantionApplication" DROP COLUMN "daysRemaining";

-- CreateTable
CREATE TABLE "_EmployeeToVacantionPlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeToVacantionPlan_AB_unique" ON "_EmployeeToVacantionPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeToVacantionPlan_B_index" ON "_EmployeeToVacantionPlan"("B");

-- AddForeignKey
ALTER TABLE "_EmployeeToVacantionPlan" ADD FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToVacantionPlan" ADD FOREIGN KEY ("B") REFERENCES "VacantionPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
