/*
  Warnings:

  - You are about to drop the column `currentApproverId` on the `VacantionApplication` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "VacantionApplication" DROP CONSTRAINT "VacantionApplication_currentApproverId_fkey";

-- AlterTable
ALTER TABLE "VacantionApplication" DROP COLUMN "currentApproverId",
ADD COLUMN     "approverId" TEXT;

-- AddForeignKey
ALTER TABLE "VacantionApplication" ADD FOREIGN KEY ("approverId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
