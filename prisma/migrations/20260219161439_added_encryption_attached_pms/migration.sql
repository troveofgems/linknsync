/*
  Warnings:

  - Made the column `pmsName` on table `AttachedPMS` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AttachedPMS" ADD COLUMN     "apiKeyHash" TEXT,
ADD COLUMN     "blockReasonIdHash" TEXT,
ADD COLUMN     "domainHash" TEXT,
ADD COLUMN     "pmsNameHash" TEXT,
ADD COLUMN     "secretKeyHash" TEXT,
ALTER COLUMN "pmsName" SET NOT NULL,
ALTER COLUMN "pmsName" SET DEFAULT 'Track';
