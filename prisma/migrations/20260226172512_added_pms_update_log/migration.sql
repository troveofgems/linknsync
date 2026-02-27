-- CreateTable
CREATE TABLE "pmsUpdateLog" (
    "id" TEXT NOT NULL,
    "pms" TEXT NOT NULL,
    "lnsBlockId" TEXT NOT NULL,
    "pmsBlockId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "pmsResponse" TEXT NOT NULL,
    "orgImprintId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pmsUpdateLog_pkey" PRIMARY KEY ("id")
);
