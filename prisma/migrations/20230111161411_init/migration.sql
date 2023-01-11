/*
  Warnings:

  - A unique constraint covering the columns `[message_id]` on the table `Messages_data` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Messages_data_message_id_key" ON "Messages_data"("message_id");
