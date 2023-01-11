/*
  Warnings:

  - The primary key for the `Messages_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Messages_data` table. All the data in the column will be lost.
  - The required column `message_id` was added to the `Messages_data` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Messages_data" DROP CONSTRAINT "Messages_data_pkey",
DROP COLUMN "id",
ADD COLUMN     "message_id" TEXT NOT NULL,
ADD CONSTRAINT "Messages_data_pkey" PRIMARY KEY ("message_id");
