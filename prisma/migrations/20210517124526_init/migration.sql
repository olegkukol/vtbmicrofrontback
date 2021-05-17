-- CreateEnum
CREATE TYPE "VacantionApplicationStatus" AS ENUM ('ACTIVE', 'APPROVED');

-- AlterTable
ALTER TABLE "VacantionApplication" ADD COLUMN     "daysRemaining" INTEGER NOT NULL DEFAULT 28,
ADD COLUMN     "status" "VacantionApplicationStatus" DEFAULT E'ACTIVE';
