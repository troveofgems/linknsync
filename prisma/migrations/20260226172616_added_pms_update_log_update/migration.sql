/*
  Warnings:

  - You are about to drop the `pmsUpdateLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "pmsUpdateLog";

-- CreateTable
CREATE TABLE "PmsUpdateLog" (
    "id" TEXT NOT NULL,
    "pms" TEXT NOT NULL,
    "lnsBlockId" TEXT NOT NULL,
    "pmsBlockId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "pmsResponse" TEXT NOT NULL,
    "orgImprintId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PmsUpdateLog_pkey" PRIMARY KEY ("id")
);
