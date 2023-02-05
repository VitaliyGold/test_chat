-- CreateTable
CREATE TABLE "AuthData" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "AuthData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileData" (
    "name" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "avatarLink" TEXT NOT NULL DEFAULT '',
    "userLink" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfileData_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ChatsData" (
    "id" SERIAL NOT NULL,
    "chatType" SMALLINT NOT NULL DEFAULT 1,
    "chatId" TEXT NOT NULL,
    "ownerId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatsData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatsMembersData" (
    "id" SERIAL NOT NULL,
    "chatId" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "ChatsMembersData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessagesData" (
    "chatId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "ownerId" UUID NOT NULL,
    "messageText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessagesData_pkey" PRIMARY KEY ("messageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthData_login_key" ON "AuthData"("login");

-- CreateIndex
CREATE UNIQUE INDEX "AuthData_userId_key" ON "AuthData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileData_userId_key" ON "ProfileData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatsData_chatId_key" ON "ChatsData"("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "MessagesData_messageId_key" ON "MessagesData"("messageId");

-- AddForeignKey
ALTER TABLE "ProfileData" ADD CONSTRAINT "ProfileData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AuthData"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatsData" ADD CONSTRAINT "ChatsData_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "ProfileData"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatsMembersData" ADD CONSTRAINT "ChatsMembersData_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "ChatsData"("chatId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatsMembersData" ADD CONSTRAINT "ChatsMembersData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ProfileData"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessagesData" ADD CONSTRAINT "MessagesData_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "ChatsData"("chatId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessagesData" ADD CONSTRAINT "MessagesData_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "ProfileData"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
