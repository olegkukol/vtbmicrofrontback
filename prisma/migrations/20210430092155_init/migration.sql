/*
  Warnings:

  - You are about to drop the column `itLeaderId` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `itLeaderId` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "itLeaderId",
ADD COLUMN     "streamItLeaderId" TEXT;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "itLeaderId",
ADD COLUMN     "teamItLeaderId" TEXT;
