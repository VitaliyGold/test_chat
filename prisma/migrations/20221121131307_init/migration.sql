/*
  Warnings:

  - Added the required column `message_text` to the `Messages_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages_data" ADD COLUMN     "message_text" TEXT NOT NULL;
