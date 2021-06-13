/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "QuestionDiscussion" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "body" TEXT NOT NULL,
    "parentId" TEXT,
    "userId" TEXT,
    "questionId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post.slug_unique" ON "Post"("slug");

-- AddForeignKey
ALTER TABLE "QuestionDiscussion" ADD FOREIGN KEY ("parentId") REFERENCES "QuestionDiscussion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionDiscussion" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionDiscussion" ADD FOREIGN KEY ("questionId") REFERENCES "LoksewaQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
