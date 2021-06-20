/*
  Warnings:

  - You are about to drop the column `key` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Meta` table. All the data in the column will be lost.
  - Added the required column `content` to the `Meta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Meta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meta" DROP COLUMN "key",
DROP COLUMN "value",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
