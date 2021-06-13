--Add Extension CITEXT
CREATE EXTENSION citext;

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'blocked', 'inactive');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'moderator', 'user');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('articles', 'scholarships', 'information', 'loksewa');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('draft', 'unverified', 'commented', 'verified', 'published', 'hidden', 'blocked');

-- CreateEnum
CREATE TYPE "AdvertisementStatus" AS ENUM ('draft', 'published', 'blocked', 'expired', 'paused');

-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('like', 'happy', 'dislike', 'sad', 'angry');

-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('AUTHENTICATED', 'ANONYMOUS', 'MAGIC');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('np', 'en');

-- CreateEnum
CREATE TYPE "AdvertisementType" AS ENUM ('banner', 'post', 'splash', 'feed');

-- CreateEnum
CREATE TYPE "AdvertisementTargetSex" AS ENUM ('male', 'female', 'both');

-- CreateEnum
CREATE TYPE "MCQAnswer" AS ENUM ('A', 'B', 'C', 'D');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('veryEasy', 'easy', 'medium', 'hard', 'veryHard');

-- CreateEnum
CREATE TYPE "MockSetType" AS ENUM ('free', 'official', 'trial', 'premium');

-- CreateEnum
CREATE TYPE "MockSetStatus" AS ENUM ('draft', 'published', 'hidden');

-- CreateEnum
CREATE TYPE "ScholarshipLevel" AS ENUM ('language', 'training', 'research', 'k12', 'bachelors', 'masters', 'phd', 'postgrad');

-- CreateEnum
CREATE TYPE "AnswerStatus" AS ENUM ('unanswered', 'wrong', 'correct');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('esewa', 'phonepay', 'imepay', 'ipsconnect', 'visa', 'banktransfer', 'cash');

-- CreateEnum
CREATE TYPE "MembershipType" AS ENUM ('gold', 'silver', 'bronze');

-- CreateEnum
CREATE TYPE "FlagType" AS ENUM ('fakenews', 'politicalcontent', 'religiouscontent', 'sexualcontent', 'slander', 'outdated', 'other');

-- CreateEnum
CREATE TYPE "FlagStatus" AS ENUM ('submitted', 'inreview', 'solved');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" CITEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT,
    "displayName" TEXT,
    "bio" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT E'active',
    "role" "UserRole" NOT NULL DEFAULT E'user',
    "deleted" BOOLEAN NOT NULL DEFAULT false,

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
    "facebookToken" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "slug" TEXT NOT NULL,
    "body" TEXT,
    "url" TEXT,
    "title" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT E'en',
    "userId" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "PostStatus" NOT NULL DEFAULT E'draft',
    "type" "PostType" NOT NULL DEFAULT E'articles',
    "views" INTEGER NOT NULL DEFAULT 0,
    "editorId" TEXT,
    "categoryId" TEXT,
    "subCategoryId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "FlagType" NOT NULL,
    "message" TEXT,
    "status" "FlagStatus" NOT NULL DEFAULT E'submitted',
    "moderatorId" TEXT,
    "userId" TEXT,
    "postId" TEXT,

    PRIMARY KEY ("id")
);

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
    "advertisementId" TEXT,

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
    "hostShotId" TEXT,
    "advertisementId" TEXT,

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

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advertisement" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startsAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "type" "AdvertisementType" NOT NULL,
    "targetSex" "AdvertisementTargetSex" DEFAULT E'both',
    "targetAgeLowerLimit" INTEGER DEFAULT 14,
    "targetAgeUpperLimit" INTEGER DEFAULT 60,
    "postId" TEXT,
    "status" "AdvertisementStatus",
    "backgroundColor" TEXT DEFAULT E'#ffffff',
    "title" TEXT,
    "body" TEXT,
    "views" INTEGER,
    "clicks" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" TEXT,
    "userId" TEXT NOT NULL,
    "body" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "postType" "PostType"[],
    "email" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scholarship" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "country" TEXT,
    "level" "ScholarshipLevel" NOT NULL,
    "startsAt" TIMESTAMP(3),
    "deadlineAt" TIMESTAMP(3),
    "postId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoksewaQuestion" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,
    "title" TEXT NOT NULL,
    "optionA" TEXT NOT NULL,
    "optionB" TEXT NOT NULL,
    "optionC" TEXT NOT NULL,
    "optionD" TEXT NOT NULL,
    "answer" "MCQAnswer" NOT NULL,
    "additionalDetails" TEXT,
    "metaId" TEXT,
    "difficulty" "Difficulty" NOT NULL DEFAULT E'medium',
    "showInMCQ" BOOLEAN NOT NULL DEFAULT true,

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
CREATE TABLE "MockQuestionEdge" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "order" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 1,
    "questionId" TEXT NOT NULL,
    "setId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoksewaMockSet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,
    "status" "MockSetStatus" NOT NULL,
    "type" "MockSetType" NOT NULL DEFAULT E'free',
    "editorId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoksewaQuestionCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "titleNP" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoksewaMockCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "titleNP" TEXT,
    "totalMins" INTEGER DEFAULT 90,
    "negativeMarkingRatio" INTEGER DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoksewaTest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "setId" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "testId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answer" "MCQAnswer",
    "status" "AnswerStatus" NOT NULL DEFAULT E'unanswered',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "type" "MembershipType" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "setId" TEXT,
    "advertisementId" TEXT,
    "membershipId" TEXT,
    "body" TEXT,
    "amountPaid" INTEGER NOT NULL,
    "paymentMethod" "PaymentMethod",
    "paymentId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session.token_unique" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Post.url_unique" ON "Post"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Tag.name_unique" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category.name_unique" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "File_userId_unique" ON "File"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "File_postId_unique" ON "File"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "File_hostShotId_unique" ON "File"("hostShotId");

-- CreateIndex
CREATE UNIQUE INDEX "File_advertisementId_unique" ON "File"("advertisementId");

-- CreateIndex
CREATE UNIQUE INDEX "HotShot_postId_unique" ON "HotShot"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Advertisement_postId_unique" ON "Advertisement"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_unique" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Scholarship_postId_unique" ON "Scholarship"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "MockQuestionEdge_questionId_unique" ON "MockQuestionEdge"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_unique" ON "Membership"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_advertisementId_unique" ON "Order"("advertisementId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_membershipId_unique" ON "Order"("membershipId");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("editorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flag" ADD FOREIGN KEY ("moderatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flag" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flag" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("advertisementId") REFERENCES "Advertisement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("hostShotId") REFERENCES "HotShot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("advertisementId") REFERENCES "Advertisement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotShot" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertisement" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scholarship" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoksewaQuestion" ADD FOREIGN KEY ("categoryId") REFERENCES "LoksewaQuestionCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoksewaQuestion" ADD FOREIGN KEY ("metaId") REFERENCES "LoksewaQuestionMeta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockQuestionEdge" ADD FOREIGN KEY ("questionId") REFERENCES "LoksewaQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockQuestionEdge" ADD FOREIGN KEY ("setId") REFERENCES "LoksewaMockSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoksewaMockSet" ADD FOREIGN KEY ("categoryId") REFERENCES "LoksewaMockCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoksewaMockSet" ADD FOREIGN KEY ("editorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoksewaTest" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoksewaTest" ADD FOREIGN KEY ("setId") REFERENCES "LoksewaMockSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD FOREIGN KEY ("testId") REFERENCES "LoksewaTest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD FOREIGN KEY ("questionId") REFERENCES "LoksewaQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY ("setId") REFERENCES "LoksewaMockSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY ("advertisementId") REFERENCES "Advertisement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
