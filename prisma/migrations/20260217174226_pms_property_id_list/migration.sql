/*
  Warnings:

  - You are about to drop the column `propertyId` on the `AttachedPMS` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AttachedPMS" DROP CONSTRAINT "AttachedPMS_propertyId_fkey";

-- DropIndex
DROP INDEX "AttachedPMS_propertyId_key";

-- AlterTable
ALTER TABLE "AttachedPMS" DROP COLUMN "propertyId";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "attachedPMSId" TEXT;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_attachedPMSId_fkey" FOREIGN KEY ("attachedPMSId") REFERENCES "AttachedPMS"("id") ON DELETE SET NULL ON UPDATE CASCADE;
