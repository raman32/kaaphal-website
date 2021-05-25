/*
  Warnings:

  - You are about to drop the column `fileId` on the `Advertisement` table. All the data in the column will be lost.
  - You are about to drop the column `fileId` on the `HotShot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hostShotId]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[advertisementId]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `HotShot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ScholarshipLevel" AS ENUM ('langugage', 'training', 'research', 'k12', 'bachelors', 'masters', 'phd', 'postgrad');

-- DropForeignKey
ALTER TABLE "HotShot" DROP CONSTRAINT "HotShot_fileId_fkey";

-- DropForeignKey
ALTER TABLE "Advertisement" DROP CONSTRAINT "Advertisement_fileId_fkey";

-- AlterTable
ALTER TABLE "Advertisement" DROP COLUMN "fileId";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "advertisementId" TEXT,
ADD COLUMN     "hostShotId" TEXT;

-- AlterTable
ALTER TABLE "HotShot" DROP COLUMN "fileId";

-- AlterTable
ALTER TABLE "LoksewaMockCategory" ADD COLUMN     "title" TEXT;

-- CreateTable
CREATE TABLE "Scholarship" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "country" TEXT,
    "level" "ScholarshipLevel" NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "deadlineAt" TIMESTAMP(3) NOT NULL,
    "postId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "File_hostShotId_unique" ON "File"("hostShotId");

-- CreateIndex
CREATE UNIQUE INDEX "File_advertisementId_unique" ON "File"("advertisementId");

-- CreateIndex
CREATE UNIQUE INDEX "HotShot_postId_unique" ON "HotShot"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Scholarship_postId_unique" ON "Scholarship"("postId");

-- AddForeignKey
ALTER TABLE "Scholarship" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("hostShotId") REFERENCES "HotShot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("advertisementId") REFERENCES "Advertisement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
