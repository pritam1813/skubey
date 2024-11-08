/*
  Warnings:

  - You are about to drop the column `street` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `addressOne` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "street",
ADD COLUMN     "addressOne" TEXT NOT NULL,
ADD COLUMN     "addressTwo" TEXT,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
