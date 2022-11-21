/*
  Warnings:

  - You are about to drop the column `members_table_id` on the `Chats_data` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Chats_data_members_table_id_key";

-- AlterTable
ALTER TABLE "Chats_data" DROP COLUMN "members_table_id";

-- AddForeignKey
ALTER TABLE "Messages_data" ADD CONSTRAINT "Messages_data_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Chats_members_data"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
