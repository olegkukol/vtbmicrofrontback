/*
  Warnings:

  - You are about to drop the column `teamItLeaderId` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teamLeaderId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "teamItLeaderId",
ADD COLUMN     "teamLeaderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamLeaderId_unique" ON "Team"("teamLeaderId");

-- AddForeignKey
ALTER TABLE "Team" ADD FOREIGN KEY ("teamLeaderId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
