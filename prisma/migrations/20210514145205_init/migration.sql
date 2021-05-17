/*
  Warnings:

  - You are about to drop the column `approvalStreamItLeaderId` on the `VacantionApplication` table. All the data in the column will be lost.
  - Added the required column `approvalStreamLeaderId` to the `VacantionApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VacantionApplication" DROP COLUMN "approvalStreamItLeaderId",
ADD COLUMN     "approvalStreamLeaderId" TEXT NOT NULL;
