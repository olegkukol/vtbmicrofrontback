-- CreateEnum
CREATE TYPE "Type" AS ENUM ('INTERNAL', 'OUTSTAFF');

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VacantionPlan" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VacantionApplication" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numberOfDays" INTEGER NOT NULL,
    "substituteEmployeeId" TEXT NOT NULL,
    "headOfDepartmentId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "streamId" TEXT NOT NULL,
    "approvalTeamItLeaderId" TEXT NOT NULL,
    "approvalStreamItLeaderId" TEXT NOT NULL,
    "approvalHeadOfDepartmentId" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "fio" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "type" "Type" NOT NULL DEFAULT E'INTERNAL',
    "vacantionPlanId" TEXT,
    "streamId" TEXT,
    "teamId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "streamId" TEXT NOT NULL,
    "itLeaderId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stream" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "headOfDepartmentId" TEXT,
    "itLeaderId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VacantionApplication_employeeId_unique" ON "VacantionApplication"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "VacantionApplication_substituteEmployeeId_unique" ON "VacantionApplication"("substituteEmployeeId");

-- CreateIndex
CREATE UNIQUE INDEX "VacantionApplication_headOfDepartmentId_unique" ON "VacantionApplication"("headOfDepartmentId");

-- AddForeignKey
ALTER TABLE "Skill" ADD FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacantionApplication" ADD FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacantionApplication" ADD FOREIGN KEY ("substituteEmployeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacantionApplication" ADD FOREIGN KEY ("headOfDepartmentId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacantionApplication" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacantionApplication" ADD FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD FOREIGN KEY ("vacantionPlanId") REFERENCES "VacantionPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
