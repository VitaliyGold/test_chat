/*
  Warnings:

  - You are about to drop the column `chat_name` on the `Chats_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chats_data" DROP COLUMN "chat_name";

-- CreateTable
CREATE TABLE "Messages_data" (
    "chat_id" UUID NOT NULL,
    "owner_id" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Messages_data_chat_id_key" ON "Messages_data"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "Messages_data_owner_id_key" ON "Messages_data"("owner_id");

-- AddForeignKey
ALTER TABLE "Messages_data" ADD CONSTRAINT "Messages_data_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chats_data"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages_data" ADD CONSTRAINT "Messages_data_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Chats_members_data"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
