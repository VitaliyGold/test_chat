/*
  Warnings:

  - The primary key for the `Chats_members_data` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Chats_members_data" DROP CONSTRAINT "Chats_members_data_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "Messages_data" DROP CONSTRAINT "Messages_data_chat_id_fkey";

-- DropIndex
DROP INDEX "Chats_members_data_chat_id_key";

-- AlterTable
ALTER TABLE "Chats_data" ALTER COLUMN "chat_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Chats_members_data" DROP CONSTRAINT "Chats_members_data_pkey",
ALTER COLUMN "chat_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Chats_members_data_pkey" PRIMARY KEY ("chat_id");

-- AlterTable
ALTER TABLE "Messages_data" ALTER COLUMN "chat_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Chats_members_data" ADD CONSTRAINT "Chats_members_data_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chats_data"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages_data" ADD CONSTRAINT "Messages_data_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chats_data"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
