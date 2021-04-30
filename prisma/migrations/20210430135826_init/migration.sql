-- CreateTable
CREATE TABLE "StagingOfApproving" (
    "id" TEXT NOT NULL,
    "vacantionAppliationId" TEXT NOT NULL,
    "TeamItLeaderFio" TEXT NOT NULL,
    "StreamItLeaderFio" TEXT NOT NULL,
    "HeadOfDepartmentFio" TEXT NOT NULL,
    "isTeamLeaderApproved" BOOLEAN NOT NULL,
    "isStreamItLeaderApproved" BOOLEAN NOT NULL,
    "isTeamItLeaderApproved" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StagingOfApproving" ADD FOREIGN KEY ("vacantionAppliationId") REFERENCES "VacantionApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
