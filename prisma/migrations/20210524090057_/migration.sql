-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'blocked', 'inactive');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'moderator', 'user');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('link', 'ask', 'job');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('draft', 'published', 'hidden', 'blocked');

-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('upvotes', 'downvotes');

-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('AUTHENTICATED', 'ANONYMOUS', 'MAGIC');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT E'active',
    "role" "UserRole" NOT NULL DEFAULT E'user',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "SessionType" NOT NULL,
    "token" TEXT,
    "authToken" TEXT,
    "refreshToken" TEXT,
    "expires" TIMESTAMP(3),
    "invalidate" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "googleToken" TEXT,
    "githubToken" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "body" TEXT,
    "url" TEXT,
    "title" TEXT NOT NULL,
    "userId" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "PostStatus" NOT NULL DEFAULT E'draft',
    "type" "PostType" NOT NULL DEFAULT E'link',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "moderatorId" TEXT,
    "userId" TEXT,
    "postId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "VoteType" NOT NULL,
    "postId" TEXT,
    "userId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "body" TEXT NOT NULL,
    "parentId" TEXT,
    "userId" TEXT,
    "postId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "preview" TEXT,
    "source" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "size" INTEGER,
    "userId" TEXT,
    "postId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostOnTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session.token_unique" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "File_userId_unique" ON "File"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "File_postId_unique" ON "File"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "_PostOnTags_AB_unique" ON "_PostOnTags"("A", "B");

-- CreateIndex
CREATE INDEX "_PostOnTags_B_index" ON "_PostOnTags"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flag" ADD FOREIGN KEY ("moderatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flag" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flag" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostOnTags" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostOnTags" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
