/*
  Warnings:

  - You are about to drop the column `end` on the `VacantionPlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VacantionPlan" DROP COLUMN "end",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
