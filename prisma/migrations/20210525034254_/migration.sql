-- CreateEnum
CREATE TYPE "AnswerStatus" AS ENUM ('unanswered', 'wrong', 'correct');

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

-- AddForeignKey
ALTER TABLE "LoksewaTest" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoksewaTest" ADD FOREIGN KEY ("setId") REFERENCES "LoksewaMockSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD FOREIGN KEY ("testId") REFERENCES "LoksewaTest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD FOREIGN KEY ("questionId") REFERENCES "LoksewaQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
