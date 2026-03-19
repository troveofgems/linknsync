/*
  Warnings:

  - Added the required column `icalEntryId` to the `PmsUpdateLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PmsUpdateLog" ADD COLUMN     "icalEntryId" TEXT NOT NULL,
ADD COLUMN     "sourceSlug" TEXT;
