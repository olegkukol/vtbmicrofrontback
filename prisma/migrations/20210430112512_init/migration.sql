/*
  Warnings:

  - A unique constraint covering the columns `[employeeId]` on the table `VacantionPlan` will be added. If there are existing duplicate values, this will fail.
  - Made the column `employeeId` on table `VacantionPlan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "VacantionPlan" ALTER COLUMN "employeeId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VacantionPlan.employeeId_unique" ON "VacantionPlan"("employeeId");
