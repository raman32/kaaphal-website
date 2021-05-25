/*
  Warnings:

  - The values [link,ask,job] on the enum `PostType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[url]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AdvertisementStatus" AS ENUM ('draft', 'published', 'blocked', 'expired', 'paused');

-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('like', 'happy', 'dislike', 'sad', 'angry');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('np', 'en');

-- CreateEnum
CREATE TYPE "AdvertisementTye" AS ENUM ('banner', 'post', 'splash', 'feed');

-- CreateEnum
CREATE TYPE "AdvertisementTargetSex" AS ENUM ('male', 'female', 'both');

-- CreateEnum
CREATE TYPE "MCQAnswer" AS ENUM ('A', 'B', 'C', 'D');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('veryEasy', 'easy', 'medium', 'hard', 'veryHard');

-- CreateEnum
CREATE TYPE "MockSetType" AS ENUM ('free', 'official', 'premium');

-- CreateEnum
CREATE TYPE "MockSetStatus" AS ENUM ('draft', 'published', 'hidden');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PostStatus" ADD VALUE 'unverified';
ALTER TYPE "PostStatus" ADD VALUE 'commented';
ALTER TYPE "PostStatus" ADD VALUE 'verified';

-- AlterEnum
BEGIN;
CREATE TYPE "PostType_new" AS ENUM ('articles', 'scholarships', 'information', 'loksewa');
ALTER TABLE "Post" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Post" ALTER COLUMN "type" TYPE "PostType_new" USING ("type"::text::"PostType_new");
ALTER TYPE "PostType" RENAME TO "PostType_old";
ALTER TYPE "PostType_new" RENAME TO "PostType";
DROP TYPE "PostType_old";
ALTER TABLE "Post" ALTER COLUMN "type" SET DEFAULT 'articles';
COMMIT;

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_postId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "editorId" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "subCategoryId" TEXT,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "type" SET DEFAULT E'articles';

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "facebookToken" TEXT;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "advertisementId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "displayName" TEXT;

-- DropTable
DROP TABLE "Vote";

-- DropEnum
DROP TYPE "VoteType";

-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "ReactionType" NOT NULL,
    "postId" TEXT,
    "userId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "followingId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotShot" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" TEXT,
    "backgroundColor" TEXT DEFAULT E'#ffffff',
    "title" TEXT,
    "body" TEXT,
    "fileId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advertisement" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startsAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "type" "AdvertisementTye" NOT NULL,
    "targetSex" "AdvertisementTargetSex" DEFAULT E'both',
    "targetAgeLowerLimit" INTEGER DEFAULT 14,
    "targetAgeUpperLimit" INTEGER DEFAULT 60,
    "postId" TEXT,
    "amountPaid" INTEGER,
    "status" "AdvertisementStatus",
    "backgroundColor" TEXT DEFAULT E'#ffffff',
    "title" TEXT,
    "body" TEXT,
    "views" INTEGER,
    "clicks" INTEGER,
    "fileId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoksewaQuestion" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,
    "setId" TEXT,
    "title" TEXT NOT NULL,
    "optionA" TEXT NOT NULL,
    "optionB" TEXT NOT NULL,
    "optionC" TEXT NOT NULL,
    "optionD" TEXT NOT NULL,
    "answer" "MCQAnswer" NOT NULL,
    "additionalDetails" TEXT,
    "metaId" TEXT,
    "difficulty" "Difficulty" NOT NULL DEFAULT E'medium',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoksewaQuestionMeta" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "body" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoksewaMockSet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,
    "status" "MockSetStatus" NOT NULL,
    "type" "MockSetType" NOT NULL,
    "editorId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoksewaQuestionCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoksewaMockCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post.url_unique" ON "Post"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Advertisement_postId_unique" ON "Advertisement"("postId");

-- AddForeignKey
ALTER TABLE "SubCategory" ADD FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoksewaMockSet" ADD FOREIGN KEY ("categoryId") REFERENCES "LoksewaMockCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoksewaMockSet" ADD FOREIGN KEY ("editorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotShot" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotShot" ADD FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoksewaQuestion" ADD FOREIGN KEY ("categoryId") REFERENCES "LoksewaQuestionCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoksewaQuestion" ADD FOREIGN KEY ("setId") REFERENCES "LoksewaMockSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoksewaQuestion" ADD FOREIGN KEY ("metaId") REFERENCES "LoksewaQuestionMeta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertisement" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertisement" ADD FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("advertisementId") REFERENCES "Advertisement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("editorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
