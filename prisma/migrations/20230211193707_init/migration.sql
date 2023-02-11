-- CreateTable
CREATE TABLE "TokenBlackList" (
    "token" TEXT NOT NULL,
    "device" TEXT NOT NULL,

    CONSTRAINT "TokenBlackList_pkey" PRIMARY KEY ("token")
);
