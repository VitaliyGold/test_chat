/*
  Warnings:

  - You are about to drop the column `user_id` on the `Auth_data` table. All the data in the column will be lost.
  - You are about to drop the column `chat_id` on the `Chats_data` table. All the data in the column will be lost.
  - You are about to drop the column `chat_type` on the `Chats_data` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `Chats_data` table. All the data in the column will be lost.
  - You are about to drop the column `chat_id` on the `Chats_members_data` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Chats_members_data` table. All the data in the column will be lost.
  - The primary key for the `Messages_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chat_id` on the `Messages_data` table. All the data in the column will be lost.
  - You are about to drop the column `message_id` on the `Messages_data` table. All the data in the column will be lost.
  - You are about to drop the column `message_text` on the `Messages_data` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `Messages_data` table. All the data in the column will be lost.
  - The primary key for the `Profile_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avatar_link` on the `Profile_data` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Profile_data` table. All the data in the column will be lost.
  - You are about to drop the column `user_link` on the `Profile_data` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Auth_data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chatId]` on the table `Chats_data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[messageId]` on the table `Messages_data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Profile_data` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Auth_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatId` to the `Chats_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatType` to the `Chats_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Chats_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatId` to the `Chats_members_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Chats_members_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatId` to the `Messages_data` table without a default value. This is not possible if the table is not empty.
  - The required column `messageId` was added to the `Messages_data` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `messageText` to the `Messages_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Messages_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Profile_data` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chats_data" DROP CONSTRAINT "Chats_data_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Chats_members_data" DROP CONSTRAINT "Chats_members_data_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "Chats_members_data" DROP CONSTRAINT "Chats_members_data_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Messages_data" DROP CONSTRAINT "Messages_data_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "Messages_data" DROP CONSTRAINT "Messages_data_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile_data" DROP CONSTRAINT "Profile_data_user_id_fkey";

-- DropIndex
DROP INDEX "Auth_data_user_id_key";

-- DropIndex
DROP INDEX "Chats_data_chat_id_key";

-- DropIndex
DROP INDEX "Messages_data_message_id_key";

-- DropIndex
DROP INDEX "Profile_data_user_id_key";

-- AlterTable
ALTER TABLE "Auth_data" DROP COLUMN "user_id",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Chats_data" DROP COLUMN "chat_id",
DROP COLUMN "chat_type",
DROP COLUMN "owner_id",
ADD COLUMN     "chatId" TEXT NOT NULL,
ADD COLUMN     "chatType" INTEGER NOT NULL,
ADD COLUMN     "ownerId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Chats_members_data" DROP COLUMN "chat_id",
DROP COLUMN "user_id",
ADD COLUMN     "chatId" TEXT NOT NULL,
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Messages_data" DROP CONSTRAINT "Messages_data_pkey",
DROP COLUMN "chat_id",
DROP COLUMN "message_id",
DROP COLUMN "message_text",
DROP COLUMN "owner_id",
ADD COLUMN     "chatId" TEXT NOT NULL,
ADD COLUMN     "messageId" TEXT NOT NULL,
ADD COLUMN     "messageText" TEXT NOT NULL,
ADD COLUMN     "ownerId" UUID NOT NULL,
ADD CONSTRAINT "Messages_data_pkey" PRIMARY KEY ("messageId");

-- AlterTable
ALTER TABLE "Profile_data" DROP CONSTRAINT "Profile_data_pkey",
DROP COLUMN "avatar_link",
DROP COLUMN "user_id",
DROP COLUMN "user_link",
ADD COLUMN     "avatarLink" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "userId" UUID NOT NULL,
ADD COLUMN     "userLink" TEXT NOT NULL DEFAULT '',
ADD CONSTRAINT "Profile_data_pkey" PRIMARY KEY ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_data_userId_key" ON "Auth_data"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Chats_data_chatId_key" ON "Chats_data"("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "Messages_data_messageId_key" ON "Messages_data"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_data_userId_key" ON "Profile_data"("userId");

-- AddForeignKey
ALTER TABLE "Profile_data" ADD CONSTRAINT "Profile_data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Auth_data"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats_data" ADD CONSTRAINT "Chats_data_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Profile_data"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats_members_data" ADD CONSTRAINT "Chats_members_data_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chats_data"("chatId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats_members_data" ADD CONSTRAINT "Chats_members_data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile_data"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages_data" ADD CONSTRAINT "Messages_data_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chats_data"("chatId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages_data" ADD CONSTRAINT "Messages_data_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Profile_data"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
