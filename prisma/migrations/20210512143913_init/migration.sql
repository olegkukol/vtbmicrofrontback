/*
  Warnings:

  - A unique constraint covering the columns `[currentApprover]` on the table `VacantionApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "VacantionApplication" ADD COLUMN     "currentApprover" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "VacantionApplication.currentApprover_unique" ON "VacantionApplication"("currentApprover");

-- AddForeignKey
ALTER TABLE "VacantionApplication" ADD FOREIGN KEY ("currentApprover") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
