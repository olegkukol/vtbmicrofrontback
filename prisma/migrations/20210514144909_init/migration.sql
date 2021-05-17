/*
  Warnings:

  - A unique constraint covering the columns `[headOfDepartmentId]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[streamItLeaderId]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stream_headOfDepartmentId_unique" ON "Stream"("headOfDepartmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Stream_streamItLeaderId_unique" ON "Stream"("streamItLeaderId");

-- AddForeignKey
ALTER TABLE "Stream" ADD FOREIGN KEY ("headOfDepartmentId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stream" ADD FOREIGN KEY ("streamItLeaderId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
