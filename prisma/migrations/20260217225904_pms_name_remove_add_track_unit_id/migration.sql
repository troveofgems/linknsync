/*
  Warnings:

  - You are about to drop the column `name` on the `AttachedPMS` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AttachedPMS" DROP COLUMN "name",
ALTER COLUMN "pmsName" DROP NOT NULL,
ALTER COLUMN "pmsName" SET DEFAULT 'Track/TravelNet Solutions';

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "trackUnitId" TEXT;
