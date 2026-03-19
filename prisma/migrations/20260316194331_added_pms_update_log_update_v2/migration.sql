/*
  Warnings:

  - Added the required column `callStatusCode` to the `PmsUpdateLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `callStatusText` to the `PmsUpdateLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lnsCallPath` to the `PmsUpdateLog` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `pmsResponse` on the `PmsUpdateLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PmsUpdateLog" ADD COLUMN     "callStatusCode" TEXT NOT NULL,
ADD COLUMN     "callStatusText" TEXT NOT NULL,
ADD COLUMN     "lnsCallPath" TEXT NOT NULL,
ADD COLUMN     "requestToPMSSubmittedAt" TIMESTAMP(3),
DROP COLUMN "pmsResponse",
ADD COLUMN     "pmsResponse" JSONB NOT NULL;
