/*
  Warnings:

  - You are about to drop the `auth_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "auth_data";

-- CreateTable
CREATE TABLE "Auth_data" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Auth_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_data_login_key" ON "Auth_data"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_data_user_id_key" ON "Auth_data"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Auth_data"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
