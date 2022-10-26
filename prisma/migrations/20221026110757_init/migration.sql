-- CreateTable
CREATE TABLE "auth_data" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "auth_data_pkey" PRIMARY KEY ("id")
);
