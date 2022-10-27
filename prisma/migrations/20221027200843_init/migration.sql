/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `user_id` on the `Auth_data` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- AlterTable
ALTER TABLE "Auth_data" DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Profile_data" (
    "name" TEXT NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Profile_data_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Chats_data" (
    "id" SERIAL NOT NULL,
    "chat_type" INTEGER NOT NULL,
    "chat_id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "members_table_id" UUID NOT NULL,
    "chat_name" TEXT,

    CONSTRAINT "Chats_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chats_members_data" (
    "chat_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Chats_members_data_pkey" PRIMARY KEY ("chat_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_data_user_id_key" ON "Profile_data"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Chats_data_chat_id_key" ON "Chats_data"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "Chats_data_owner_id_key" ON "Chats_data"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Chats_data_members_table_id_key" ON "Chats_data"("members_table_id");

-- CreateIndex
CREATE UNIQUE INDEX "Chats_members_data_chat_id_key" ON "Chats_members_data"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "Chats_members_data_user_id_key" ON "Chats_members_data"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_data_user_id_key" ON "Auth_data"("user_id");

-- AddForeignKey
ALTER TABLE "Profile_data" ADD CONSTRAINT "Profile_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Auth_data"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats_data" ADD CONSTRAINT "Chats_data_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Profile_data"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats_members_data" ADD CONSTRAINT "Chats_members_data_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chats_data"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats_members_data" ADD CONSTRAINT "Chats_members_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Profile_data"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
