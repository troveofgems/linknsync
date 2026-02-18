/*
  Warnings:

  - You are about to drop the column `foreignIdList` on the `AttachedPMS` table. All the data in the column will be lost.
  - You are about to drop the column `pmsList` on the `AttachedPMS` table. All the data in the column will be lost.
  - Added the required column `apiKey` to the `AttachedPMS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blockReasonId` to the `AttachedPMS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domain` to the `AttachedPMS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pmsName` to the `AttachedPMS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secretKey` to the `AttachedPMS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AttachedPMS" DROP COLUMN "foreignIdList",
DROP COLUMN "pmsList",
ADD COLUMN     "apiKey" TEXT NOT NULL,
ADD COLUMN     "blockReasonId" TEXT NOT NULL,
ADD COLUMN     "domain" TEXT NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "pmsName" TEXT NOT NULL,
ADD COLUMN     "secretKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ICalEntry" ADD COLUMN     "slug" TEXT;

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "recurringInterval" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "canceledAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "customerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "discountId" TEXT,
    "checkoutId" TEXT NOT NULL,
    "customerCancellationReason" TEXT,
    "customerCancellationComment" TEXT,
    "metaData" TEXT,
    "customFieldData" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_id_fkey" FOREIGN KEY ("id") REFERENCES "UserImprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
