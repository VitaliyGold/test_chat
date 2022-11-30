-- AlterTable
ALTER TABLE "Messages_data" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Messages_data_pkey" PRIMARY KEY ("id");
