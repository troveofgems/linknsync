/*
  Warnings:

  - You are about to drop the column `actionType` on the `PmsUpdateLog` table. All the data in the column will be lost.
  - You are about to drop the column `lnsBlockId` on the `PmsUpdateLog` table. All the data in the column will be lost.
  - You are about to drop the column `lnsCallPath` on the `PmsUpdateLog` table. All the data in the column will be lost.
  - Added the required column `lnsCallType` to the `PmsUpdateLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lnsDateBlockId` to the `PmsUpdateLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pmsCallActionType` to the `PmsUpdateLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyId` to the `PmsUpdateLog` table without a default value. This is not possible if the table is not empty.
  - Made the column `requestToPMSSubmittedAt` on table `PmsUpdateLog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sourceSlug` on table `PmsUpdateLog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PmsUpdateLog" DROP COLUMN "actionType",
DROP COLUMN "lnsBlockId",
DROP COLUMN "lnsCallPath",
ADD COLUMN     "lnsCallType" TEXT NOT NULL,
ADD COLUMN     "lnsDateBlockId" TEXT NOT NULL,
ADD COLUMN     "pmsCallActionType" TEXT NOT NULL,
ADD COLUMN     "propertyId" TEXT NOT NULL,
ALTER COLUMN "requestToPMSSubmittedAt" SET NOT NULL,
ALTER COLUMN "requestToPMSSubmittedAt" SET DATA TYPE TEXT,
ALTER COLUMN "sourceSlug" SET NOT NULL;
