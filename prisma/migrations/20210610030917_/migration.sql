/*
  Warnings:

  - You are about to drop the column `setId` on the `LoksewaQuestion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "LoksewaQuestion" DROP CONSTRAINT "LoksewaQuestion_setId_fkey";

-- AlterTable
ALTER TABLE "LoksewaQuestion" DROP COLUMN "setId";

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

-- CreateIndex
CREATE UNIQUE INDEX "MockQuestionEdge_questionId_unique" ON "MockQuestionEdge"("questionId");

-- AddForeignKey
ALTER TABLE "MockQuestionEdge" ADD FOREIGN KEY ("questionId") REFERENCES "LoksewaQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockQuestionEdge" ADD FOREIGN KEY ("setId") REFERENCES "LoksewaMockSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
