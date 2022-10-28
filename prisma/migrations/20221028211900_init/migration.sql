/*
  Warnings:

  - You are about to drop the column `salt` on the `Auth_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Auth_data" DROP COLUMN "salt";
