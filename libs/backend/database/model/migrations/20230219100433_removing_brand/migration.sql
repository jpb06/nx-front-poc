/*
  Warnings:

  - You are about to drop the column `idBrand` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_idBrand_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "idBrand",
ADD COLUMN     "brand" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "Brand";
