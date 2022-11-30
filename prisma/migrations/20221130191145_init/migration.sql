-- DropForeignKey
ALTER TABLE "Messages_data" DROP CONSTRAINT "Messages_data_owner_id_fkey";

-- DropIndex
DROP INDEX "Chats_members_data_user_id_key";

-- DropIndex
DROP INDEX "Messages_data_chat_id_key";

-- DropIndex
DROP INDEX "Messages_data_owner_id_key";

-- AddForeignKey
ALTER TABLE "Messages_data" ADD CONSTRAINT "Messages_data_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Profile_data"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
