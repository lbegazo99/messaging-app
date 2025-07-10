/*
  Warnings:

  - You are about to drop the column `reciever_id` on the `Message` table. All the data in the column will be lost.
  - Added the required column `receiver_id` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_reciever_id_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "reciever_id",
ADD COLUMN     "receiver_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
