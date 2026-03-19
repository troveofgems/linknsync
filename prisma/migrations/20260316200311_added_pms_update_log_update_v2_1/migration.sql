/*
  Warnings:

  - Added the required column `user` to the `PmsUpdateLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PmsUpdateLog" ADD COLUMN     "user" TEXT NOT NULL;
