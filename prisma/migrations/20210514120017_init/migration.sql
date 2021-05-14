/*
  Warnings:

  - You are about to drop the column `currentApprover` on the `VacantionApplication` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[currentApproverId]` on the table `VacantionApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_vacantionApplicationId_fkey";

-- DropForeignKey
ALTER TABLE "VacantionApplication" DROP CONSTRAINT "VacantionApplication_currentApprover_fkey";

-- AlterTable
ALTER TABLE "VacantionApplication" DROP COLUMN "currentApprover",
ADD COLUMN     "currentApproverId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "VacantionApplication_currentApproverId_unique" ON "VacantionApplication"("currentApproverId");

-- AddForeignKey
ALTER TABLE "VacantionApplication" ADD FOREIGN KEY ("currentApproverId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
