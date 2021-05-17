/*
  Warnings:

  - You are about to drop the column `streamItLeaderId` on the `Stream` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[streamLeaderId]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_streamItLeaderId_fkey";

-- DropIndex
DROP INDEX "Stream.streamItLeaderId_unique";

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "streamItLeaderId",
ADD COLUMN     "streamLeaderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Stream.streamLeaderId_unique" ON "Stream"("streamLeaderId");

-- AddForeignKey
ALTER TABLE "Stream" ADD FOREIGN KEY ("streamLeaderId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
