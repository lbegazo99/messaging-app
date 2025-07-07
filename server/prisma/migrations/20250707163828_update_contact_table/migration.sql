/*
  Warnings:

  - The primary key for the `Contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_id_fkey";

-- AlterTable
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_pkey",
DROP COLUMN "id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "contact_id" DROP DEFAULT,
ADD CONSTRAINT "Contact_pkey" PRIMARY KEY ("user_id", "contact_id");
DROP SEQUENCE "Contact_contact_id_seq";

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
