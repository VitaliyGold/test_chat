/*
  Warnings:

  - The primary key for the `Chats_members_data` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Chats_members_data" DROP CONSTRAINT "Chats_members_data_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Chats_members_data_pkey" PRIMARY KEY ("id");
